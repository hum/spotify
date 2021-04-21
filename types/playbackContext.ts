import { CurrentlyPlayingContextObj } from "../structures/structs.ts";
import { Device, Episode, Track } from "./types.ts";

export class PlaybackContext {
  #data: CurrentlyPlayingContextObj;

  constructor(data: CurrentlyPlayingContextObj) {
    this.#data = data ?? {
      context: null,
      currently_playing_type: null,
      is_playing: null,
      item: null,
      progress_ms: null,
      timestamp: null,
    };
  }

  get isPlaying(): boolean {
    return this.#data.is_playing ?? false;
  }

  get audioType(): string {
    return this.#data.currently_playing_type;
  }

  get device(): Device {
    return new Device(this.#data.device);
  }

  get progressMs(): number {
    return this.#data.progress_ms;
  }

  get shuffleState(): string {
    return this.#data.shuffle_state;
  }

  get repeatState(): string {
    return this.#data.repeat_state;
  }

  get timestamp(): number {
    return this.#data.timestamp;
  }
}
