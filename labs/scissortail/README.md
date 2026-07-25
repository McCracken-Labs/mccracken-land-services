# Scissortail

A quiet, cookie-free page counter. It tells you how many people visited and what
they looked at, without cookies, without storing IP addresses, and without following
anyone around the web. Built to run for free on Cloudflare.

Named after the scissor-tailed flycatcher, the Oklahoma state bird.

Parts:

- `count.js` - the tracking snippet you add to a site (about 1 KB).
- `worker/` - the collector that receives views and serves stats (Cloudflare Worker + D1).
- `dashboard.html` - a private dashboard that reads your stats.
- `index.html` - the public landing page.

## What it stores

One row per page view: the day, the site key, the path, the referrer host (like
`google.com`, never the full URL), and the screen size. Instead of an IP address it
stores a one-way daily hash of the coarsened IP plus the browser, salted with a secret,
so it can count distinct visitors per day but the value cannot be turned back into a
person and it resets every night. It honors Do Not Track and Global Privacy Control.

## Deploy the collector (one time, free)

You need a free Cloudflare account and Node installed.

```bash
cd worker
npm install
npx wrangler login

# create the database, then paste the printed database_id into wrangler.toml
npx wrangler d1 create scissortail

# create the table
npx wrangler d1 execute scissortail --file=./schema.sql --remote

# set your secrets
npx wrangler secret put SALT         # any long random string
npx wrangler secret put DASH_TOKEN   # the password your dashboard will use

# ship it
npx wrangler deploy
```

Wrangler prints your Worker URL, something like
`https://scissortail.YOUR-SUBDOMAIN.workers.dev`. That URL is your endpoint.

## Add it to a site

Put this on every page you want to count (just before `</body>`):

```html
<script defer src="https://scissortail.YOUR-SUBDOMAIN.workers.dev-or-your-hosted-count.js"
        data-endpoint="https://scissortail.YOUR-SUBDOMAIN.workers.dev"
        data-site="mysite"></script>
```

- `data-endpoint` is your Worker URL.
- `data-site` is a short key that separates one site's numbers from another's
  (for example `mccrackenlandservices` and `aworldview`). Use the same key everywhere on that site.

You can serve `count.js` from anywhere (your own site, GitHub Pages, or the Worker).

## See your numbers

Open `dashboard.html`, enter your Worker URL and your `DASH_TOKEN`, and pick a site.
It shows views and visitors over time, top pages, top referrers, and screen sizes.
The token stays in the browser and is sent only to your own Worker.

## Cost

Cloudflare's free tier covers a lot: 100,000 Worker requests a day and a generous D1
free allowance. A normal small site stays free.

## License

Open source. Do what you like with it. If it saves you money, you can
[buy me a coffee](https://www.buymeacoffee.com/mccrackenlabs).
