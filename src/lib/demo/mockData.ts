// Mock data for paired playlist demo
export const MOCK_MAPS = [
  {
    assetId: "map-1",
    name: "Riptide",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/map/10c60733-28e8-47c3-a2e1-12182aa0400a/bd3b4b6b-fac0-49e1-9a96-52afda7d87be/images/thumbnail.jpg",
    assetKind: 2, // Numeric value for Map
    owner: "HelljumperVet",
    likes: 245,
    plays: 1523
  },
  {
    assetId: "map-2",
    name: "Catalyst",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/map/bb502fbe-9d80-47a0-939d-8c31b861aaf4/d1392985-4570-4b9c-bc74-b1bdc0f8e509/images/thumbnail.jpg",
    assetKind: 2, // Numeric value for Map
    owner: "SpartanCreator",
    likes: 189,
    plays: 987
  },
  {
    assetId: "map-3",
    name: "Vertex",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/map/75fa80d8-cba9-4c4e-86dd-18e2b9ec12e3/ac5034db-5b9e-446a-91a3-683b3f34d00b/images/thumbnail.jpg",
    assetKind: 2, // Numeric value for Map
    owner: "MapMaster117",
    likes: 156,
    plays: 743
  },
  {
    assetId: "map-4",
    name: "Deadlock",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/map/e4d7a7b3-4c9e-4f8b-8c7d-3f2b1a8e9f5d/a9b8c7d6-5e4f-3a2b-1c9d-8e7f6a5b4c3d/images/thumbnail.jpg",
    assetKind: 2, // Numeric value for Map
    owner: "BTBForge",
    likes: 312,
    plays: 2156
  },
  {
    assetId: "map-5",
    name: "Solarium",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/map/f5e6d7c8-9b0a-1f2e-3d4c-5b6a7f8e9d0c/b0c9d8e7-6f5e-4a3b-2c1d-9e8f7a6b5c4d/images/thumbnail.jpg",
    assetKind: 2, // Numeric value for Map
    owner: "ForgeArtist",
    likes: 223,
    plays: 1789
  }
];

export const MOCK_MODES = [
  {
    assetId: "mode-1",
    name: "Team Slayer Pro",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/ugcgamevariant/7bcb7e71-099b-42ea-b9fd-fa89f1148c72/64dfa4a4-3c5d-4bb0-b0e0-6885a9ff002c/images/thumbnail.png",
    assetKind: 6, // Numeric value for UgcGameVariant
    owner: "CompHalo",
    likes: 567,
    plays: 4523
  },
  {
    assetId: "mode-2",
    name: "CTF Classic",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/ugcgamevariant/5ee3904d-51a7-47db-9887-1e38e160b8bd/c2a19f77-2d5e-41b3-9b6c-94506d0c4074/images/thumbnail.png",
    assetKind: 6, // Numeric value for UgcGameVariant
    owner: "MLGRules",
    likes: 432,
    plays: 3211
  },
  {
    assetId: "mode-3",
    name: "King of the Hill",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/ugcgamevariant/d9249bf2-5c1c-4617-8736-7aa42657507a/6d2e5374-6007-45cc-9a67-b49516b6c681/images/thumbnail.png",
    assetKind: 6, // Numeric value for UgcGameVariant
    owner: "HillKing42",
    likes: 298,
    plays: 1987
  },
  {
    assetId: "mode-4",
    name: "Strongholds",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/ugcgamevariant/a8b7c6d5-2e3f-4a5b-8c7d-6e5f4a3b2c1d/7e6f5d4c-3b2a-1e9f-8d7c-6b5a4f3e2d1c/images/thumbnail.png",
    assetKind: 6, // Numeric value for UgcGameVariant
    owner: "TerritoryControl",
    likes: 256,
    plays: 1654
  },
  {
    assetId: "mode-5",
    name: "Oddball Ranked",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/ugcgamevariant/c9d8e7f6-3f4e-5a6b-9d8c-7e6f5a4b3c2d/8f7e6d5c-4b3a-2f9e-9e8d-7c6b5f4a3b2c/images/thumbnail.png",
    assetKind: 6, // Numeric value for UgcGameVariant
    owner: "OddballMaster",
    likes: 189,
    plays: 1234
  }
];

export const MOCK_PAIRED_PLAYLISTS = [
  {
    playlistId: "playlist-1",
    name: "Competitive Arena Mix",
    description: "Best competitive map and mode combinations for ranked play",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/playlist/7bcb7e71-099b-42ea-b9fd-fa89f1148c72/64dfa4a4-3c5d-4bb0-b0e0-6885a9ff002c/images/thumbnail.png",
    author: "ProPlaylistMaker",
    favorites: 342,
    copies: 89,
    plays: 5678,
    pairs: [
      {
        pairId: "pair-1",
        mapAsset: MOCK_MAPS[0], // Riptide
        modeAsset: MOCK_MODES[0] // Team Slayer Pro
      },
      {
        pairId: "pair-2",
        mapAsset: MOCK_MAPS[1], // Catalyst
        modeAsset: MOCK_MODES[1] // CTF Classic
      },
      {
        pairId: "pair-3",
        mapAsset: MOCK_MAPS[2], // Vertex
        modeAsset: MOCK_MODES[2] // King of the Hill
      }
    ],
    unpairedMaps: [MOCK_MAPS[3], MOCK_MAPS[4]] // Maps without modes assigned yet
  },
  {
    playlistId: "playlist-2",
    name: "Big Team Battles",
    description: "Large-scale warfare with the best BTB combinations",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/playlist/5ee3904d-51a7-47db-9887-1e38e160b8bd/c2a19f77-2d5e-41b3-9b6c-94506d0c4074/images/thumbnail.png",
    author: "BTBEnthusiast",
    favorites: 456,
    copies: 123,
    plays: 8901,
    pairs: [
      {
        pairId: "pair-4",
        mapAsset: MOCK_MAPS[3], // Deadlock
        modeAsset: MOCK_MODES[3] // Strongholds
      },
      {
        pairId: "pair-5",
        mapAsset: MOCK_MAPS[4], // Solarium
        modeAsset: MOCK_MODES[1] // CTF Classic
      }
    ],
    unpairedMaps: []
  }
];

// Mock user playlists for the pairing modal
export const MOCK_USER_PAIRED_PLAYLISTS = [
  {
    playlistId: "user-playlist-1",
    name: "My Competitive Collection",
    thumbnailUrl: MOCK_PAIRED_PLAYLISTS[0].thumbnailUrl,
    pairCount: 5
  },
  {
    playlistId: "user-playlist-2",
    name: "Fun Social Games",
    thumbnailUrl: MOCK_PAIRED_PLAYLISTS[1].thumbnailUrl,
    pairCount: 8
  },
  {
    playlistId: "user-playlist-3",
    name: "Tournament Ready",
    thumbnailUrl: "https://blobs-infiniteugc.svc.halowaypoint.com/ugcstorage/playlist/d9249bf2-5c1c-4617-8736-7aa42657507a/6d2e5374-6007-45cc-9a67-b49516b6c681/images/thumbnail.png",
    pairCount: 12
  }
];