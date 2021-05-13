import {
  ExplicitContentSettingsObj,
  PrivateUserObj,
  SimplifiedPlaylistObj,
} from "../structures/structs.ts";
import { PublicUser, SimplifiedPlaylist } from "./types.ts";
import { CurrentUserPlaylistOpts } from "../opts/opts.ts";
import { caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints/endpoints.ts";

export class PrivateUser extends PublicUser {
  #data: PrivateUserObj;

  constructor(data: PrivateUserObj) {
    super(data);
    this.#data = data;
  }

  get country(): string {
    return this.#data.country;
  }

  get email(): string {
    return this.#data.email;
  }

  get explicitContent(): ExplicitContentSettingsObj {
    return this.#data.explicit_content;
  }

  get product(): string {
    return this.#data.product;
  }

  async getPlaylists(
    opts?: CurrentUserPlaylistOpts,
  ): Promise<Array<SimplifiedPlaylist>> {
    const data: Array<SimplifiedPlaylistObj> = (await caller.fetch({
      url: endpoints.GET_CURRENT_USER_PLAYLISTS(opts),
    }))["items"];

    const result: Array<SimplifiedPlaylist> = [];
    for (const playlist of data) {
      result.push(new SimplifiedPlaylist(playlist));
    }
    return result;
  }
}
