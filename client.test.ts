import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { Client } from "./client.ts";
import { SearchType } from "./endpoints/endpoints.ts";

const TOKEN = Deno.env.get("spotify_access_token") ?? "";

const spotify = new Client({
  accessToken: TOKEN,
});

Deno.test("Fetch artist data", async () => {
  const artist = await spotify.getArtist("Joji");
  const expected = {
    name: "Joji",
    id: "3MZsBdqDrRTJihTHQrO6Dq",
    genres: ["alternative r&b", "viral pop"],
    type: "artist",
  };

  assertEquals(expected.name, artist.name);
  assertEquals(expected.id, artist.id);
  assertEquals(expected.genres, artist.genres);
  assertEquals(expected.type, artist.type);

  assertThrowsAsync(() => spotify.getArtist(""));
});

Deno.test("Fetch album data", async () => {
  const artist = await spotify.getArtist("joji");
  const albums = await artist.getAlbums({
    market: "US",
  });

  const expected = {
    id: "5EzDhyNZuO7kuaABHwbBKX",
    name: "Nectar",
    type: "album",
  };

  const result = albums[0];
  assertEquals(result.id, expected.id);
  assertEquals(result.name, expected.name);
  assertEquals(result.type, expected.type);

  assertThrowsAsync(() => spotify.getAlbum(""));
});

Deno.test("Get all album tracks", async () => {
  const album = await spotify.getAlbum("Nectar");
  const tracks = album.tracks;
  const expected = [
    "Ew",
    "MODUS",
    "Tick Tock",
    "Daylight",
    "Upgrade",
    "Gimme Love",
    "Run",
    "Sanctuary",
    "High Hopes (feat. Omar Apollo)",
    "NITROUS",
    "Pretty Boy (feat. Lil Yachty)",
    "Normal People (feat. rei brown)",
    "Afterthought",
    "Mr. Hollywood",
    "777",
    "Reanimator (feat. Yves Tumor)",
    "Like You Do",
    "Your Man",
  ];

  for (let i = 0; i < expected.length; i++) {
    assertEquals(expected[i], tracks[i].name);
  }
});

Deno.test("Get multiple albums", async () => {
  const multipleAlbums = await spotify.getMultipleAlbums(["Nectar", "Ballads"]);

  const expected = [
    "Nectar",
    "BALLADS 1",
  ];

  const artist = "Joji";

  for (let i = 0; i < multipleAlbums.length; i++) {
    assertEquals(multipleAlbums[i].name, expected[i]);
    assertEquals(multipleAlbums[i].artists[0].name, artist);
  }
});

Deno.test("Get artist's top songs", async () => {
  const artist = await spotify.getArtist("Joji");
  const topTracks = await artist.getTopTracks();

  const expected = [
    "SLOW DANCING IN THE DARK",
    "YEAH RIGHT",
    "worldstar money (interlude)",
    "Daylight",
    "Your Man",
    "Will He",
    "Gimme Love",
    "CAN'T GET OVER YOU (feat. Clams Casino)",
    "Midsummer Madness",
    "Sanctuary",
  ];

  for (let i = 0; i < expected.length; i++) {
    assertEquals(expected[i], topTracks[i].name);
  }
});

Deno.test("Get albums and singles", async () => {
  const artist = await spotify.getArtist("joji");
  const albums = await artist.getAlbums({
    market: "US",
  });
  const singles = await artist.getSingles({
    market: "US",
  });

  const expectedAlbums = [
    "Nectar",
    "Nectar",
    "BALLADS 1",
    "BALLADS 1",
    "In Tongues (Deluxe)",
    "In Tongues Deluxe",
  ];

  const expectedSingles = [
    "Daylight",
    "Daylight",
    "Gimme Love",
    "Gimme Love (Channel Tres Remix)",
    "Run",
    "Sanctuary",
    "SLOW DANCING IN THE DARK (Loud Luxury Remix)",
    "SLOW DANCING IN THE DARK (Mr. Mitch Remix)",
    "SLOW DANCING IN THE DARK (Acoustic Remix)",
    "Peach Jam",
    "Yeah Right",
    "YEAH RIGHT",
    "In Tongues",
    "In Tongues",
  ];

  for (let i = 0; i < expectedAlbums.length; i++) {
    assertEquals(expectedAlbums[i], albums[i].name);
  }

  for (let i = 0; i < expectedSingles.length; i++) {
    assertEquals(expectedSingles[i], singles[i].name);
  }
});

Deno.test("Get new releases", async () => {
  const newReleases = await spotify.getNewReleases();
  for (const release of newReleases) {
    console.log(release.artists[0].name, " - ", release.name);
  }
});

Deno.test("Get Tracks from a featured playlist", async () => {
  const featuredPlaylists = await spotify.getFeaturedPlaylists();
  const tracks = await featuredPlaylists[0].getTracks();
  for (const track of tracks) {
    console.log(track.name);
  }
});

Deno.test("Get Recommendation genres", async () => {
  const genres = await spotify.getRecommendationGenres();
  for (const genre of genres) {
    console.log(genre);
  }
});

Deno.test("Get episodes", async () => {
  const episode = await spotify.getEpisode("joe rogan");
  console.log(episode.name);
});

Deno.test("Search", async () => {
  const albums = await spotify.rawSearch({
    q: "Nectar",
    type: SearchType.Album,
  });
  console.log(albums);
});

Deno.test("Get Track", async () => {
  const track = await spotify.getTrack("Peach Jam");
  console.log(track.previewUrl);
});

Deno.test("Get Audio Features", async () => {
  const track = await spotify.getTrack("Peach Jam");
  const audioFeatures = await spotify.getAudioFeaturesForTrack({
    id: track.id,
  });
  console.log(
    audioFeatures.danceability,
    audioFeatures.acousticness,
    audioFeatures.liveness,
    audioFeatures.timeSignature,
  );
});
