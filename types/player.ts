import { caller } from "../handlers/caller.ts";
import { endpoints } from "../endpoints/endpoints.ts";
import { CurrentlyPlayingContext, Device } from "./types.ts";

export class Player {
  constructor() {}

  async getCurrentPlaybackInfo(
    market?: string,
  ): Promise<CurrentlyPlayingContext> {
    const data = await caller.fetch({
      url: endpoints.GET_USER_CURRENT_PLAYBACK({
        market: market ?? "US",
        additionalTypes: "episode",
      }),
    });
    return new CurrentlyPlayingContext(data);
  }

  async getDevices(): Promise<Array<Device>> {
    const data = await caller.fetch({ url: endpoints.GET_USER_DEVICES() });
    const result: Array<Device> = [];
    for (const device of data["devices"]) {
      result.push(new Device(device));
    }
    return result;
  }

  async transferPlayback(id: string, play?: boolean) {
    await caller.fetch({
      url: endpoints.TRANSFER_PLAYBACK(),
      body: { ids: [id], play: play ?? false },
    });
  }
}
