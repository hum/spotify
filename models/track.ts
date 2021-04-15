import { Caller } from "../handlers/caller.ts";
import { SimplifiedTrack } from "./models.ts";
import { TrackObj } from "../types.ts";

export class Track extends SimplifiedTrack {
  #data: TrackObj;
  #caller: Caller;

  constructor(data: TrackObj, caller: Caller) {
    super(data, caller);
    this.#data = data;
    this.#caller = caller;
  }
}
/**
 * artists
 * externalIds
 * popularity
 */
