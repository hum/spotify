// deno-lint-ignore-file camelcase

export interface AlbumObj {
  album_type: string;
  artists: Array<ArtistObj>;
  available_markets: Array<string>;
  copyrights: Array<CopyrightObj>;
  external_ids: ExternalIdObj;
  external_urls: ExternalUrlObj;
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<ImageObj>;
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  restrictions: AlbumRestrictionObj;
  tracks: Array<SimplifiedTrackObj>;
  type: string;
  uri: string;
}

export enum AlbumRestrictionReason {
  MARKET = "market",
  PRODUCT = "product",
  EXPLICIT = "explicit",
}

export interface AlbumRestrictionObj {
  reason: AlbumRestrictionReason;
}

export interface ArtistObj {
  externalUrls: ExternalUrlObj;
  followers: FollowersObj;
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<ImageObj>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface AudioFeaturesObj {
  acousticness: number;
  analysisUrl: string;
  danceability: number;
  durationMs: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  timeSignature: number;
  trackHref: string;
  type: string;
  uri: string;
  valence: number;
}

export interface CategoryObj {
  href: string;
  icons: Array<ImageObj>;
  id: string;
  name: string;
}

export interface ContextObj {
  externalUrls: ExternalUrlObj;
  href: string;
  type: string;
  uri: string;
}

export interface CopyrightObj {
  text: string;
  type: string;
}

export interface CurrentlyPlayingContextObj {
  actions: DisallowsObj;
  context: ContextObj;
  currentlyPlayingType: string;
  device: DeviceObj;
  isPlaying: boolean;
  item: TrackObj | EpisodeObj;
  progressMs: number;
  repeatState: string;
  shuffleState: string;
  timestamp: number;
}

export interface CurrentlyPlayingObj {
  context: ContextObj;
  currentlyPlayingType: string;
  isPlaying: boolean;
  item: TrackObj | EpisodeObj;
  progressMs: number;
  timestamp: number;
}

export interface CursorObj {
  after: string;
}

export interface CursorPagingObj {
  cursors: CursorObj;
  href: string;
  items: Array<Record<string, unknown>>;
  limit: number;
  next: string;
  total: number;
}

export interface DeviceObj {
  id: string;
  isActive: boolean;
  isPrivateSession: boolean;
  isRestricted: boolean;
  name: string;
  type: string;
  volumePercent: number;
}

export interface DevicesObj {
  devices: Array<DeviceObj>;
}

export interface DisallowsObj {
  interruptingPlayback: boolean;
  pausing: boolean;
  resuming: boolean;
  seeking: boolean;
  skippingNext: boolean;
  skippingPrev: boolean;
  togglingRepeatContext: boolean;
  togglingRepeatTrack: boolean;
  togglingShuffle: boolean;
  transferringPlayback: boolean;
}

export interface EpisodeObj {
  AudioPreviewUrl: string;
  description: string;
  durationMs: number;
  explicit: boolean;
  externalUrls: ExternalUrlObj;
  href: string;
  id: string;
  images: Array<ImageObj>;
  isExternallyHosted: boolean;
  isPlayable: boolean;
  languages: Array<string>;
  name: string;
  releaseDate: string;
  releaseDatePrecision: string;
  resumePoint: ResumePointObj;
  show: SimplifiedShowObj;
  type: string;
  uri: string;
}

export interface ErrorObj {
  message: string;
  status: number;
}

export interface ExplicitContentSettingsObj {
  filterEnabled: boolean;
  filterLocked: boolean;
}

export interface ExternalIdObj {
  ean: string;
  isrc: string;
  upc: string;
}

export interface ExternalUrlObj {
  spotify: string;
}

export interface FollowersObj {
  href: string;
  total: number;
}

export interface ImageObj {
  height: number;
  url: string;
  width: number;
}

export interface LinkedTrackObj {
  externalUrls: ExternalUrlObj;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface PagingObj {
  href: string;
  items: Array<Record<string, unknown>>;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface PlayHistoryObj {
  context: ContextObj;
  playedAt: Date;
  track: SimplifiedTrackObj;
}

export enum PlayerErrorReason {
  NO_PREV_TRACK = "NO_PREV_TRACK",
  NO_NEXT_TRACK = "NO_NEXT_TRACK",
  NO_SPECIFIC_TRACK = "NO_SPECIFIC_TRACK",
  ALREADY_PAUSED = "ALREADY_PAUSED",
  NOT_PAUSED = "NOT_PAUSED",
  NOT_PLAYING_LOCALLY = "NOT_PLAYING_LOCALLY",
  NOT_PLAYING_TRACK = "NOT_PLAYING_TRACK",
  NOT_PLAYING_CONTEXT = "NOT_PLAYING_CONTEXT",
  ENDLESS_CONTEXT = "ENDLESS_CONTEXT",
  CONTEXT_DISALLOW = "CONTEXT_DISALLOW",
  ALREADY_PLAYING = "ALREADY_PLAYING",
  RATE_LIMITED = "RATE_LIMITED",
  REMOTE_CONTROL_DISALLOW = "REMOTE_CONTROL_DISALLOW",
  DEVICE_NOT_CONTROLLABLE = "DEVICE_NOT_CONTROLLABLE",
  VOLUME_CONTROL_DISALLOW = "VOLUME_CONTROL_DISALLOW",
  NO_ACTIVE_DEVICE = "NO_ACTIVE_DEVICE",
  PREMIUM_REQUIRED = "PREMIUM_REQUIRED",
  UNKNOWN = "UNKNOWN",
}

export interface PlayerErrorObj {
  message: string;
  reason: PlayerErrorReason;
  status: number;
}

export interface PlaylistObj {
  collaborative: boolean;
  description: string;
  externalUrls: ExternalUrlObj;
  followers: FollowersObj;
  href: string;
  id: string;
  images: Array<ImageObj>;
  name: string;
  owner: PublicUserObj;
  public: boolean;
  snapshotId: string;
  tracks: Array<PlaylistTrackObj>;
  type: string;
  uri: string;
}

export interface PlaylistTrackObj {
  addedAt: Date;
  addedBy: PublicUserObj;
  isLocal: boolean;
  track: TrackObj | EpisodeObj;
}

export interface PlaylistTracksRefObj {
  href: string;
  total: number;
}

export interface PrivateUserObj {
  country: string;
  displayName: string;
  email: string;
  explicitContent: ExplicitContentSettingsObj;
  externalUrls: ExternalUrlObj;
  followers: FollowersObj;
  href: string;
  id: string;
  images: Array<ImageObj>;
  product: string;
  type: string;
  uri: string;
}

export interface PublicUserObj {
  displayName: string;
  externalUrls: ExternalUrlObj;
  followers: FollowersObj;
  href: string;
  id: string;
  images: Array<ImageObj>;
  type: string;
  uri: string;
}

export interface RecommendationSeedObj {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
}

export interface RecommendationsObj {
  seeds: Array<RecommendationSeedObj>;
  tracks: Array<SimplifiedTrackObj>;
}

export interface ResumePointObj {
  fullyPlayed: boolean;
  resumePositionMs: number;
}

export interface SavedAlbumObj {
  addedAt: Date;
  album: AlbumObj;
}

export interface SavedEpisodeObj {
  addedAt: Date;
  episode: EpisodeObj;
}

export interface SavedShowObj {
  addedAt: boolean;
  show: SimplifiedShowObj;
}

export interface SavedTrackObj {
  addedAt: Date;
  track: TrackObj;
}

export interface ShowObj {
  availableMarkets: Array<string>;
  copyrights: Array<CopyrightObj>;
  description: string;
  episodes: Array<SimplifiedEpisodeObj>;
  explicit: boolean;
  externalUrls: ExternalUrlObj;
  href: string;
  id: string;
  images: Array<ImageObj>;
  isExternallyHosted: boolean;
  languages: Array<string>;
  mediaType: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
}

export interface SimplifiedAlbumObj {
  album_group: string;
  album_type: string;
  artists: Array<SimplifiedArtistObj>;
  available_markets: Array<string>;
  externalUrl: ExternalUrlObj;
  href: string;
  id: string;
  images: Array<ImageObj>;
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: AlbumRestrictionObj;
  type: string;
  uri: string;
}

export interface SimplifiedArtistObj {
  externalUrls: ExternalUrlObj;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SimplifiedEpisodeObj {
  audio_preview_url: string;
  description: string;
  durationMs: number;
  explicit: boolean;
  externalUrls: ExternalUrlObj;
  href: string;
  id: string;
  images: Array<ImageObj>;
  isExternallyHosted: boolean;
  isPlayable: boolean;
  languages: Array<string>;
  name: string;
  releaseDate: string;
  releaseDatePrecision: string;
  resumePoint: ResumePointObj;
  type: string;
  uri: string;
}

export interface SimplifiedPlaylistObj {
  collaborative: boolean;
  description: string;
  externalUrls: ExternalUrlObj;
  href: string;
  id: string;
  images: Array<ImageObj>;
  name: string;
  owner: PublicUserObj;
  public: boolean;
  snapshotId: string;
  tracks: PlaylistTracksRefObj;
  type: string;
  uri: string;
}

export interface SimplifiedShowObj {
  availableMarkets: Array<string>;
  copyrights: Array<CopyrightObj>;
  description: string;
  explicit: boolean;
  externalUrls: ExternalUrlObj;
  href: string;
  id: string;
  images: Array<ImageObj>;
  isExternallyHosted: boolean;
  languages: Array<string>;
  mediaType: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
}

export interface SimplifiedTrackObj {
  artists: Array<SimplifiedArtistObj>;
  availableMarkets: Array<string>;
  discNumber: number;
  durationMs: number;
  explicit: boolean;
  externalUrls: ExternalUrlObj;
  href: string;
  id: string;
  isLocal: boolean;
  isPlayable: boolean;
  linkedFrom: LinkedTrackObj;
  name: string;
  previewUrl: string;
  restrictions: TrackRestrictionObj;
  trackNumber: number;
  type: string;
  uri: string;
}

export interface TrackObj {
  album: SimplifiedAlbumObj;
  artists: Array<ArtistObj>;
  availableMarket: Array<string>;
  discNumber: number;
  durationMs: number;
  explicit: boolean;
  externalIds: ExternalIdObj;
  externalUrl: ExternalUrlObj;
  href: string;
  id: string;
  isLocal: boolean;
  isPlayable: boolean;
  linkedFrom: LinkedTrackObj;
  name: string;
  popularity: number;
  previewUrl: string;
  restrictions: TrackRestrictionObj;
  trackNumber: number;
  type: string;
  uri: string;
}

export enum TrackRestrictionReason {
  MARKET = "market",
  PRODUCT = "product",
  EXPLICIT = "explicit",
}
export interface TrackRestrictionObj {
  reason: TrackRestrictionReason;
}

export interface TuneableTrackObj {
  acousticness: number;
  danceability: number;
  durationMs: number;
  energy: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  popularity: number;
  speechiness: number;
  tempo: number;
  timeSignature: number;
  valance: number;
}
