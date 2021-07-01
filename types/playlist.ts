import {
  ExternalUrlObj,
  FollowersObj,
  ImageObj,
  PlaylistObj,
} from "../structures/structs.ts";
import { PlaylistTrack, PublicUser } from "./types.ts";
import { endpoints } from "../endpoints/endpoints.ts";
import { caller } from "../handlers/caller.ts";

/**
 * TODO:
 * Move PlaylistObj and SimplifiedPlaylistObj into a base class obj
 * to be able to extend it
 */
export class Playlist {
  #data: PlaylistObj;

  constructor(data: PlaylistObj) {
    this.#data = data;
  }

  get isCollaborative(): boolean {
    return this.#data.collaborative;
  }

  get description(): string {
    return this.#data.description;
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

  get name(): string {
    return this.#data.name;
  }

  get owner(): PublicUser {
    return new PublicUser(this.#data.owner);
  }

  get isPublic(): boolean {
    return this.#data.public;
  }

  get snapshotId(): string {
    return this.#data.snapshot_id;
  }

  get tracks(): Array<PlaylistTrack> {
    const result: Array<PlaylistTrack> = [];
    for (const track of this.#data.tracks) {
      result.push(new PlaylistTrack(track));
    }
    return result;
  }

  get type(): string {
    return this.#data.type;
  }

  get uri(): string {
    return this.#data.uri;
  }

  /**
   * Update playlist's information to match the local object
   * @field name
   * @field public
   * @field collaborative
   * @field description
   */
  async saveChanges() {
    await caller.fetch({
      url: endpoints.CHANGE_PLAYLIST_DETAILS(this.id),
      method: "PUT",
      body: {
        name: this.name,
        public: this.isPublic,
        collaborative: this.isCollaborative,
        description: this.description,
      },
    });
  }
}
