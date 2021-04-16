import {
  ArtistObj,
  ExternalUrlObj,
  SimplifiedAlbumObj,
  SimplifiedArtistObj,
  TrackObj,
} from "../types.ts";
import { Caller } from "../handlers/caller.ts";
import { Artist, SimplifiedAlbum, Track } from "./models.ts";
import { endpoints } from "../endpoints.ts";

export class SimplifiedArtist {
  #caller: Caller;
  #data: SimplifiedArtistObj;
  #albums: Array<SimplifiedAlbum>;
  #singles: Array<SimplifiedAlbum>;

  constructor(data: SimplifiedArtistObj, caller: Caller) {
    this.#caller = caller;
    this.#data = data;
    this.#albums = [];
    this.#singles = [];
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
    if (this.#albums.length > 0) {
      return this.#albums;
    }

    const data = await this.#caller.fetch(
      endpoints.GET_ARTISTS_ALBUMS(
        this.id,
        includeGroups,
        market,
        limit,
        offset,
      ),
    );

    const values: Array<SimplifiedAlbumObj> = data["items"];

    for (const album of values) {
      const simpleAlbum = new SimplifiedAlbum(album, this.#caller);
      if (simpleAlbum.albumType == "single") {
        this.#singles.push(simpleAlbum);
      } else {
        this.#albums.push(simpleAlbum);
      }
    }
    return this.#albums;
  }

  async getSingles(
    includeGroups?: Array<string>,
    market?: string,
    limit?: number,
    offset?: number,
  ): Promise<Array<SimplifiedAlbum>> {
    if (this.#singles.length > 0) {
      return this.#singles;
    }

    const data = await this.#caller.fetch(
      endpoints.GET_ARTISTS_ALBUMS(
        this.id,
        includeGroups,
        market,
        limit,
        offset,
      ),
    );

    const values: Array<SimplifiedAlbumObj> = data["items"];

    for (const album of values) {
      const simpleAlbum = new SimplifiedAlbum(album, this.#caller);
      if (simpleAlbum.albumType == "single") {
        this.#singles.push(simpleAlbum);
      } else {
        this.#albums.push(simpleAlbum);
      }
    }
    return this.#singles;
  }

  async getTopTracks(market?: string): Promise<Array<Track>> {
    if (!market) {
      market = "US";
    }

    const data = await this.#caller.fetch(
      endpoints.GET_ARTIST_TOP_TRACKS(this.id, market),
    );
    const values: Array<TrackObj> = data["tracks"];
    const result: Array<Track> = [];

    for (const track of values) {
      result.push(new Track(track, this.#caller));
    }
    return result;
  }

  async getRelatedArtists(): Promise<Array<Artist>> {
    const data = await this.#caller.fetch(
      endpoints.GET_RELATED_ARTISTS(this.id),
    );
    const values: Array<ArtistObj> = data["artists"];
    const result: Array<Artist> = [];

    for (const artist of values) {
      result.push(new Artist(artist, this.#caller));
    }
    return result;
  }
}
