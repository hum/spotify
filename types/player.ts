import { caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints/endpoints.ts";
import { Device, Playback, PlayerContext, PlayHistory } from "./types.ts";

export class Player {
  #ctx: PlayerContext | null;

  constructor() {
    this.#ctx = null;
  }

  get ctx(): PlayerContext | null {
    return this.#ctx;
  }

  async getDevices(): Promise<Array<Device>> {
    const data = await caller.fetch({ url: endpoints.GET_USER_DEVICES() });
    const result: Array<Device> = [];
    for (const device of data["devices"]) {
      result.push(new Device(device));
    }
    return result;
  }

  async getPlayback(market?: string): Promise<Playback> {
    const data = await caller.fetch({
      url: endpoints.GET_USER_CURRENT_PLAYBACK({
        market: market ?? "US",
        additionalTypes: "episode",
      }),
    });
    return new Playback(data);
  }

  async getRecentlyPlayedTracks(
    limit?: number,
    after?: number,
    before?: number,
  ): Promise<Array<PlayHistory>> {
    const data = await caller.fetch({
      url: endpoints.GET_USER_RECENT_TRACKS({
        limit: limit,
        after: after,
        before: before,
      }),
    });

    const result: Array<PlayHistory> = [];
    for (const track of data["items"]) {
      result.push(new PlayHistory(track));
    }
    return result;
  }
}
