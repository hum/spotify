# Spotify [WIP]

Deno wrapper for the Spotify API. **This is a very early stage of the wrapper.
Absolutely unusable.**

## TODO:

- [x] **Albums API**
  - [x] Get Multiple Albums
  - [x] Get an Album
  - [x] Get an Album's Tracks
- [x] **Artists API**
  - [x] Get Multiple Artists
  - [x] Get an Artist
  - [x] Get an Artist's Top Tracks
  - [x] Get an Artist's Related Artists
  - [x] Get an Artist's Albums
- [ ] **Browse API**
- [ ] **Episodes API**
- [ ] **Follow API**
- [ ] **Library API**
- [ ] **Markets API**
- [ ] **Personalization API**
- [ ] **Player API**
- [ ] **Playlists API**
- [ ] **Search API**
- [ ] **Shows API**
- [ ] **Tracks API**
- [ ] **User Profile API**

## Usage

---

Import the module and initialise the `Client` class.

```ts
import { Client } from "https://deno.land/x/spotify/mod.ts";

// Create the API client
const spotify = new Client({
  token: "your_token",
  refresh_token: "refresh_token",
});
```

Make calls to the API

```ts
const artist = spotify.getArtist("joji");

for (const image of artist.images) {
  console.log(image.height, image.url, image.width);
}
```

**More usage in `/examples`** -- `TODO`

## Develop

---

To run tests locally all you need to do is export `"spotify_access_token"` to
your env.

```ini
export spotify_access_token="Bearer [token]"
```

Then just run them with

```ini
deno test -A --unstable
```

## Docs

---

## `🌱 TBD`
