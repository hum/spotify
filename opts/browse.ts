export interface NewReleasesOpt {
  country?: string;
  limit?: number;
  offset?: number;
}

export interface AllFeaturedPlaylistsOpt {
  country?: string;
  locale?: string;
  timestamp?: string;
  limit?: number;
  offset?: number;
}

export interface AllCategoriesOpt {
  country?: string;
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface CategoryOpt {
  id: string;
  country?: string;
  locale?: string;
}

export interface CategoryPlaylistsOpt {
  id: string;
  country?: string;
  limit?: number;
  offset?: number;
}

export interface RecommendationsOpt {
  limit?: number;
  market?: string;
  seedArtists: string | Array<string>;
  seedGenres: string | Array<string>;
  seedTracks: string | Array<string>;
  minAcousticness?: number;
  maxAcousticness?: number;
  targetAcousticness?: number;
  minDanceability?: number;
  maxDanceability?: number;
  targetDanceability?: number;
  minDurationMs?: number;
  maxDurationMs?: number;
  targetDurationMs?: number;
  minEnergy?: number;
  maxEnergy?: number;
  targetEnergy?: number;
  minInstrumentalness?: number;
  maxInstrumentalness?: number;
  targetInstrumentalness?: number;
  minKey?: number;
  maxKey?: number;
  targetKey?: number;
  minLiveness?: number;
  maxLiveness?: number;
  targetLiveness?: number;
  minLoudness?: number;
  maxLoudness?: number;
  targetLoudness?: number;
  minMode?: number;
  maxMode?: number;
  targetMode?: number;
  minPopularity?: number;
  maxPopularity?: number;
  targetPopularity?: number;
  minSpeechiness?: number;
  maxSpeechiness?: number;
  targetSpeechiness?: number;
  minTempo?: number;
  maxTempo?: number;
  targetTempo?: number;
  minTimeSignature?: number;
  maxTimeSignature?: number;
  targetTimeSignature?: number;
  minValence?: number;
  maxValence?: number;
  targetValence?: number;
}
