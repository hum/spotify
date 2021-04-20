import { Artist, SimplifiedTrack } from "./types.ts";
import { ExternalIdObj, TrackObj } from "../structures/structs.ts";

export class Track extends SimplifiedTrack {
  #data: TrackObj;

  constructor(data: TrackObj) {
    super(data);
    this.#data = data;
  }

  get artists(): Array<Artist> {
    const result: Array<Artist> = [];

    for (const artist of this.#data.artists) {
      result.push(new Artist(artist));
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
