import { ArtistObj } from "./models.ts";

export interface ClientConfig {
  accessToken: string;
  refreshToken?: string;
  /**
     * Base URL for the Spotify API
     * @default "https://api.spotify.com/v1"
     */
  baseUrl?: string;
}

interface RequestSettings {
  method: string;
  headers: Record<string, string>;
}

enum SearchType {
  Album = "album",
  Artist = "artist",
  Playlist = "playlist",
  Track = "track",
  Show = "show",
  Episode = "episode",
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
    const result = await this.search(name, SearchType.Artist);
    return result["artists"]["items"][0] as ArtistObj;
  }

  /**
     * TODO:
     * Rewrite to support all queries and params
     */
  private async search(
    query: string,
    type: SearchType,
    // deno-lint-ignore no-explicit-any
  ): Promise<any> {
    const url = `${this.#conf.baseUrl}/search?q=${query} + &type=${type}`;
    return await this.fetch(url, {
      method: "GET",
      headers: {
        "Authorization": this.#conf.accessToken,
      },
    });
  }

  private async fetch(url: string, req: RequestSettings): Promise<any> {
    const response = await fetch(url, req);
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
