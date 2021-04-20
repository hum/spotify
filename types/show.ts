import { SimplifiedEpisode, SimplifiedShow } from "./types.ts";
import { ShowObj } from "../structures/structs.ts";

export class Show extends SimplifiedShow {
  #data: ShowObj;

  constructor(data: ShowObj) {
    super(data);
    this.#data = data;
  }

  get episodes(): Array<SimplifiedEpisode> {
    const result: Array<SimplifiedEpisode> = [];
    for (const episode of this.#data.episodes) {
      result.push(new SimplifiedEpisode(episode));
    }
    return result;
  }
}
