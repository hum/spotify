import { caller } from "../handlers/caller.ts";
import {
  AlbumObj,
  AlbumRestrictionObj,
  ExternalUrlObj,
  ImageObj,
  SimplifiedAlbumObj,
} from "../structures/structs.ts";
import { Album, SimplifiedArtist } from "./types.ts";
import { endpoints } from "../endpoints/endpoints.ts";

export class SimplifiedAlbum {
  #data: SimplifiedAlbumObj;

  constructor(data: SimplifiedAlbumObj) {
    this.#data = data;
  }

  get albumGroup(): string {
    return this.#data.album_group;
  }

  get albumType(): string {
    return this.#data.album_type;
  }

  get artists(): Array<SimplifiedArtist> {
    const result: Array<SimplifiedArtist> = [];

    for (const artist of this.#data.artists) {
      result.push(new SimplifiedArtist(artist));
    }
    return result;
  }

  async getAllData(market?: string): Promise<Album> {
    const data = await caller.fetch({
      url: endpoints.GET_ALBUM({ id: this.id, market: market }),
    }) as AlbumObj;

    const album = new Album(data);
    return album;
  }

  get availableMarkets(): Array<string> {
    return this.#data.available_markets;
  }

  get externalUrls(): ExternalUrlObj {
    return this.#data.external_urls;
  }

  get href(): string {
    return this.#data.href;
  }

  get id(): string {
    return this.#data.id;
  }

  get images(): Array<ImageObj> {
    return this.#data.images;
  }

  get name(): string {
    return this.#data.name;
  }

  get releaseDate(): string {
    return this.#data.release_date;
  }

  get releaseDatePrecision(): string {
    return this.#data.release_date_precision;
  }

  get restrictions(): AlbumRestrictionObj {
    return this.#data.restrictions;
  }

  get type(): string {
    return this.#data.type;
  }

  get uri(): string {
    return this.#data.uri;
  }
}
