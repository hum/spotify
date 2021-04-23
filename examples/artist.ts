import { Client } from "../mod.ts";

const accessToken = Deno.env.get("spotify_access_token") ?? "";

async function run() {
  const spotify = new Client({
    accessToken: accessToken,
  });

  /**
  * Now Spofiy knows what you are listening to :)
  */
  const justin = await spotify.getArtist("Justin Bieber");

  /**
  * Iterate over his most popular songs
  */
  for (const song of await justin.getTopTracks()) {
    console.log(`${justin.name} - ${song.name}`);
  }

  /**
  * Let's get my favourite one.
  */
  const bestSongEverMade = await justin.getSong("Baby");

  /**
  * Some deep knowledge about the song
  */
  if (bestSongEverMade) {
    const analysis = await spotify.getAudioAnalysis(bestSongEverMade.id);
    console.log(analysis.bars);
  }
}

if (import.meta.main) {
  await run();
}
