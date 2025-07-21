<script lang="ts">
    import StatCounter from "$lib/StatCounter.svelte";

    let counter = $state(0);

    function increment() {
        counter++;
    }

    function handleReset() {
        counter = 0;
    }
</script>

<button onclick={increment} class="bg-blue-500 text-white p-2 rounded-md"
    >Increment</button
>
<p>Counter: {counter}</p>
<StatCounter {counter} on:reset={handleReset} />
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
