import { ArtistObj } from "./types.ts";
import { endpoints, SearchType } from "./endpoints.ts";
import { Artist } from "./models/models.ts";
import { Caller, CallerOpt } from "./handlers/caller.ts";

export class Client {
  #caller: Caller;

  constructor(conf: CallerOpt) {
    this.#caller = new Caller(conf);
  }

  async getArtist(name: string): Promise<Artist> {
    if (name.length == 0) {
      throw new Error("Parameter 'name' needs to be specified.");
    }
    const result = await this.#caller.fetch(
      endpoints.SEARCH(name, SearchType.Artist, "US"),
    );
    const data = result["artists"]["items"][0] as ArtistObj;
    return new Artist(data, this.#caller);
  }
}
