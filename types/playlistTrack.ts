import { Track } from "./types.ts";
import {
  PlaylistTrackObj,
  PublicUserObj,
  TrackObj,
} from "../structures/structs.ts";

export class PlaylistTrack extends Track {
  #data: PlaylistTrackObj;

  constructor(data: PlaylistTrackObj) {
    super(data.track as TrackObj);
    this.#data = data;
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
