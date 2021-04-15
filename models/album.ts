import { Caller } from "../handlers/caller.ts";
import {
  AlbumObj,
  CopyrightObj,
  ExternalIdObj,
  ExternalUrlObj,
} from "../types.ts";
import { Artist, SimplifiedAlbum } from "./models.ts";

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

  getTracks(): Array<SimplifiedTrack> {
    const result: Array<SimplifiedTracks> = [];
    for (const track of this.#data.tracks) {
      result.push(new SimplifiedTrack(track, this.#caller));
    }
    return result;
  }

  getArtists(): Array<Artist> {
    const artists: Array<Artist> = [];
    for (const artist of this.#data.artists) {
      artists.push(new Artist(artist, this.#caller));
    }
    return artists;
  }

  get externalUrl(): ExternalUrlObj {
    return this.#data.external_urls;
  }
}
