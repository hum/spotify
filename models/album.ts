import { Caller } from "../handlers/caller.ts";
import {
  AlbumObj,
  CopyrightObj,
  ExternalIdObj,
  SimplifiedTrackObj,
} from "../types.ts";
import {
  SimplifiedAlbum,
  SimplifiedArtist,
  SimplifiedTrack,
} from "./models.ts";
import { endpoints } from "../endpoints.ts";

export class Album extends SimplifiedAlbum {
  #caller: Caller;
  #data: AlbumObj;
  #tracks: Array<SimplifiedTrack>;

  constructor(data: AlbumObj, caller: Caller) {
    super(data, caller);
    this.#caller = caller;
    this.#data = data;
    this.#tracks = [];
  }

  get copyrights(): Array<CopyrightObj> {
    return this.#data.copyrights;
  }

  get externalIds(): ExternalIdObj {
    return this.#data.external_ids;
  }

  get label(): string {
    return this.#data.label;
  }

  get popularity(): number {
    return this.#data.popularity;
  }

  async getTracks(): Promise<Array<SimplifiedTrack>> {
    if (this.#tracks.length > 0) {
      return this.#tracks;
    }

    const data = await this.#caller.fetch(endpoints.GET_ALBUM_TRACKS(this.id));
    const values: Array<SimplifiedTrackObj> = data["items"];

    const result: Array<SimplifiedTrack> = [];
    for (const track of values) {
      result.push(new SimplifiedTrack(track, this.#caller));
    }
    this.#tracks = result;
    return result;
  }

  get artists(): Array<SimplifiedArtist> {
    const artists: Array<SimplifiedArtist> = [];
    for (const artist of this.#data.artists) {
      artists.push(new SimplifiedArtist(artist, this.#caller));
    }
    return artists;
  }
}
