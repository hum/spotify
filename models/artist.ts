import { ArtistObj, FollowersObj, ImageObj } from "../types.ts";
import { Caller } from "../handlers/caller.ts";
import { SimplifiedArtist } from "./models.ts";

export class Artist extends SimplifiedArtist {
  #data: ArtistObj;
  #caller: Caller;

  constructor(data: ArtistObj, caller: Caller) {
    super(data, caller);
    this.#data = data;
    this.#caller = caller;
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
