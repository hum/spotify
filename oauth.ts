/**
 * Simplified way to get auth tokens for the purpose of development.
 */
import { Application, encode, Router } from "./deps.ts";

/**
 * CLIENT ID and CLIENT SECRET can be found at
 * https://developer.spotify.com/dashboard/applications
 * 
 * 1. Create your app
 * 2. Get "client ID" and "client secret" tokens
 * 3. Export them to your env as "spotify_client_id" and "spotify_client_secret"
 * 
 * PS: Make sure to also add 'http://localhost:8080/callback' in your app's settings
 */
const clientId = Deno.env.get("spotify_client_id") ?? "";
const clientSecret = Deno.env.get("spotify_client_secret") ?? "";
const redirectUri = "http://localhost:8080/callback";

/**
 * full list of scopes can be found at
 * https://developer.spotify.com/documentation/general/guides/scopes/
 */
const scopes = [
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
  `&client_id=${clientId}` +
  `&scope=${encodeURIComponent(scopes)}` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}`;

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
    const value = encode(`${clientId}:${clientSecret}`);
    const data = await fetch(
      "https://accounts.spotify.com/api/token" +
        "?grant_type=authorization_code" +
        `&code=${encodeURIComponent(code)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}`,
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
  if (!clientId) {
    console.log("Please export 'spotify_client_id' value.");
  }
  if (!clientSecret) {
    console.log("Please export 'spotify_client_secret' value.");
  }
  await app.listen({ port: 8080 });
}

if (import.meta.main) {
  await main();
}
