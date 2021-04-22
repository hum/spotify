import { ContextObj, PlayHistoryObj } from "../structures/structs.ts";
import { SimplifiedTrack } from "./types.ts";

export class PlayHistory {
  #data: PlayHistoryObj;

  constructor(data: PlayHistoryObj) {
    this.#data = data;
  }

  get context(): ContextObj {
    return this.#data.context;
  }

  get playedAt(): Date {
    return this.#data.played_at;
  }

  get track(): SimplifiedTrack {
    return new SimplifiedTrack(this.#data.track);
  }
}
