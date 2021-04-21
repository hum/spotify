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
