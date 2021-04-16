import { Caller } from "../handlers/caller.ts";
import { Track } from "./models.ts";
import { PlaylistTrackObj, PublicUserObj, TrackObj } from "../types.ts";

export class PlaylistTrack extends Track {
  #caller: Caller;
  #data: PlaylistTrackObj;

  constructor(data: PlaylistTrackObj, caller: Caller) {
    super(data.track as TrackObj, caller);
    this.#data = data;
    this.#caller = caller;
  }

  get addedAt(): Date {
    return this.#data.added_at;
  }

  get addedBy(): PublicUserObj {
    return this.#data.added_by;
  }

  get isLocal(): boolean {
    return this.#data.is_local;
  }
}
