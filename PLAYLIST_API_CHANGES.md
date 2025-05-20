# Playlist API Changes

This document describes all changes to the playlist API endpoints after migrating from direct UGC relationships to the new UgcPair model.

## Updated Endpoints

### GET `/playlist/:playlistId`

**Changed**: This endpoint now fetches playlist contents through the `UgcPair` model instead of direct UGC relationships.

**Input Parameters**: No changes
- `playlistId` (URL param) - UUID of the playlist
- Query parameters (all optional):
  - `assetKind` - Filter by asset type (2 for maps, 6 for gamemodes)
  - `sort` - Sort field (default: "publishedAt")
  - `order` - Sort order: "desc" or "asc" (default: "desc")
  - `count` - Number of items per page (1-30, default: 20)
  - `offset` - Pagination offset (default: 0)
  - `tags` - Filter by tag name
  - `searchTerm` - Search in asset names
  - `gamertag` - Filter by contributor gamertag
  - `ownerOnly` - Boolean flag to filter by asset owner only

**Return Data**: Structure remains the same, but data source has changed
```json
{
  "totalCount": number,
  "pageSize": number,
  "assets": [
    {
      // UGC asset data with tags array instead of tag objects
      "tags": ["tag1", "tag2"],
      // ... other UGC fields
    }
  ],
  "playlist": {
    // Playlist data with ugcPairs count instead of ugc count
    "_count": {
      "favoritedBy": number,
      "ugcPairs": number  // Changed from "ugc"
    },
    // ... other playlist fields
  }
}
```

**Function Changes**:
- Now fetches all `UgcPair` entries for the playlist
- Merges maps and gamemodes into a single array while removing duplicates
- Applies filters and sorting on the merged array in memory
- Maintains backward compatibility with existing query parameters

### POST `/playlist/:playlistId/asset/:assetId`

**Changed**: Creates a `UgcPair` entry instead of directly connecting UGC to playlist.

**Input Parameters**: No changes
- `playlistId` (URL param) - UUID of the playlist
- `assetId` (URL param) - UUID of the UGC asset

**Return Data**: Returns the updated playlist object

**Function Changes**:
- Checks if the UGC is already in the playlist by looking for existing UgcPair
- Creates a new `UgcPair` with either `mapAssetId` or `gamemodeAssetId` populated based on asset type
- Maps (assetKind = 2) are stored in `mapAssetId`
- Gamemodes (assetKind = 6) are stored in `gamemodeAssetId`
- Returns `Duplicate` error if asset already exists in playlist

### DELETE `/playlist/:playlistId/asset/:assetId`

**Changed**: Deletes the corresponding `UgcPair` entry instead of disconnecting UGC.

**Input Parameters**: No changes
- `playlistId` (URL param) - UUID of the playlist
- `assetId` (URL param) - UUID of the UGC asset

**Return Data**: Returns the updated playlist object

**Function Changes**:
- Finds the `UgcPair` that contains the specified asset (in either mapAssetId or gamemodeAssetId)
- Deletes the found `UgcPair` entry
- Returns `NotFound` error if the asset is not in the playlist

### POST `/playlist`

**Changed**: Handles initial asset addition through `UgcPair` creation.

**Input Parameters**: No changes
- `name` - Playlist name (3-255 characters)
- `description` - Playlist description (10-255 characters)
- `isPrivate` - Boolean flag for privacy (optional, default: false)
- `thumbnail` - Image file for thumbnail (optional)
- `assetId` - Initial UGC asset to add (optional)

**Return Data**: Returns the created playlist object

**Function Changes**:
- Creates the playlist first
- If `assetId` is provided, creates a `UgcPair` after playlist creation
- Determines whether to populate `mapAssetId` or `gamemodeAssetId` based on asset type

## New Endpoints

### GET `/playlist/:playlistId/pairs`

**Purpose**: Retrieves all UgcPair entries for a playlist in a structured format.

**Input Parameters**:
- `playlistId` (URL param) - UUID of the playlist

**Return Data**:
```json
{
  "playlistId": "string",
  "pairs": [
    {
      "id": "string",  // UgcPair ID
      "map": {
        // Full map UGC data with tags array
        "tags": ["tag1", "tag2"],
        // ... other UGC fields
      } | null,
      "gamemode": {
        // Full gamemode UGC data with tags array
        "tags": ["tag1", "tag2"],
        // ... other UGC fields
      } | null,
      "createdAt": "datetime"
    }
  ],
  "totalCount": number
}
```

**Function**:
- Fetches all `UgcPair` entries for the playlist
- Includes full UGC data for both maps and gamemodes
- Transforms tag objects to arrays for consistency
- Orders pairs by creation date (newest first)
- Checks playlist access permissions (private playlists require authentication)

### POST `/playlist/:playlistId/pair`

**Purpose**: Creates a new UgcPair with specific map and/or gamemode combination.

**Input Parameters**:
- `playlistId` (URL param) - UUID of the playlist
- `mapAssetId` (body, optional) - UUID of a map asset
- `gamemodeAssetId` (body, optional) - UUID of a gamemode asset

**Requirements**: At least one of `mapAssetId` or `gamemodeAssetId` must be provided

**Return Data**: Returns the created UgcPair object
```json
{
  "id": "string",
  "playlistId": "string",
  "mapAssetId": "string | null",
  "gamemodeAssetId": "string | null",
  "createdAt": "datetime"
}
```

**Function**:
- Validates user has access to the playlist
- Verifies assets exist and are of correct type (maps must have assetKind = 2, gamemodes = 6)
- Checks for duplicate pairs with same map/gamemode combination
- Creates the `UgcPair` with specified assets
- Updates playlist's `updatedAt` timestamp

### DELETE `/playlist/:playlistId/pair/:pairId`

**Purpose**: Deletes a specific UgcPair from a playlist.

**Input Parameters**:
- `playlistId` (URL param) - UUID of the playlist
- `pairId` (URL param) - UUID of the UgcPair to delete

**Return Data**: Empty response on success

**Function**:
- Validates user has access to the playlist
- Verifies the UgcPair exists and belongs to the specified playlist
- Deletes the UgcPair
- Updates playlist's `updatedAt` timestamp

## Migration Notes

- The existing `ugc` many-to-many relationship has been replaced with `ugcPairs` one-to-many relationship
- Each UGC asset in a playlist is now stored as a UgcPair with either `mapAssetId` or `gamemodeAssetId` populated
- The migration creates separate UgcPair entries for each existing UGC in playlists
- Frontend should use the new `/pairs` endpoint for structured pair data
- Legacy endpoints maintain backward compatibility but use the new data model internally