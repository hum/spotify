import { EpisodeObj, SimplifiedShowObj } from "../structures/structs.ts";
import { SimplifiedEpisode } from "./types.ts";

export class Episode extends SimplifiedEpisode {
  #data: EpisodeObj;

  constructor(data: EpisodeObj) {
    super(data);
    this.#data = data;
  }

  get show(): SimplifiedShowObj {
    return this.show;
  }
}
