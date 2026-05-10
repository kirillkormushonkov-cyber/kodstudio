import "server-only";

const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Cloudflare testing secret — always returns success. Used on Vercel preview
// deployments because *.vercel.app is on the Public Suffix List and Cloudflare
// refuses to issue tokens for those hostnames.
const TESTING_SECRET = "1x0000000000000000000000AA";

export async function verifyTurnstile(
  token: string,
  ip?: string,
): Promise<boolean> {
  const isPreview = process.env.VERCEL_ENV === "preview";
  const secret = isPreview
    ? TESTING_SECRET
    : process.env.TURNSTILE_SECRET_KEY;

  // No secret configured → in dev we let it through, in prod we deny.
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[turnstile] TURNSTILE_SECRET_KEY is not set in production");
      return false;
    }
    return true;
  }

  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] verification request failed", err);
    return false;
  }
}
