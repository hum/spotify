import {
  CurrentlyPlayingObj,
  EpisodeObj,
  TrackObj,
} from "../structures/structs.ts";
import { Episode, PlayerContext, Track } from "./types.ts";

export class CurrentlyPlaying {
  #data: CurrentlyPlayingObj;

  constructor(data: CurrentlyPlayingObj) {
    this.#data = data;
  }

  get context(): PlayerContext {
    return new PlayerContext(this.#data.context);
  }
  get currentlyPlayingType(): string {
    return this.#data.currently_playing_type;
  }
  get isPlaying(): boolean {
    return this.#data.is_playing;
  }
  get item(): Track | Episode {
    if (this.currentlyPlayingType == "episode") {
      console.log(this.#data);
      return new Episode(this.#data.item as EpisodeObj);
    }
    return new Track(this.#data.item as TrackObj);
  }
}
