<script>
  import { SAMPLE_MAPS, SAMPLE_MODES } from './sample-data';
  
  let selections = {};
  
  const toggleSelection = (mapId, modeId) => {
    const key = `${mapId}-${modeId}`;
    selections = {
      ...selections,
      [key]: !selections[key]
    };
  };
</script>

<div class="-800 rounded-lg overflow-hidden">
  <div class="p-4 overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr>
          <th class="text-left p-2 text-slate-400"></th>
          {#each SAMPLE_MODES as mode}
            <th class="p-2">
              <div class="flex flex-col items-center gap-2">
                <img 
                  src={mode.thumbnailUrl}
                  alt={mode.name}
                  class="w-20 h-12 object-cover rounded"
                />
                <span class="text-white text-sm">{mode.name}</span>
              </div>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each SAMPLE_MAPS as map}
          <tr class="border-t border-slate-700">
            <td class="p-2">
              <div class="flex items-center gap-2">
                <img 
                  src={map.thumbnailUrl}
                  alt={map.name}
                  class="w-20 h-12 object-cover rounded"
                />
                <span class="text-white">{map.name}</span>
              </div>
            </td>
            {#each SAMPLE_MODES as mode}
              <td class="p-2 text-center">
                <button
                  on:click={() => toggleSelection(map.id, mode.id)}
                  class="w-8 h-8 rounded {selections[`${map.id}-${mode.id}`]
                    ? 'bg-blue-500 text-white'
                    : '-700 text-slate-400'}"
                >
                  {#if selections[`${map.id}-${mode.id}`]}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                  {/if}
                </button>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>