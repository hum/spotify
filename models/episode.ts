import { EpisodeObj, SimplifiedShowObj } from "../types.ts";
import { SimplifiedEpisode } from "./models.ts";

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
