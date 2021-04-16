import { Caller } from "../handlers/caller.ts";
import { Artist, SimplifiedTrack } from "./models.ts";
import { ExternalIdObj, TrackObj } from "../types.ts";

export class Track extends SimplifiedTrack {
  #data: TrackObj;
  #caller: Caller;

  constructor(data: TrackObj, caller: Caller) {
    super(data, caller);
    this.#data = data;
    this.#caller = caller;
  }

  get artists(): Array<Artist> {
    const result: Array<Artist> = [];

    for (const artist of this.#data.artists) {
      result.push(new Artist(artist, this.#caller));
    }
    return result;
  }

  get externalIds(): ExternalIdObj {
    return this.#data.external_ids;
  }

  get popularity(): number {
    return this.#data.popularity;
  }
}
