export interface UserCurrentPlaybackOpt {
  market?: string;
  additionalTypes?: string;
}

export interface CurrentlyPlayingTrackOpt {
  market: string;
  additionalTypes?: string;
}

export interface StartResumePlaybackOpt {
  deviceId?: string;
}

export interface PauseUserPlaybackOpt {
  deviceId?: string;
}

export interface SkipPlaybackToNextOpt {
  deviceId?: string;
}

export interface SkipPlaybackToPreviousTrackOpt {
  deviceId?: string;
}

export interface SeekToPositionOpt {
  positionMs: number;
  deviceId?: string;
}

export interface SetRepeatModeOpt {
  /**
   *  @default
   *  "track" - will repeat the current track
   *  "context" - will repeat the current context
   *  "off" - will turn repeat off
  */
  state: string;
  deviceId?: string;
}

export interface SetVolumeOpt {
  volumePercent: number;
  deviceId?: string;
}

export interface ToggleShuffleOpt {
  /**
   * @default
   * true - shuffle playback
   * false - dont shuffle playback
   */
  state: boolean;
  deviceId?: string;
}

export interface UserRecentTracksOpt {
  limit?: number;
  after?: number;
  before?: number;
}

export interface AddItemToQueueOpt {
  uri: string;
  deviceId?: string;
}
