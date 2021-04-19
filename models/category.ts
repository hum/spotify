import { caller } from "../handlers/caller.ts";
import { CategoryObj, ImageObj, SimplifiedPlaylistObj } from "../types.ts";
import { SimplifiedPlaylist } from "./models.ts";
import { endpoints } from "../endpoints.ts";
import * as opts from "../opts.ts";

export class Category {
  #data: CategoryObj;

  constructor(data: CategoryObj) {
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
    opts: opts.CategoryPlaylistsOpt,
  ): Promise<Array<SimplifiedPlaylist>> {
    const result: Array<SimplifiedPlaylist> = [];
    const data = await caller.fetch(
      endpoints.GET_CATEGORY_PLAYLISTS(opts),
    );
    const playlists: Array<SimplifiedPlaylistObj> = data["playlists"]["items"];

    for (const playlist of playlists) {
      result.push(new SimplifiedPlaylist(playlist));
    }
    return result;
  }
}
