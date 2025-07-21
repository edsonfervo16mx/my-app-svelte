<script lang="ts">
    import { page } from "$app/state";
    import TitleSubtitle from "$lib/TitleSubtitle.svelte";
    let id = parseInt(page.params.id);
    let id2 = $state(id);
    let logo = $state(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/640px-Svelte_Logo.svg.png",
    );
</script>

<TitleSubtitle title={`About ${id}`} subtitle="This is the about page" />
<button
    onclick={() => (id2 = id2 + 1)}
    class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
    >Change ID</button
>
<p>ID2: {id2}</p>

<div
    style="width:70px; height:70px; margin-left:auto; margin-right:auto; overflow:hidden; display:flex; align-items:center; justify-content:center;"
>
    <img
        src={logo}
        alt="Svelte Logo"
        style="width:100%; height:100%; object-fit:contain;"
    />
</div>
