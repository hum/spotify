import { caller } from "../handlers/caller.ts";
import {
  CopyrightObj,
  ExternalUrlObj,
  ImageObj,
  SimplifiedShowObj,
} from "../types.ts";

export class SimplifiedShow {
  #data: SimplifiedShowObj;

  constructor(data: SimplifiedShowObj) {
    this.#data = data;
  }

  get availableMarkets(): Array<string> {
    return this.#data.available_markets;
  }
  get copyrights(): Array<CopyrightObj> {
    return this.#data.copyrights;
  }
  get description(): string {
    return this.#data.description;
  }
  get isExplicit(): boolean {
    return this.#data.explicit;
  }
  get externalUrls(): ExternalUrlObj {
    return this.#data.external_urls;
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
  get isExternallyHosted(): boolean {
    return this.#data.is_externally_hosted;
  }
  get languages(): Array<string> {
    return this.#data.languages;
  }
  get mediaType(): string {
    return this.#data.media_type;
  }
  get name(): string {
    return this.#data.name;
  }
  get publisher(): string {
    return this.#data.publisher;
  }
  get type(): string {
    return this.#data.type;
  }
  get uri(): string {
    return this.#data.uri;
  }
}
