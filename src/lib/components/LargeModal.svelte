<script lang="ts">
  import type { Snippet } from 'svelte';
  import { createDialog } from 'svelte-headlessui';
  import Transition from 'svelte-transition';

  interface Props {
    children: Snippet;
    commands?: Snippet;
    onclose?: () => void;
    extraClass?: string;
  }

  let { children, commands, onclose, extraClass = '' }: Props = $props();

  const dialog = createDialog();

  export function open() {
    dialog.open();
  }

  export function close() {
    dialog.close();
  }
</script>

<Transition show={$dialog.expanded} unmount>
  <div class="relative z-10">
    <div class="fixed inset-0 overflow-y-auto dialog-background">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <Transition>
          <div
            class="dialog-container rounded-2xl p-6 text-left shadow-xl transition-all {extraClass}"
            use:dialog.modal
            {onclose}
          >
            <div>{@render children()}</div>
            <div class="commands">{@render commands()}</div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</Transition>

<style>
  .dialog-container {
    background-color: var(--container-bg);
    color: var(--container-color);
    width: 90vw;
    max-width: 1000px;
    max-height: 90vh !important;
    overflow-y: auto;
  }
  
  .dialog-background {
    background-color: #00000040;
  }

  .commands {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--top-container-bg);
  }
</style>