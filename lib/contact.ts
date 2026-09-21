const CONTACT_EMAIL = "ogenrwothjimfrank@gmail.com";

function contactSubject(name: string) {
  const who = name.trim();
  if (who) {
    return `[Portfolio Intro] From ${who}`;
  }
  return "[Portfolio Intro] New project inquiry";
}

function buildGmailComposeUrl(to: string, subject: string, body: string) {
  return [
    "https://mail.google.com/mail/?view=cm&fs=1",
    `&to=${encodeURIComponent(to)}`,
    `&su=${encodeURIComponent(subject)}`,
    `&body=${encodeURIComponent(body)}`,
  ].join("");
}

function introBody(name: string, brief: string) {
  const who = name.trim() || "[your name]";
  const note = brief.trim() || "[a short brief about what you want to build]";

  return `Hi Frank,

My name is ${who}.

Here is a short brief:
${note}

Looking forward to your reply.

Thanks,`;
}

/** Opens Gmail compose with a short introductory message. */
export function buildContactHref(name = "", brief = "") {
  return buildGmailComposeUrl(
    CONTACT_EMAIL,
    contactSubject(name),
    introBody(name, brief),
  );
}

/** Default reach-out link when no form values are available. */
export const contactHref = buildContactHref();

export const contactEmail = CONTACT_EMAIL;
