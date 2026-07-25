-- Scissortail storage (Cloudflare D1 / SQLite)
-- One row per page view. No IP addresses, cookies, or personal data are stored.
-- "visitor" is a daily one-way hash (date + site + coarse IP + user agent + secret salt),
-- which lets us count distinct visitors per day without keeping anything identifying.

CREATE TABLE IF NOT EXISTS hits (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  ts       INTEGER NOT NULL,          -- unix seconds (UTC)
  day      TEXT    NOT NULL,          -- YYYY-MM-DD (UTC)
  site     TEXT    NOT NULL,          -- site key, e.g. "mccrackenlandservices"
  path     TEXT    NOT NULL,          -- pathname, e.g. "/tools/index.html"
  ref      TEXT,                      -- referrer host only, e.g. "google.com"
  screen   TEXT,                      -- "1920x1080"
  visitor  TEXT    NOT NULL           -- daily rotating hash, not reversible
);

CREATE INDEX IF NOT EXISTS idx_hits_site_day  ON hits (site, day);
CREATE INDEX IF NOT EXISTS idx_hits_site_path ON hits (site, path);
CREATE INDEX IF NOT EXISTS idx_hits_site_ref  ON hits (site, ref);
