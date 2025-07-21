<script lang="ts">
    let email = $state("");
    let message = $state("");

    function handleSubmit(event: Event) {
        event.preventDefault();
        console.log(email, message);
    }
</script>

<h2 class="text-3xl font-bold mb-8 text-center">Contact</h2>
<form
    class="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow-md"
    onsubmit={handleSubmit}
>
    <div class="space-y-2">
        <input
            type="email"
            name="email"
            placeholder="Email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            bind:value={email}
        />
    </div>
    <div class="space-y-2">
        <textarea
            name="message"
            placeholder="Message"
            rows="5"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            bind:value={message}
        ></textarea>
    </div>
    <button
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
    >
        Send Message
    </button>
</form>

<style>
    form {
        background-color: #f0f0f0;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }
    input,
    textarea {
        background-color: #fff;
        border: 1px solid #ccc;
    }
</style>
