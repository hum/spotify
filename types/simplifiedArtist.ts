import {
  ArtistObj,
  ExternalUrlObj,
  SimplifiedAlbumObj,
  SimplifiedArtistObj,
  TrackObj,
} from "../structures/structs.ts";
import { caller } from "../handlers/caller.ts";
import { Artist, SimplifiedAlbum, Track } from "./types.ts";
import { endpoints } from "../endpoints/endpoints.ts";
import * as opts from "../opts/opts.ts";

export class SimplifiedArtist {
  #data: SimplifiedArtistObj;
  #albums: Array<SimplifiedAlbum>;
  #singles: Array<SimplifiedAlbum>;

  constructor(data: SimplifiedArtistObj) {
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
    const data: Artist = await caller.fetch(
      endpoints.GET_ARTIST({ id: this.id }),
    );
    return data;
  }

  async getAlbums(opts: opts.ArtistAlbumsOpt): Promise<Array<SimplifiedAlbum>> {
    if (this.#albums.length > 0) {
      return this.#albums;
    }
    opts.id = this.id;

    const data = await caller.fetch(
      endpoints.GET_ARTISTS_ALBUMS(opts),
    );

    const values: Array<SimplifiedAlbumObj> = data["items"];

    for (const album of values) {
      const simpleAlbum = new SimplifiedAlbum(album);
      if (simpleAlbum.albumType == "single") {
        this.#singles.push(simpleAlbum);
      } else {
        this.#albums.push(simpleAlbum);
      }
    }
    return this.#albums;
  }

  async getSingles(
    opts: opts.ArtistAlbumsOpt,
  ): Promise<Array<SimplifiedAlbum>> {
    if (this.#singles.length > 0) {
      return this.#singles;
    }

    const data = await caller.fetch(
      endpoints.GET_ARTISTS_ALBUMS(opts),
    );

    const values: Array<SimplifiedAlbumObj> = data["items"];

    for (const album of values) {
      const simpleAlbum = new SimplifiedAlbum(album);
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

    const data = await caller.fetch(
      endpoints.GET_ARTIST_TOP_TRACKS({ id: this.id, market: market }),
    );
    const values: Array<TrackObj> = data["tracks"];
    const result: Array<Track> = [];

    for (const track of values) {
      result.push(new Track(track));
    }
    return result;
  }

  async getRelatedArtists(): Promise<Array<Artist>> {
    const data = await caller.fetch(
      endpoints.GET_RELATED_ARTISTS({ id: this.id }),
    );
    const values: Array<ArtistObj> = data["artists"];
    const result: Array<Artist> = [];

    for (const artist of values) {
      result.push(new Artist(artist));
    }
    return result;
  }
}
