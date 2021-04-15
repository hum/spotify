import {
  ExternalUrlObj,
  SimplifiedAlbumObj,
  SimplifiedArtistObj,
} from "../types.ts";
import { Caller } from "../handlers/caller.ts";
import { Artist, SimplifiedAlbum } from "./models.ts";
import { endpoints } from "../endpoints.ts";

export class SimplifiedArtist {
  #caller: Caller;
  #data: SimplifiedArtistObj;

  constructor(data: SimplifiedArtistObj, caller: Caller) {
    this.#caller = caller;
    this.#data = data;
  }

  get externalUrls(): ExternalUrlObj {
    return this.#data.externalUrls;
  }

  get href(): string {
    return this.#data.href;
  }

  get id(): string {
    return this.#data.id;
  }

  get name(): string {
    return this.#data.name;
  }

  get type(): string {
    return this.#data.type;
  }

  get uri(): string {
    return this.#data.uri;
  }

  async getAllData(): Promise<Artist> {
    const data: Artist = await this.#caller.fetch(
      endpoints.GET_ARTIST(this.id),
    );
    return data;
  }

  /**
   * @param includeGroups A string array of keywords to filter the response - album | single | appears_on | compilation
   * @param market Synonym for 'country'. ISO 3166-1 alpha-2 country code. 
   * @param limit The number of objects to return
   * @param offset The index of the first album to return.
   * @default market="US", offset=0, limit=2
   * @returns An array of AlbumObj items from the specific artist. 
   */
  async getAlbums(
    includeGroups?: Array<string>,
    market?: string,
    limit?: number,
    offset?: number,
  ): Promise<Array<SimplifiedAlbum>> {
    const data = await this.#caller.fetch(
      endpoints.GET_ARTISTS_ALBUMS(
        this.id,
        includeGroups,
        market,
        limit,
        offset,
      ),
    );

    let values: Array<SimplifiedAlbumObj> = data["items"];

    values = values.filter((value) => {
      return value.album_type == "album";
    });

    const result: Array<SimplifiedAlbum> = [];
    for (const album of values) {
      result.push(new SimplifiedAlbum(album, this.#caller));
    }
    return result;
  }

  async getRelatedArtists(): Promise<Array<Artist>> {
    const data = await this.#caller.fetch(
      endpoints.GET_RELATED_ARTISTS(this.id),
    );

    const artists: Array<Artist> = [];
    for (const artist of data["artists"]) {
      artists.push(new Artist(artist, this.#caller));
    }
    return artists;
  }
}
