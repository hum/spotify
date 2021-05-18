# Spotify [WIP]

Deno wrapper for the Spotify API. **EARLY STAGE.**

## Example Usage

---

Import the module and initialise the `Client` class.

```ts
import { Client } from "https://github.com/hum/spotify/raw/main/mod.ts";

// Initialize the API client
const spotify = new Client({
  accessToken: "your_token",
});
```

Make calls to the API

```ts
const artist = await spotify.getArtist("joji");
console.log(artist.name, artist.genres, artist.id);

// Get all albums related to the artist
const albums = await artist.getAlbums({
  market: "US",
});
for (const album of albums) {
  console.log(album.name, album.releaseDate);
}

// Albums can be fetched even without an artist
const album = await spotify.getAlbum("Nectar");

for (const track of album.tracks) {
  console.log(`${album.artists[0].name} - ${track.name}`);
}
```

## CURRENT API COVERAGE: 65%

- [x] **Albums API**
- [x] **Artists API**
- [x] **Browse API**
- [x] **Episodes API**
- [x] **Follow API**
- [ ] **Library API**
  - [ ] Get User's Saved Albums
  - [ ] Save Albums for Current User
  - [ ] Remove Albums for Current User
  - [ ] Check User's Saved Albums
  - [ ] Get User's Saved Tracks
  - [ ] Save Tracks for User
  - [ ] Remove User's Saved Tracks
  - [ ] Check User's Saved Tracks
  - [ ] Get User's Saved Episodes
  - [ ] Save Episodes for User
  - [ ] Remove User's Saved Episodes
  - [ ] Check User's Saved Episodes
  - [ ] Get User's Saved Shows
  - [ ] Save Shows for Current User
  - [ ] Remove User's Saved Shows
  - [ ] Check User's Saved Shows
- [x] **Markets API**
- [ ] **Personalization API**
  - [ ] Get a User's Top Artists and Tracks
- [x] **Player API**
- [ ] **Playlists API**
  - [ ] Get a List of Current User's Playlists
  - [ ] Get a List of a User's Playlists
  - [ ] Create a Playlist
  - [ ] Get a Playlist
  - [ ] Change a Playlist's Details
  - [ ] Get a Playlist's Items
  - [ ] Add Items to a Playlist
  - [ ] Reorder or Replace a Playlist's Items
  - [ ] Remove Items from a Playlist
  - [ ] Get a Playlist Cover Image
  - [ ] Upload a Custom Playlist Cover Image
- [x] **Search API**
- [x] **Shows API**
- [x] **Tracks API**
- [x] **User Profile API**

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
