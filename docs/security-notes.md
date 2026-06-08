# MattBot Security and Cost Controls

## Current controls

MattBot currently uses:

- Server-side OpenAI API calls only
- API key stored in environment variables
- Server-side input length validation
- Server-side message count validation
- Server-side max output token cap
- Basic in-memory per-IP rate limiting
- Conditional web search only when the latest user message contains a URL
- OpenAI project budget limit configured in the OpenAI dashboard

## Current limits

- Max input characters: 3,500
- Max messages per session: 6
- Max output tokens: 700
- Rate limit: 5 requests per 10 minutes per IP

## Known limitation

The current rate limiter uses in-memory storage in `lib/rate-limit.ts`.

This is acceptable for a low-traffic personal portfolio, but it is not production-grade on serverless deployments because memory can reset or differ across function instances.

## Future upgrade path

If the site receives meaningful traffic or signs of abuse, replace the in-memory limiter with one of:

- Upstash Redis
- Vercel KV
- Cloudflare Turnstile
- hCaptcha
- A combination of IP rate limiting plus CAPTCHA

Recommended next security upgrade:

1. Add Upstash Redis rate limiting.
2. Keep existing input/output/session limits.
3. Add Turnstile only if bot traffic becomes a real issue.

## Web search behavior

Web search should only be enabled when the latest user message contains a URL.

If a user provides a job posting link, MattBot should attempt to read the posting. If it cannot access the posting or cannot identify a usable job description, it should ask the user to paste the job description instead of guessing.