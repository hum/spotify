import {
  ExternalUrlObj,
  FollowersObj,
  ImageObj,
  PublicUserObj,
} from "../structures/structs.ts";

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
}
