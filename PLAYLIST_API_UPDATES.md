# Playlist API Updates - `/pairs` Endpoint

## GET `/playlist/:playlistId/pairs`

This endpoint has been updated to support full filtering, sorting, and pagination capabilities.

### Input Parameters

**URL Parameters:**
- `playlistId` - UUID of the playlist

**Query Parameters (all optional):**
- `assetKind` - Filter by asset type:
  - `2` - Shows only pairs containing maps
  - `6` - Shows only pairs containing gamemodes
- `sort` - Sort field options:
  - `"createdAt"` - Sort by pair creation date (default)
  - `"publishedAt"` - Sort by asset publish date
  - `"name"` - Sort by asset name
  - `"averageRating"` - Sort by rating
  - `"bookmarks"` - Sort by bookmark count
  - `"playsRecent"` - Sort by recent plays
  - `"playsAllTime"` - Sort by all-time plays
- `order` - Sort order: `"desc"` or `"asc"` (default: `"desc"`)
- `count` - Number of items per page (1-30, default: 20)
- `offset` - Pagination offset (default: 0)
- `tags` - Filter by tag name
- `searchTerm` - Search in asset names
- `gamertag` - Filter by contributor gamertag
- `ownerOnly` - Boolean flag to filter by asset owner only

### Return Data

```json
{
  "playlistId": "string",
  "pairs": [
    {
      "id": "string",  // UgcPair ID
      "map": {
        // Full map UGC data with tags array
        "tags": ["tag1", "tag2"],
        "author": { /* author data */ },
        "contributors": [ /* contributors array */ ],
        // ... other UGC fields
      } | null,
      "gamemode": {
        // Full gamemode UGC data with tags array
        "tags": ["tag1", "tag2"],
        "author": { /* author data */ },
        "contributors": [ /* contributors array */ ],
        // ... other UGC fields
      } | null,
      "createdAt": "datetime"
    }
  ],
  "totalCount": number,
  "pageSize": number
}
```

### Filtering Logic

- **`assetKind`**: 
  - When set to `2`, returns only pairs that have a map
  - When set to `6`, returns only pairs that have a gamemode
  
- **`searchTerm`**: 
  - Searches in both map and gamemode names
  - Case-insensitive partial match
  - Returns pairs where either the map OR gamemode matches

- **`tags`**: 
  - Returns pairs where either the map OR gamemode has the specified tag
  
- **`gamertag`**:
  - When `ownerOnly` is true: Filters by author.gamertag
  - When `ownerOnly` is false: Filters by any contributor.gamertag
  - Returns pairs where either the map OR gamemode matches

### Sorting Logic

- **For `createdAt`**: Sorts by the pair's creation date
- **For asset fields** (name, publishedAt, etc.):
  - Uses the value from whichever asset exists (map or gamemode)
  - If both exist:
    - When `assetKind=2` is specified, uses the map's value
    - When `assetKind=6` is specified, uses the gamemode's value
    - Otherwise uses the first available value
  - Null values are placed at the end of results

### Frontend Display Logic

With this endpoint, you can now:

1. **Display pairs as units**: Each pair object contains both map and gamemode data
2. **Show map card with gamemode chip**: When both `map` and `gamemode` are present
3. **Show single asset card**: When only `map` or only `gamemode` is present
4. **Filter and sort**: Full support for all the filtering and sorting options your frontend needs

### Example Usage

```
GET /playlist/123e4567-e89b-12d3-a456-426614174000/pairs?assetKind=2&sort=name&order=asc&gamertag=Player1&ownerOnly=true
```

This would return all pairs in the playlist that:
- Contain maps (assetKind=2)
- Are authored by Player1
- Sorted by name in ascending order

## PUT `/playlist/:playlistId/pair/:pairId`

This endpoint updates an existing UgcPair to add a missing map or gamemode.

### Purpose

Completes incomplete pairs by adding either a map or gamemode to a pair that only has one asset.

### Input Parameters

**URL Parameters:**
- `playlistId` - UUID of the playlist
- `pairId` - UUID of the UgcPair to update

**Body Parameters:**
- `mapAssetId` (optional) - UUID of a map asset to add
- `gamemodeAssetId` (optional) - UUID of a gamemode asset to add

### Validation Rules

1. **Only adds missing assets**: 
   - Cannot add a map if the pair already has one
   - Cannot add a gamemode if the pair already has one
   
2. **Asset type validation**:
   - Map assets must have `assetKind = 2`
   - Gamemode assets must have `assetKind = 6`
   
3. **Duplicate prevention**:
   - Checks if the resulting pair combination already exists in the playlist
   - Prevents creating duplicate pairs

### Return Data

Returns the updated UgcPair object:
```json
{
  "id": "string",
  "playlistId": "string",
  "mapAssetId": "string | null",
  "gamemodeAssetId": "string | null",
  "createdAt": "datetime"
}
```

### Example Usage

```
PUT /playlist/123e4567-e89b-12d3-a456-426614174000/pair/987fcdeb-51a2-43f1-b123-426614174000
Body: {
  "gamemodeAssetId": "aaa11111-22bb-33cc-44dd-555555555555"
}
```

This would add a gamemode to a pair that only had a map, creating a complete map+gamemode pair.