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
Email: admin@dubai-estate.local
Password: Dubai2026!
```

The same credentials are bootstrapped into Supabase Auth by `SUPABASE_SETUP.sql`.

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
