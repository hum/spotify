# Spotify [WIP]
Deno wrapper for the Spotify API. **This is a very early stage of the wrapper. Absolutely unusable.**

## Usage
-----
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