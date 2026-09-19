# When your DNS zone ignores itself

Every DNS problem usually gets blamed on propagation. Sometimes it really is propagation. But every now and then the nameserver is serving one thing while your control panel is showing something else. It gets worse when your registrar does not manage the DNS records on the same platform. This is my story with registry.co.ug and Namecheap FreeDNS.

## Getting you up to speed

If you want a `.ug` domain, registry.co.ug is the main registry you deal with. Their customer care is honestly one of the best I have seen from a Ugandan company. The odd part for me was the DNS setup. At least for the old developer flow, DNS was not fully managed in the same place I expected. I needed to move things over to FreeDNS so I could actually access and control the records myself.

On day one I made the changes. I pointed the domain at FreeDNS and set the records for my Vercel app. It looked smooth at first. Then the update never showed up the way it should. I was closing in on the 48 hour window, and I knew the TTL windows I cared about should have expired by then. That is when I started digging.

## First surprise

I ran `dig` and saw the site still resolving to the old IP. Not the Vercel one I had set. The previous DNS service records were still being served. Two days in, and public lookups still matched the old zone.

So I talked to both help centers. Everyone said things should be fine. Nothing changed. I had to dig deeper myself. The only real point of failure left was Namecheap FreeDNS. I called them, walked through my own debugging steps with them, and eventually it worked out. The headache of splitting registry, DNS hosting, and your app platform is not obvious until you are stuck in the middle of it.

## What was actually wrong

On the surface everything looked correct in the FreeDNS panel. The records I wanted were there. The `.ug` registry delegation also looked right. It pointed at FreeDNS.

The problem was deeper. When I queried the FreeDNS nameservers directly, they were still serving an old imported zone from the previous hosting DNS. Old A record. Old SOA. Even old NS records inside the zone that pointed somewhere else.

So the registry said FreeDNS was in charge. FreeDNS said it was authoritative. And the zone FreeDNS was serving described a different nameserver entirely. That is not propagation. That is a stale zone that never got republished.

The panel even showed a message that the domain was "being transferred." I never started a domain transfer. On Namecheap, moving from their hosting DNS over to FreeDNS can get labeled like that. The UI updates and the live zone were not the same thing.

## Why "just wait for propagation" was the wrong answer

Propagation syncs copies of a zone. It does not invent a new published zone for you.

In this case:

- The registry delegation was already correct
- The authoritative answers were wrong and inconsistent with the panel
- Waiting longer would not rewrite what FreeDNS was actually serving

When the control panel and the authoritative servers disagree, stop waiting on the network. Someone's backend has not published the zone.

## How it got fixed

Namecheap support said they had fixed the zone. Checking again showed the same SOA serial. If the serial does not move, the zone did not republish.

The workaround that actually worked was adding a harmless TXT record. That forced a zone revision. The SOA serial bumped, FreeDNS republished, and the A record finally matched what I had set for Vercel. Resolvers caught up after that.

## What I took away

1. Never trust the DNS panel alone. Query the authoritative servers yourself.
2. Watch the SOA serial. If you change a record and the serial stays the same, nothing published.
3. Migrations can leave behind imported "zombie" zones. If the in-zone NS records do not match the delegation, that is a red flag.
4. "It is propagation" is a hypothesis, not a diagnosis.
5. Sometimes a tiny record change is what forces the backend to republish.

## Quick checks

If you ever suspect a stale zone:

```bash
# 1. What does the registry say?
dig @193.0.9.52 YOURDOMAIN NS +norecurse +noall +authority

# 2. Ask FreeDNS directly, no recursion
dig @freedns1.registrar-servers.com YOURDOMAIN SOA +noall +answer
dig @freedns1.registrar-servers.com YOURDOMAIN A +noall +answer

# 3. Compare the zone NS records to the delegation
# If they do not match, you likely have a stale or imported zone
```

If the SOA points at nameservers you did not choose, and the A record is an IP you never set, you found the zombie. Do not wait for propagation. Get the zone republished.
