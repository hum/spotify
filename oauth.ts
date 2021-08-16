import { Application, Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { encode } from "https://deno.land/std@0.93.0/encoding/base64.ts";

/**
 * CLIENT ID and CLIENT SECRET can be found at
 * https://developer.spotify.com/dashboard/applications
 *
 * 1. Create your app
 * 2. Get "client ID" and "client secret" tokens
 * 3. Export them to your env as "spotify_client_id" and "spotify_client_secret"
 * 4. Make sure to also add 'http://localhost:8080/callback' in your app's settings
 */
const CLIENT_ID = Deno.env.get("spotify_client_id") ?? "";
const CLIENT_SECRET = Deno.env.get("spotify_client_secret") ?? "";
const REDIRECT_URI = "http://localhost:8080/callback";

/**
 * full list of SCOPES can be found at
 * https://developer.spotify.com/documentation/general/guides/SCOPES/
 */
const SCOPES = [
  "ugc-image-upload",
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-follow-modify",
  "user-library-modify",
  "user-library-read",
  "user-read-email",
  "user-read-private",
].join(" ");

const url = "https://accounts.spotify.com/authorize?response_type=code" +
  `&client_id=${encodeURIComponent(CLIENT_ID)}` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

const app = new Application();
const router = new Router();

router
  .get("/login", (ctx) => {
    ctx.response.redirect(url);
  })
  .get("/callback", async (ctx) => {
    const code: string | null = ctx.request.url.searchParams.get("code");
    if (!code) {
      console.log(`No code provided`);
      ctx.response.body = `${ctx.request.body}`;
      return;
    }
    const value = encode(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const data = await fetch(
      "https://accounts.spotify.com/api/token" +
        "?grant_type=authorization_code" +
        `&code=${encodeURIComponent(code)}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${value}`,
        },
      },
    );
    const json = await data.json();
    const accessToken = json["access_token"];
    const refreshToken = json["refresh_token"];
    const expiresIn = json["expires_in"];

    console.log(
      `ACCESS TOKEN: ${accessToken}\n\n` +
        `REFRESH TOKEN: ${refreshToken}\n\n` +
        `EXPIRES IN: ${expiresIn}`,
    );

    ctx.response.body = `You can close this window now.`;
    return;
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`To get OAuth tokens, navigate to: ${url}/login`);
});

async function main() {
  if (!CLIENT_ID) {
    console.log("Please export 'spotify_client_id' value.");
  }
  if (!CLIENT_SECRET) {
    console.log("Please export 'spotify_client_secret' value.");
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.log(
      "You can find the necessary Spotify tokens at: https://developer.spotify.com/dashboard/applications",
    );
    return;
  }

  await app.listen({ port: 8080 });
}

if (import.meta.main) {
  await main();
}
