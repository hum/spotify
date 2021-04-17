import { Caller } from "../handlers/caller.ts";
import { CategoryObj, ImageObj, SimplifiedPlaylistObj } from "../types.ts";
import { SimplifiedPlaylist } from "./models.ts";
import { endpoints } from "../endpoints.ts";

export class Category {
  #caller: Caller;
  #data: CategoryObj;

  constructor(data: CategoryObj, caller: Caller) {
    this.#caller = caller;
    this.#data = data;
  }

  get href(): string {
    return this.#data.href;
  }

  get icons(): Array<ImageObj> {
    return this.#data.icons;
  }

  get id(): string {
    return this.#data.id;
  }

  get name(): string {
    return this.#data.name;
  }

  async getPlaylists(
    country?: string,
    limit?: number,
    offset?: number,
  ): Promise<Array<SimplifiedPlaylist>> {
    const result: Array<SimplifiedPlaylist> = [];
    const data = await this.#caller.fetch(
      endpoints.GET_CATEGORY_PLAYLISTS(this.id, country, limit, offset),
    );
    const playlists: Array<SimplifiedPlaylistObj> = data["playlists"]["items"];

    for (const playlist of playlists) {
      result.push(new SimplifiedPlaylist(playlist, this.#caller));
    }
    return result;
  }
}
