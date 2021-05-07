# Spotify [WIP]

Deno wrapper for the Spotify API. **EARLY STAGE.**

## Example Usage

---

Import the module and initialise the `Client` class.

```ts
import { Client } from "https://github.com/hum/spotify/raw/main/mod.ts";

// Initialize the API client
const spotify = new Client({
  token: "your_token",
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

## CURRENT API COVERAGE: 55%

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
- [x] **Browse API**
  - [x] Get All New Releases
  - [x] Get All Featured Playlists
  - [x] Get All Categories
  - [x] Get a Category
  - [x] Get a Category's Playlists
  - [x] Get Recommendations
  - [x] Get Recommendation Genres
- [x] **Episodes API**
  - [x] Get Multiple Episodes
  - [x] Get an Episode
- [ ] **Follow API**
  - [ ] Follow a Playlist
  - [ ] Unfollow Playlist
  - [ ] Check if Users Follow a Playlist
  - [x] Get User's Followed Artists
  - [x] Follow Artists or Users
  - [x] Unfollow Artists or Users
  - [x] Get Following State for Artists/Users
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
  - [x] Get available markets
- [ ] **Personalization API**
  - [ ] Get a User's Top Artists and Tracks
- [x] **Player API**
  - [x] Get Information About The User's Current Playback
  - [x] Transfer a User's Playback
  - [x] Get a User's Available Devices
  - [x] Get the User's Currently Playing Track
  - [x] Start/Resume a User's Playback
  - [x] Pause a User's Playback
  - [x] Skip User’s Playback To Next Track
  - [x] Skip User’s Playback To Previous Track
  - [x] Seek To Position In Currently Playing Track
  - [x] Set Repeat Mode On User’s Playback
  - [x] Set Volume For User's Playback
  - [x] Toggle Shuffle For User’s Playback
  - [x] Get Current User's Recently Played Tracks
  - [x] Add an item to queue
- [ ] **Playlists API**
- [x] **Search API**
  - [x] Search for an Item
- [x] **Shows API**
  - [x] Get Multiple Shows
  - [x] Get a Show
  - [x] Get a Show's Episodes
- [x] **Tracks API**
  - [x] Get Several Tracks
  - [x] Get a Track
  - [x] Get Audio Features for Serveral Tracks
  - [x] Get Audio Features for a Track
  - [x] Get Audio Analysis for a Track
- [x] **User Profile API**
  - [x] Get Current User's Profile
  - [x] Get a User's Profile 

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
