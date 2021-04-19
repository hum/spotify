import { ArtistObj, FollowersObj, ImageObj } from "../types.ts";
import { SimplifiedArtist } from "./models.ts";

export class Artist extends SimplifiedArtist {
  #data: ArtistObj;

  constructor(data: ArtistObj) {
    super(data);
    this.#data = data;
  }

  get followers(): FollowersObj {
    return this.#data.followers;
  }

  get genres(): Array<string> {
    return this.#data.genres;
  }

  get images(): Array<ImageObj> {
    return this.#data.images;
  }

  get popularity(): number {
    return this.#data.popularity;
  }
}
