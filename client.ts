import { ArtistObj } from "./models.ts";
import { endpoints, SearchType } from "./endpoints.ts";

export interface ClientConfig {
  accessToken: string;
  refreshToken?: string;
  /**
     * Base URL for the Spotify API
     * @default "https://api.spotify.com/v1"
     */
  baseUrl?: string;
}

export class Client {
  #conf: ClientConfig;

  constructor(conf: ClientConfig) {
    conf.baseUrl = conf.baseUrl ?? "https://api.spotify.com/v1";
    this.#conf = conf;
  }

  async getArtist(name: string): Promise<ArtistObj> {
    if (name.length == 0) {
      throw new Error("Parameter 'name' needs to be specified.");
    }
    const result = await this.fetch(endpoints.SEARCH(name, SearchType.Artist, "US"));
    return result["artists"]["items"][0] as ArtistObj;
  }

  // deno-lint-ignore no-explicit-any
  private async fetch(url: string): Promise<any> {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": this.#conf.accessToken,
        },
    });
    const json = await response.json();

    if (response.status != 200) {
      const err = `The API returned a non-successful response. ${
        JSON.stringify(json["error"])
      }.`;
      throw new Error(err);
    }
    return json;
  }
}
