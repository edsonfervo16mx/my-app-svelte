<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let counter: number;
    const dispatch = createEventDispatcher();

    function resetCounter() {
        counter = 0;
        dispatch("reset");
    }
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
    <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800">{counter}</h2>
        <p class="text-gray-600 mt-2">Total Count</p>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-4">
        <div class="text-center p-4 bg-gray-50 rounded-lg">
            <p class="text-2xl font-semibold text-blue-600">{counter * 2}</p>
            <p class="text-sm text-gray-500">Double</p>
        </div>
        <div class="text-center p-4 bg-gray-50 rounded-lg">
            <p class="text-2xl font-semibold text-green-600">{counter / 2}</p>
            <p class="text-sm text-gray-500">Half</p>
        </div>
    </div>

    <div class="mt-6">
        <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
                class="bg-blue-600 h-2.5 rounded-full"
                style="width: {Math.min((counter / 100) * 100, 100)}%"
            ></div>
        </div>
        <p class="text-sm text-gray-500 mt-2 text-center">
            Progress ({Math.min((counter / 100) * 100, 100)}%)
        </p>
    </div>

    <div class="mt-6 text-center">
        <button
            on:click={resetCounter}
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-150"
        >
            Reset Counter
        </button>
    </div>
</div>
