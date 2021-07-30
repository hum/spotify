import {
  ArtistObj,
  ExplicitContentSettingsObj,
  PrivateUserObj,
  SimplifiedPlaylistObj,
  TrackObj,
} from "../structures/structs.ts";
import { Artist, PublicUser, SimplifiedPlaylist, Track } from "./types.ts";
import { caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints/endpoints.ts";
import * as opts from "../opts/opts.ts";

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
    opts?: opts.CurrentUserPlaylistOpts,
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

  async getTopArtists(
    opts?: opts.GetUserTopArtistsAndTracks,
  ): Promise<Array<Artist>> {
    const data: Array<ArtistObj> = (await caller.fetch({
      url: endpoints.GET_USER_TOP_ARTISTS_AND_TRACKS("artists", opts),
      method: "GET",
    }))["items"];

    const result: Array<Artist> = [];
    for (const artist of data) {
      result.push(new Artist(artist));
    }
    return result;
  }

  async getTopTracks(
    opts?: opts.GetUserTopArtistsAndTracks,
  ): Promise<Array<Track>> {
    const data: Array<TrackObj> = (await caller.fetch({
      url: endpoints.GET_USER_TOP_ARTISTS_AND_TRACKS("tracks", opts),
      method: "GET",
    }))["items"];

    const result: Array<Track> = [];
    for (const track of data) {
      result.push(new Track(track));
    }
    return result;
  }
}
