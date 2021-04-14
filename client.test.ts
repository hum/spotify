import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { Client } from "./client.ts";

const TOKEN = Deno.env.get("spotify_access_token") ?? "";

Deno.test("Incorrect token provided error", async () => {
  const spotify = new Client({
    accessToken: "aaa",
  });

  await assertThrowsAsync(() => spotify.getArtist("joji"));
});

Deno.test("Fetch artist data", async () => {
  const spotify = new Client({
    accessToken: TOKEN,
  });

  const artist = await spotify.getArtist("joji");
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
