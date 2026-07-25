# Scissortail

Privacy-first web analytics, a McCracken Labs project. Counts page views and visitors
with no cookies and no stored IP addresses. Right now it runs only on our own sites;
the plan is to grow it into a hosted service later. These are the deploy notes.

Parts:

- `count.js` - the tracking snippet added to my pages.
- `worker/` - the collector (Cloudflare Worker + D1) that receives views and serves stats.
- `dashboard.html` - my private dashboard.
- `index.html` - internal overview page.

## What it stores

One row per page view: the day, the site key, the path, the referrer host, and the
screen size. Instead of an IP address it stores a one-way daily hash (coarsened IP +
browser + a secret salt) so it can count distinct visitors per day without keeping
anything identifying, and that value resets every night. Honors Do Not Track.

## Deploy the collector (one time)

Needs a Cloudflare account and Node.

```bash
cd worker
npm install
npx wrangler login
npx wrangler d1 create scissortail        # paste the printed database_id into wrangler.toml
npx wrangler d1 execute scissortail --file=./schema.sql --remote
npx wrangler secret put SALT              # any long random string
npx wrangler secret put DASH_TOKEN        # the password the dashboard uses
npx wrangler deploy                       # prints the Worker URL (the endpoint)
```

## Turn it on

Put the Worker URL into `data-endpoint` on the `count.js` script tag across the pages
(they currently ship with `data-endpoint=""`, which is a no-op). Use a `data-site` key
per site (`mccrackenlandservices`, `aworldview`).

## See the numbers

Open `dashboard.html`, enter the Worker URL, the `DASH_TOKEN`, and a site key.
