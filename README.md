# Smart Electric Bill Calculator (Thailand)

Mobile-first web app for estimating residential electricity bills in Thailand, with a simplified UX for elderly users.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vitest (unit tests)

## Features

- Two calculator modes:
  - Normal residential meter
  - Residential TOU meter
- Two input methods per calculator:
  - By units
  - By approximate old monthly bill
- Reverse estimation by binary search for bill-to-units mode
- Config-driven tariff and Ft values
- Collapsible calculation details for transparency
- Large text, large tap targets, simple mobile layout
- No database, no auth, no external API, no persistent storage

## Routes

- `/` Home
- `/normal` Normal meter calculator
- `/tou` TOU meter calculator
- `/help` Help and notes

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Build and Run Production

```bash
npm run build
npm run start
```

## Tests

```bash
npm run test
```

Covered utility tests include:

- Normal meter forward calculation
- TOU forward calculation
- Reverse estimation for normal and TOU
- Boundary behavior around 150 and 400 units
- Zero-value behavior
- Invalid/negative input handling in utility layer

## Deploy on Vercel

This project is Vercel-ready as a standard Next.js app.

1. Push repository to Git provider
2. Import project in Vercel
3. Use default build settings

No environment variables are required for the current version.

## Where to Update Tariffs and Text

- Tariff/Ft/VAT config: `config/tariffs.ts`
- User-facing labels and messages: `config/uiText.ts`

These two files are the main update points for future policy or wording changes.

## Calculation Model Summary

Both calculators follow this structure:

1. Energy charge
2. + Service charge
3. + Ft (`units * Ft rate`)
4. VAT 7% on subtotal
5. Final total

Old and new totals are calculated separately using old/new Ft values.
