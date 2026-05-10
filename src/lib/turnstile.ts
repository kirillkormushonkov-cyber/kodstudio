import "server-only";

const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Cloudflare testing secret — always returns success. Used when the request
// arrives on *.vercel.app because the domain sits on the Public Suffix List
// and Cloudflare refuses to issue tokens for it.
const TESTING_SECRET = "1x0000000000000000000000AA";

export function isVercelAppHost(host: string | null | undefined): boolean {
  if (!host) return false;
  return host.endsWith(".vercel.app");
}

export async function verifyTurnstile(
  token: string,
  ip?: string,
  host?: string | null,
): Promise<boolean> {
  const useTesting = isVercelAppHost(host);
  const secret = useTesting
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
