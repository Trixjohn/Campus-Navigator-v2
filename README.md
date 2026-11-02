# USTP Campus Navigator

A student-developed campus navigation app for the University of Science and
Technology of Southern Philippines (USTP), Cagayan de Oro campus.

**This is an educational student project. It is NOT an official USTP application.**

This is an [Expo](https://expo.dev) project created with
[`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Current status

Works and tested on iPhone (Expo Go):

- Five tabs: Home, Map, Ask AI, Places, More (Home, Ask AI and More are placeholders)
- Places directory with search, nicknames, categories and detail screens
- Map with markers, a selected-place card and "Show on map"
- "My location" button (handles permission denied and Location Services off)

Not built yet: directions and routing, Ask AI, favorites, feedback,
emergency information, settings.

## Important: data accuracy

- All places are marked UNVERIFIED. Nothing has been confirmed by USTP.
- Floor information comes from public USTP web pages (see each place's source note).
- Only the ICT Building has map coordinates. They were copied from Google Maps
  and are not verified on site.
- USTP does not publish a complete list of room numbers, so none are included.

## Get started

Requirements:

- Node.js 20 or newer
- [Expo Go](https://expo.dev/go) on your phone (this project uses Expo SDK 58)
- Phone and computer on the same Wi-Fi

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start -c
   ```

3. Scan the QR code with Expo Go.

The web version is not supported (the map library is mobile-only).

You can start developing by editing the files inside the **src/app** directory.
This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Project structure

```
src/app/          screens (Expo Router)
src/components/   reusable UI, places and map components
src/constants/    theme and campus map settings
src/data/         campus place records (unverified)
src/services/     data search and location logic
docs/             project status notes
server/           Express server (in progress, not required to run the app)
```

## Language

JavaScript and JSX only. No TypeScript.

## Known limitations

- Tested only on iPhone with Expo Go. Android is untested.
- No routing or directions: there is no verified pathway data.
- The Ask AI feature is not built yet. No AI API key is configured.
- A production build needs its own map setup.

## Security notes

- Never commit API keys or passwords. Keep secrets in a local `.env` file,
  which is listed in `.gitignore`.

## Learn more

- [Expo documentation](https://docs.expo.dev/): fundamentals and guides.
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): a step-by-step tutorial.
- [Expo on GitHub](https://github.com/expo/expo)
- [Discord community](https://chat.expo.dev)
