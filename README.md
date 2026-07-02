# Dubai Real Estate Site

Public site:

```text
https://999max20.github.io/dubai-real-estate-site/
```

Admin:

```text
https://999max20.github.io/dubai-real-estate-site/admin.html
```

Admin access:

```text
Email: admin2@dubai-estate.com
Password: Dubai2026!
```

The same credentials are bootstrapped into Supabase Auth by `SUPABASE_SETUP.sql`.

## Scope

This project is a landing site with a small object/photo admin panel. It is not a CRM. Lead handling stays WhatsApp-first here, and any CRM integration should be connected separately later.

WhatsApp number:

```text
+971 50 279 1555
```

## Modes

The site works in two modes:

1. Local fallback: objects and photos are saved in the current browser through `localStorage`.
2. Supabase shared mode: objects are saved in Supabase Postgres and photos are uploaded to Supabase Storage.

## Enable Supabase Shared Mode

1. Create a Supabase project.
2. Open SQL Editor and run `SUPABASE_SETUP.sql`.
3. Edit `config.js`:

```js
window.DUBAI_ESTATE_CONFIG = {
  SUPABASE_URL: "https://YOUR_PROJECT.supabase.co",
  SUPABASE_ANON_KEY: "YOUR_PUBLIC_ANON_KEY",
  STORAGE_BUCKET: "property-media",
};
```

4. Commit and push `config.js`.
5. Open `/admin.html`, log in, then add objects and photos.

The anon key is public by design in Supabase. Writes are protected by Auth and the RLS policies in `SUPABASE_SETUP.sql`.

Current Supabase project:

```text
https://toksdstwfpegqbcgreuz.supabase.co
```

## Current Features

- Public Supabase-backed shortlist/scenario catalog with filters, interactive map pins and object modal.
- Reference media fallback for objects without real photos, so public cards and modal galleries never look empty.
- Interactive preview-tour block with scene switching, hotspots, pan controls and mobile swipe.
- WhatsApp-only forms and CTAs.
- Shareable object links through `#property-...` URL hashes.
- Budget calculator with a structured WhatsApp request.
- District cards with entry budget, fit and risk notes.
- Mobile-first public layout and mobile-friendly admin rows.
- SEO basics: canonical URL, OpenGraph/Twitter meta, sitemap, FAQ schema and RealEstateAgent schema.
