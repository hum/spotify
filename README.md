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
  - [x] Get All New Releases
  - [x] Get All Featured Playlists
  - [ ] Get All Categories
  - [ ] Get a Category
  - [ ] Get a Category's Playlists
  - [ ] Get Recommendations
  - [ ] Get Recommendation Genres
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

## Example Usage

---

Import the module and initialise the `Client` class.

```ts
import { Client } from "url";

// Initialize the API client
const spotify = new Client({
  token: "your_token",
});
```

Make calls to the API

```ts
const artist = spotify.getArtist("joji");
console.log(artist.name, artist.genres, artist.id);

// Get all albums related to the artist
const albums = await artist.getAlbums();
for (const album of albums) {
  console.log(album.name, album.releaseDate);
}

// Albums can be fetched even without an artist
const album = await spotify.getAlbum("Nectar");

for (const track of album.tracks) {
  console.log(`${album.artists[0].name} - ${track.name}`);
}
```

```ts
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
