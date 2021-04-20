export interface SeveralTracksOpt {
  ids: Array<string>;
  market?: string;
}

export interface TrackOpt {
  id: string;
  market?: string;
}

export interface AudioFeaturesForSeveralTracksOpt {
  ids: Array<string>;
}

export interface AudioFeaturesForTrackOpt {
  id: string;
}

export interface AudioAnalysisForTrackOpt {
  id: string;
}
