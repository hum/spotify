import {
  ArtistObj,
  ExternalUrlObj,
  FollowersObj,
  ImageObj,
  PublicUserObj,
} from "../structures/structs.ts";
import { Artist } from "./types.ts";
import { caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints/endpoints.ts";

export class PublicUser {
  #data: PublicUserObj;

  constructor(data: PublicUserObj) {
    this.#data = data;
  }

  get name(): string {
    return this.#data.display_name;
  }

  get externalUrls(): ExternalUrlObj {
    return this.#data.external_urls;
  }

  get followers(): FollowersObj {
    return this.#data.followers;
  }

  get href(): string {
    return this.#data.href;
  }

  get id(): string {
    return this.#data.id;
  }

  get images(): Array<ImageObj> {
    return this.#data.images;
  }

  get type(): string {
    return this.#data.type;
  }

  get uri(): string {
    return this.#data.uri;
  }

  async getFollowedArtists(
    after?: string,
    limit?: number,
  ): Promise<Array<Artist>> {
    const data = (await caller.fetch({
      url: endpoints.GET_FOLLOWED_ARTISTS({
        type: "artist",
        after: after,
        limit: limit,
      }),
    }))["artists"]["items"] as Array<ArtistObj>;

    const result: Array<Artist> = [];
    for (const artist of data) {
      result.push(new Artist(artist));
    }
    return result;
  }

  async follow(ids: Array<string>, type?: string) {
    await caller.fetch({
      url: endpoints.FOLLOW_ARTISTS_OR_USERS({
        ids: ids,
        type: type ?? "artist",
      }),
      method: "PUT",
    });
  }

  async unfollow(ids: Array<string>, type?: string) {
    await caller.fetch({
      url: endpoints.FOLLOW_ARTISTS_OR_USERS({
        ids: ids,
        type: type ?? "artist",
      }),
      method: "DELETE",
    });
  }

  async isFollowing(
    ids: Array<string>,
    type?: string,
  ): Promise<Map<string, boolean>> {
    const data: Array<boolean> = await caller.fetch({
      url: endpoints.GET_FOLLOWING_STATE({
        type: type ?? "artist",
        ids: ids,
      }),
    });

    const result: Map<string, boolean> = new Map();
    for (let i = 0; i < ids.length; i++) {
      result.set(ids[i], data[i]);
    }
    return result;
  }
}
