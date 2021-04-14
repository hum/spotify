import { Caller } from "../handlers/caller.ts";
import { AlbumObj } from "../types.ts";
import { Artist } from "./models.ts";

export class Album {
  #caller: Caller;
  #data: AlbumObj;

  constructor(data: AlbumObj, caller: Caller) {
    this.#caller = caller;
    this.#data = data;
  }

  get albumType(): string {
    return this.#data.album_type;
  }

  get artists(): Array<Artist> {
    const artists: Array<Artist> = [];
    for (const artist of this.#data.artists) {
      artists.push(new Artist(artist, this.#caller));
    }
    return artists;
  }
}
