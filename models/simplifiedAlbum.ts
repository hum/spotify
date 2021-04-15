import { Caller } from "../handlers/caller.ts";
import {
  AlbumObj,
  AlbumRestrictionObj,
  ExternalUrlObj,
  ImageObj,
  SimplifiedAlbumObj,
} from "../types.ts";
import { Album, SimplifiedArtist } from "./models.ts";
import { endpoints } from "../endpoints.ts";

export class SimplifiedAlbum {
  #caller: Caller;
  #data: SimplifiedAlbumObj;

  constructor(data: SimplifiedAlbumObj, caller: Caller) {
    this.#caller = caller;
    this.#data = data;
  }

  get albumGroup(): string {
    return this.#data.album_group;
  }

  get albumType(): string {
    return this.#data.album_type;
  }

  getArtists(): Array<SimplifiedArtist> {
    const result: Array<SimplifiedArtist> = [];

    for (const artist of this.#data.artists) {
      result.push(new SimplifiedArtist(artist, this.#caller));
    }
    return result;
  }

  async getAllData(market?: string): Promise<Album> {
    const data: AlbumObj = await this.#caller.fetch(
      endpoints.GET_ALBUM(this.id, market),
    );
    const album = new Album(data, this.#caller);
    return album;
  }

  get availableMarkets(): Array<string> {
    return this.#data.available_markets;
  }

  get externalUrl(): ExternalUrlObj {
    return this.#data.external_url;
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
