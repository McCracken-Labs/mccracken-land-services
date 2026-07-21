# McCracken Land Services — Website

A fast, mobile-friendly static website for McCracken Land Services. No build step,
no frameworks — just HTML, CSS, and a little JavaScript, so it hosts free on GitHub
Pages and loads instantly.

```
index.html      → the whole site (one page, with sections)
styles.css      → all styling
script.js       → mobile menu + scroll animations
assets/         → logo, favicon, background art
CNAME           → tells GitHub Pages your custom domain
.nojekyll       → tells GitHub Pages to serve files as-is
```

---

## 1. Put the code on GitHub

You want this under your **mccracken-labs** GitHub account. Two ways:

**Option A — GitHub website (easiest, no command line)**
1. Go to <https://github.com/new> and create a repository named `mccracken-land-services`
   (or whatever you like). Set it to **Public**.
2. On the new repo page, click **"uploading an existing file"**.
3. Drag in everything from this folder — `index.html`, `styles.css`, `script.js`,
   `CNAME`, `.nojekyll`, and the whole `assets` folder — then **Commit changes**.

**Option B — Command line**
```bash
cd mccracken-land-services
git init
git add .
git commit -m "Initial McCracken Land Services website"
git branch -M main
git remote add origin https://github.com/mccracken-labs/mccracken-land-services.git
git push -u origin main
```
> Replace `mccracken-labs` if that's your **username**; if it's an organization, create
> the repo inside it and use the same URL pattern.

---

## 2. Turn on GitHub Pages

1. In your repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. Wait 1–2 minutes. GitHub gives you a temporary URL like
   `https://mccracken-labs.github.io/mccracken-land-services/` — open it to confirm the
   site works before you touch the domain.

---

## 3. Point your domain at it

Your domain **McCrackenLandServices.com** is almost certainly managed at **Squarespace**,
not Square: you bought it through **Google Domains**, and in 2023 Google sold that
business to **Squarespace**, migrating every domain there. Log in at
**<https://account.squarespace.com>** and open
**Domains → McCrackenLandServices.com → DNS Settings**.

### DNS records to add

**A. Four A records** (send the bare `mccrackenlandservices.com` to GitHub):

| Type | Host / Name | Value                |
|------|-------------|----------------------|
| A    | `@`         | `185.199.108.153`    |
| A    | `@`         | `185.199.109.153`    |
| A    | `@`         | `185.199.110.153`    |
| A    | `@`         | `185.199.111.153`    |

**B. One CNAME record** (send `www` to GitHub):

| Type  | Host / Name | Value                      |
|-------|-------------|----------------------------|
| CNAME | `www`       | `mccracken-labs.github.io` |

> Use `mccracken-labs.github.io` exactly — your account name + `.github.io`, no repo name.

*(Optional IPv6: four AAAA records on `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153`.)*

Delete any existing parking/forwarding records on `@` or `www` so they don't conflict.

### Finish in GitHub
1. **Settings → Pages → Custom domain** → enter `www.mccrackenlandservices.com` → **Save**.
2. DNS can take minutes to a few hours.
3. Once verified, tick **Enforce HTTPS**.

---

## 4. Turn on the contact form (2 minutes)

The form points at a placeholder. To deliver messages to your inbox, use free
[Formspree](https://formspree.io):

1. Sign up at <https://formspree.io> with `landmanmike@gmail.com`.
2. Create a form; it gives you an endpoint like `https://formspree.io/f/abcxyz`.
3. In `index.html`, replace `your-form-id` in the form's `action` with your real ID.
4. Commit. Submissions now land in your email.

---

## 5. Things to update before go-live

- **Phone number** — currently `[ Add your phone number ]` in `index.html`.
- **Stephens Land Services line** — under "How we work," the "Capacity for large projects"
  card names Stephens. Confirm the wording with them before publishing.
- **Service area** — set to "Texas & surrounding states."
- **About text** — solid first draft; tweak to sound like you.
- **A real photo** — the "MM" monogram is a placeholder; drop a headshot in `assets/`
  and swap the `.about-portrait` block for an `<img>`.

To edit text, open `index.html` in any editor, change the words, re-commit. The live site
updates within a minute or two.

---

## Note on automatic publishing

This site was built in a **cloud** Cowork session, which has no connection to your GitHub
account — so it can't push for you. Your daily news site publishes itself because that task
runs **on your computer** through the Claude desktop app, using your computer's own GitHub
login. To get this site publishing the same automatic way, run the task on your computer
(desktop app → "Run this task" → on your computer), and it can push here and stay updated.
Otherwise, the one-time manual upload in Step 1 is all you need.
