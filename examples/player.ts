import { Client, RepeatState } from "../mod.ts";

const accessToken = Deno.env.get("spotify_access_token") ?? "";

async function run() {
  const spotify = new Client({
    accessToken: accessToken,
  });

  /**
  * Get the Spotify player
  */
  const player = spotify.getPlayer();

  /**
  * Iterate over devices
  */
  for (const device of await player.getDevices()) {
    console.log(
      `Device ID: ${device.id}, Name: ${device.name}, Type: ${device.type}`,
    );
  }

  /**
  * Get Playback
  */
  const playback = await player.getPlayback();

  /**
  * Start music if it's not playing
  * Stop music if it's playing
  */
  if (await playback.isPlaying()) {
    console.log("Pausing music");
    await playback.pause();
  } else {
    console.log("Starting music.");
    await playback.play();
  }

  /**
  * Skip the current track
  */
  await playback.nextTrack();

  /**
  * I have changed my mind and I want to go back to the previous track
  */
  await playback.previousTrack();

  /**
  * Boop. Now you can't hear anything
  */
  await playback.setVolume(0);

  /**
  * Now your ears are bleeding
  */
  await playback.setVolume(100);

  /**
  * And now you are stuck in a loop hell
  */
  await playback.setRepeatMode(RepeatState.TRACK);
}

if (import.meta.main) {
  await run();
}
