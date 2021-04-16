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

export class Album extends SimplifiedAlbum {
  #caller: Caller;
  #data: AlbumObj;

  constructor(data: AlbumObj, caller: Caller) {
    super(data, caller);
    this.#caller = caller;
    this.#data = data;
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

  get tracks(): Array<SimplifiedTrack> {
    const result: Array<SimplifiedTrack> = [];
    for (const track of this.#data.tracks.items) {
      result.push(
        new SimplifiedTrack(track as SimplifiedTrackObj, this.#caller),
      );
    }
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
