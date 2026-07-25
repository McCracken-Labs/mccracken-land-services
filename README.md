# McCracken Land Services

Source for the McCracken Land Services website (mccrackenlandservices.com), the company
site of Michael McCracken, an Oklahoma landman. Static site, hosted on GitHub Pages.

## Ownership and reuse

This is a personal company site, not a template. Do not clone it to build your own site.
Any reuse of the code requires first removing everything that identifies it as McCracken
Land Services: the name, the logo and artwork in `/assets`, the site copy, and the tools
and guides under `/tools`. Do not publish a copy as McCracken Land Services or imply any
connection to it or to McCracken Labs.

© McCracken Land Services. All rights reserved. The guides and charts under `/tools` are
general information, not legal advice.

## Stack

HTML, CSS, and vanilla JavaScript. No build step and no framework. Fonts are Source Serif 4
(headings) and Inter (body), served from Google Fonts under the SIL Open Font License.

## Structure

```
index.html        Home page (single page, sectioned)
styles.css        All styling
script.js         Navigation, scroll reveal, WTI price tile
assets/           Logo, favicon, hero art and video, headshot
tools/            Landman tools and reference guides/charts (PDFs)
blog/             Static blog posts
labs/             McCracken Labs page and Scissortail analytics
CNAME, .nojekyll  GitHub Pages configuration
```

## Analytics

Privacy-first and self-hosted with Scissortail (`labs/scissortail`). No cookies, no stored
IP addresses. A small snippet on each page reports page views to a Cloudflare Worker.
Setup and details are in `labs/scissortail/README.md`.

## Editing and publishing

Edit the HTML, CSS, or JS and commit to `main`. GitHub Pages redeploys within a minute or two.

## Custom domain

mccrackenlandservices.com. Point DNS at GitHub Pages: four A records on the apex to
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a CNAME on
`www` to `mccracken-labs.github.io`. Then set the custom domain under Settings, Pages, and
enable Enforce HTTPS.

## Contact

Through the contact form on the site.
