<script>
  import examples from './examples'
  const title = (example) => example?.meta?.title || example.name
</script>

<h1>svelte-final-form examples</h1>

<nav>
  {#each Object.entries(examples) as [name, example]}
    <h3><a href="/{name}">{@html title(example)}</a></h3>
    {@html example.meta && example.meta.description || ''}
  {/each}
</nav>
