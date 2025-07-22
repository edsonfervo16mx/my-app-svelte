<script lang="ts">
    import type { PageProps } from "./$types";
    let { data }: PageProps = $props();

    console.log("Users:", data.users);
    console.log("Data test:", data.data_test);

    let profile = $state({
        name: "John Doe",
        age: 30,
        email: "john.doe@example.com",
        phone: "123-456-7890",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
    });

    let sales = $state([
        {
            id: 1,
            name: "Sale 1",
            amount: 100,
        },
        {
            id: 2,
            name: "Sale 2",
            amount: 200,
        },
        {
            id: 3,
            name: "Sale 3",
            amount: 300,
        },
    ]);
</script>

<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-3xl font-bold mb-6 text-center">Profile</h2>
    <p class="text-gray-600 mb-6 text-center">This is the profile page</p>

    <div class="space-y-4 mb-8">
        <div class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-gray-500 text-sm">Name</p>
                    <p class="font-medium">{profile.name}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-sm">Age</p>
                    <p class="font-medium">{profile.age}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-sm">Email</p>
                    <p class="font-medium">{profile.email}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-sm">Phone</p>
                    <p class="font-medium">{profile.phone}</p>
                </div>
            </div>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
            <div class="space-y-2">
                <div>
                    <p class="text-gray-500 text-sm">Address</p>
                    <p class="font-medium">{profile.address}</p>
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <p class="text-gray-500 text-sm">City</p>
                        <p class="font-medium">{profile.city}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm">State</p>
                        <p class="font-medium">{profile.state}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm">ZIP</p>
                        <p class="font-medium">{profile.zip}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <h2 class="text-2xl font-bold mb-4">Sales History</h2>
    <div class="bg-gray-50 rounded-lg overflow-hidden">
        <ul class="divide-y divide-gray-200">
            {#each sales as sale}
                <li class="p-4 hover:bg-gray-100 transition duration-150">
                    <div class="flex justify-between items-center">
                        <span class="font-medium">{sale.name}</span>
                        <span class="text-green-600">${sale.amount}</span>
                    </div>
                </li>
            {/each}
        </ul>
    </div>

    <h2 class="text-2xl font-bold mb-4">Users</h2>
    <ul class="divide-y divide-gray-200">
        {#each data.users as user}
            <li class="p-4 hover:bg-gray-100 transition duration-150">
                <div class="flex justify-between items-center">
                    <div>
                        <span class="font-medium">{user.name}</span>
                        <p class="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <span class="text-blue-600"
                        >{user.company?.name || "No company"}</span
                    >
                </div>
            </li>
        {/each}
    </ul>
</div>
<pre>{JSON.stringify(data.data_test, null, 2)}</pre>
