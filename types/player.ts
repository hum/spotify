import { caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints/endpoints.ts";
import { Device, Playback, PlayerContext } from "./types.ts";

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
}
