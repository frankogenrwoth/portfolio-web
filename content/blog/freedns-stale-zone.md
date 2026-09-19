Every DNS problem gets blamed on propagation. Sometimes it really is just propagation. But every now and then, the truth is stranger: the control panel says one thing, the nameservers serve something else, and the two never meet.

This is the story of how a DNS hosting migration quietly broke DNS for a domain, and how we found and fixed it. Or: why `kazivaluersandsurveyors.co.ug` showed a Vercel IP one day, an old server IP the next, and nothing in the UI fixed it.

## The setup

The domain was configured in Namecheap with FreeDNS nameservers (`freedns1`–`5.registrar-servers.com`). The Namecheap Advanced DNS panel showed the correct Vercel configuration:

- **A (root)** → `216.198.79.1`
- **CNAME www** → `a2949a6e3e7c4d8a.vercel-dns-017.com`

Everything looked right in the UI. The domain had even resolved to Vercel's IP before. Then, suspiciously, it reverted.

Queries to all five FreeDNS authoritative nameservers returned the old Namecheap hosting IP: `162.0.215.43`. Worse, the SOA record identified `dns1.namecheaphosting.com` as the primary nameserver — not a FreeDNS SOA at all.

And the domain panel said: "Your domain is being transferred."

We never initiated a domain transfer.

## The investigation

The first step was to check each layer of the DNS chain independently. DNS is a chain, and the failure could be anywhere: the TLD registry delegation, the authoritative zone content, or recursive resolver caching.

### Layer 1: The TLD delegation (`.co.ug` registry)

Querying the registry nameservers directly told us where the domain should find its answers:

```bash
$ dig @193.0.9.52 kazivaluersandsurveyors.co.ug NS +norecurse +noall +authority

kazivaluersandsurveyors.co.ug. 3600 IN NS freedns1.registrar-servers.com.
kazivaluersandsurveyors.co.ug. 3600 IN NS freedns2.registrar-servers.com.
...
```

All five `.co.ug` registry nameservers correctly delegated to FreeDNS. Layer 1 was fine.

### Layer 2: The authoritative zone (FreeDNS servers)

This is where it unraveled. Querying the FreeDNS servers directly — bypassing any recursion or caching — returned the old zone:

```bash
$ dig @freedns1.registrar-servers.com kazivaluersandsurveyors.co.ug A +noall +answer
kazivaluersandsurveyors.co.ug. 14400 IN A 162.0.215.43

$ dig @freedns1.registrar-servers.com kazivaluersandsurveyors.co.ug SOA +noall +answer
kazivaluersandsurveyors.co.ug. 1800000 IN SOA dns1.namecheaphosting.com. cpanel.tech.namecheap.com. ...
```

Every one of the five FreeDNS servers returned the identical stale zone — the old A record, the old SOA, and even the old NS records inside the zone pointing to `dns1`/`dns2.namecheaphosting.com`.

The `aa` (Authoritative Answer) flag was set. FreeDNS considered itself authoritative — for a zone that described itself as belonging to a completely different nameserver. The domain was delegated to FreeDNS, but the zone FreeDNS was serving described a different nameserver entirely.

### Layer 3: Public resolvers

Google (`8.8.8.8`) and Cloudflare (`1.1.1.1`) both returned the old IP. That much was expected — they were following the delegation and caching what the authoritative servers gave them.

## The root cause: a zombie zone

The panel displayed the domain status as "Your domain is being transferred." But we had never initiated a transfer — we had only changed nameservers. The clue was the message itself: on Namecheap, switching from Namecheap Hosting DNS to FreeDNS is an internal DNS hosting migration, and their panel labels that a "transfer."

Here's what was going on:

1. The domain previously lived on Namecheap Hosting (`dns1`/`dns2.namecheaphosting.com`, old IP `162.0.215.43`).
2. The nameservers were changed to FreeDNS.
3. The registry delegation updated correctly — all five `.co.ug` servers point to FreeDNS.
4. But FreeDNS's zone for the domain had been auto-imported from the old hosting nameservers: the old A record, the old SOA (`dns1.namecheaphosting.com`), even the old in-zone NS records.
5. The migration's "being transferred" state left the zone in limbo. Records edited in the UI were never republished. The imported zone kept being served — recently enough that the SOA serial had refreshed the day before.

One person, acting with perfect correctness — updating the delegates and the UI to Vercel — was fighting a zombie zone that pure delegation couldn't touch.

## Why "it'll propagate" was the wrong answer

This is the part worth understanding deeply. Ordinary propagation could not explain this, because:

- The delegation (Layer 1) was already correct. Nothing was propagating.
- The authoritative zone (Layer 2) was internally contradictory: FreeDNS declared itself authoritative for a zone whose SOA and NS records pointed to another nameserver.
- The UI showed different records than the zone being served. Propagation syncs zones; it doesn't hallucinate new ones.

When authoritative servers serve different data than the control panel shows, you're not waiting on the network. You're waiting on someone's backend to actually publish the zone.

## The resolution

Namecheap support confirmed the delegation and said they'd "fixed the zone" — but verification showed every FreeDNS server returning the same unchanged SOA serial. An unchanged serial means an unrepublished zone; no fix had landed.

The workaround they suggested — adding any TXT record — was the actual fix. It forced a zone revision on their backend, which bumped the SOA serial and republished the zone.

After adding a placeholder TXT record:

```bash
$ dig @freedns1.registrar-servers.com kazivaluersandsurveyors.co.ug A +noall +answer
kazivaluersandsurveyors.co.ug. 1799 IN A 216.198.79.1

$ dig @freedns1.registrar-servers.com kazivaluersandsurveyors.co.ug SOA +noall +answer
kazivaluersandsurveyors.co.ug. 3601 IN SOA freedns1.registrar-servers.com. hostmaster.registrar-servers.com. ...
```

The new SOA belonged to FreeDNS. The A record was Vercel's Anycast IP. Cloudflare's resolver updated almost immediately; Google's followed after its cached TTL expired.

## Lessons learned

1. **Never trust the DNS panel alone.** The control panel is a config UI; the zone on the wire is reality. Query the authoritative servers directly.
2. **Learn to read the SOA.** The serial is the zone's version number. If you change a record and the serial doesn't change, your zone was never published.
3. **DNS misconfigurations create zombies.** When a DNS platform migrates hosting, it may auto-import the old zone. Check for in-zone NS records that don't match the delegation — a red flag for an imported zone.
4. **"It's propagation" is a hypothesis, not a diagnosis.** Propagation is expected. An internally-contradictory authoritative answer is an incident.
5. **Sometimes a harmless record change is the fix.** A zone that won't publish can often be kicked by adding (or removing) any record, forcing a rebuild.

## The debugging one-liner

If you ever suspect a stale zone, here's the fastest diagnosis:

```bash
# 1. Check the delegation — what does the registry say?
dig @193.0.9.52 YOURDOMAIN NS +norecurse +noall +authority

# 2. Query the authoritative servers directly — bypass all caching
dig @freedns1.registrar-servers.com YOURDOMAIN SOA +noall +answer
dig @freedns1.registrar-servers.com YOURDOMAIN NS +noall +answer

# 3. Compare the zone's own NS records to the delegation
# If they don't match, you have a stale or imported zone
```

If the SOA references nameservers you didn't pick, and the A record is an IP you never set, you've found your zombie. Don't wait for propagation — get the zone republished.
