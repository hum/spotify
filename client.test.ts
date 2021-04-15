import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { Client } from "./client.ts";

const TOKEN = Deno.env.get("spotify_access_token") ?? "";

const spotify = new Client({
  accessToken: TOKEN,
});

Deno.test("Incorrect token provided error", async () => {
  const client = new Client({
    accessToken: "aaa",
  });

  await assertThrowsAsync(() => client.getArtist("joji"));
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

  assertThrowsAsync(() => spotify.getArtist(""), Error);
});

Deno.test("Fetch album data", async () => {
  const artist = await spotify.getArtist("joji");
  const albums = await artist.getAlbums();

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
  const tracks = await album.getTracks();
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

  for (let i = 0; i < tracks.length; i++) {
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
