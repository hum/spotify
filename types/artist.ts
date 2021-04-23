import {
  ArtistObj,
  FollowersObj,
  ImageObj,
  TrackObj,
} from "../structures/structs.ts";
import { SimplifiedArtist, Track } from "./types.ts";
import { caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints/endpoints.ts";
import { SearchType } from "../opts/opts.ts";

export class Artist extends SimplifiedArtist {
  #data: ArtistObj;

  constructor(data: ArtistObj) {
    super(data);
    this.#data = data;
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

  async getSong(name: string): Promise<Track | null> {
    const data = (await caller.fetch({
      url: endpoints.SEARCH({
        q: name,
        type: SearchType.Track,
      }),
    }))["tracks"]["items"];

    for (const track of data) {
      for (const artist of track.artists) {
        if (artist.name == this.name || artist.id == this.id) {
          return new Track(track);
        }
      }
    }
    return null;
  }
}
