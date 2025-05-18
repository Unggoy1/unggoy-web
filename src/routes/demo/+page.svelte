<script>
  import { MOCK_PAIRED_PLAYLISTS } from '$lib/demo/mockData';
</script>

<svelte:head>
  <title>Paired Playlist Demo</title>
</svelte:head>

<div class="demo-home">
  <header class="hero">
    <h1>Paired Playlist Demo</h1>
    <p>Explore two different approaches for creating and managing paired playlists in Halo Infinite</p>
  </header>
  
  <div class="options-grid">
    <div class="option-card">
      <h2>Option A: Contextual Pairing</h2>
      <p>Add maps or modes to paired playlists directly from asset cards throughout the site.</p>
      <ul>
        <li>Works from both maps and modes</li>
        <li>Natural workflow integration</li>
        <li>Familiar dropdown interaction</li>
        <li>Quick pairing on-the-go</li>
      </ul>
      <div class="button-group">
        <a href="/demo/bidirectional-pairing" class="primary-button">
          Try Simple Version
        </a>
        <a href="/demo/inline-browse" class="secondary-button">
          Try with Inline Browse
        </a>
      </div>
    </div>
    
    <div class="option-card">
      <h2>Option B: Dedicated Interface</h2>
      <p>Manage all pairing from a dedicated page within each playlist.</p>
      <ul>
        <li>Bulk pairing operations</li>
        <li>Clear overview of unpaired maps</li>
        <li>Focused pairing workflow</li>
      </ul>
      <a href="/demo/playlist/playlist-1/pairs" class="primary-button">
        Try Dedicated Interface
      </a>
    </div>
  </div>
  
  <div class="demo-playlists">
    <h2>Sample Paired Playlists</h2>
    <div class="playlists-grid">
      {#each MOCK_PAIRED_PLAYLISTS as playlist}
        <a href="/demo/playlist/{playlist.playlistId}" class="playlist-card">
          <img src={playlist.thumbnailUrl} alt={playlist.name} />
          <div class="playlist-info">
            <h3>{playlist.name}</h3>
            <p>{playlist.pairs.length} pairs • {playlist.unpairedMaps.length} unpaired</p>
          </div>
        </a>
      {/each}
    </div>
  </div>
  
  <div class="features-comparison">
    <h2>Feature Comparison</h2>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Contextual Pairing</th>
          <th>Dedicated Interface</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Access Point</td>
          <td>Asset card dropdown (maps & modes)</td>
          <td>Playlist management page</td>
        </tr>
        <tr>
          <td>Best For</td>
          <td>One-at-a-time pairing</td>
          <td>Bulk pairing sessions</td>
        </tr>
        <tr>
          <td>Learning Curve</td>
          <td>Minimal (uses existing patterns)</td>
          <td>New interface to learn</td>
        </tr>
        <tr>
          <td>Visibility</td>
          <td>Pairs created as you browse</td>
          <td>See all unpaired maps at once</td>
        </tr>
        <tr>
          <td>Workflow</td>
          <td>Integrated into browsing</td>
          <td>Separate pairing session</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<style>
  .demo-home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  
  .hero {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .hero h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .hero p {
    font-size: 1.25rem;
    color: #a0aec0;
  }
  
  .options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 32px;
    margin-bottom: 60px;
  }
  
  .option-card {
    background-color: #2d3748;
    border-radius: 12px;
    padding: 32px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }
  
  .option-card:hover {
    border-color: #667eea;
    transform: translateY(-4px);
  }
  
  .option-card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 16px;
  }
  
  .option-card p {
    color: #a0aec0;
    margin-bottom: 20px;
  }
  
  .option-card ul {
    margin-left: 20px;
    margin-bottom: 24px;
    color: #cbd5e0;
  }
  
  .option-card li {
    margin-bottom: 8px;
  }
  
  .primary-button {
    display: inline-block;
    background-color: #667eea;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s ease;
  }
  
  .primary-button:hover {
    background-color: #5a67d8;
  }
  
  .secondary-button {
    display: inline-block;
    background-color: transparent;
    color: #667eea;
    border: 2px solid #667eea;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
  }
  
  .secondary-button:hover {
    background-color: #667eea;
    color: white;
  }
  
  .button-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  .demo-playlists {
    margin-bottom: 60px;
  }
  
  .demo-playlists h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
  }
  
  .playlists-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
  
  .playlist-card {
    display: flex;
    background-color: #2d3748;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    transition: transform 0.2s ease;
  }
  
  .playlist-card:hover {
    transform: translateY(-2px);
  }
  
  .playlist-card img {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
  
  .playlist-info {
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .playlist-info h3 {
    font-weight: 600;
    color: white;
    margin-bottom: 4px;
  }
  
  .playlist-info p {
    color: #a0aec0;
    font-size: 0.875rem;
  }
  
  .features-comparison {
    background-color: #2d3748;
    border-radius: 12px;
    padding: 32px;
  }
  
  .features-comparison h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #4a5568;
  }
  
  th {
    font-weight: 600;
    color: #cbd5e0;
    background-color: #1a202c;
  }
  
  td {
    color: #a0aec0;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    .options-grid {
      grid-template-columns: 1fr;
    }
    
    .hero h1 {
      font-size: 2rem;
    }
    
    table {
      font-size: 0.875rem;
    }
  }
</style>