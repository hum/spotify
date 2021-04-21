import {
  CurrentlyPlayingContextObj,
  DisallowsObj,
} from "../structures/structs.ts";
import { CurrentlyPlaying, Device, PlayerContext } from "./types.ts";

export class CurrentlyPlayingContext extends CurrentlyPlaying {
  #data: CurrentlyPlayingContextObj;

  constructor(data: CurrentlyPlayingContextObj) {
    super(data);
    this.#data = data;
  }

  get actions(): DisallowsObj {
    return this.#data.actions;
  }
  get context(): PlayerContext {
    return new PlayerContext(this.#data.context);
  }
  get device(): Device {
    return new Device(this.#data.device);
  }
  get repeatState(): string {
    return this.#data.repeat_state;
  }
  get shuffleState(): string {
    return this.#data.shuffle_state;
  }
}
