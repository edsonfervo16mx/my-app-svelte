<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let email = "";
    let password = "";
    let showPassword = false;
    let isLoading = false;
    let errors: Record<string, string> = {};
    let form: HTMLFormElement;

    // Client-side validation
    function validateEmail(email: string): string | null {
        if (!email) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return "Please enter a valid email address";
        return null;
    }

    function validatePassword(password: string): string | null {
        if (!password) return "Password is required";
        if (password.length < 6)
            return "Password must be at least 6 characters";
        return null;
    }

    function validateForm(): boolean {
        errors = {};

        const emailError = validateEmail(email);
        if (emailError) errors.email = emailError;

        const passwordError = validatePassword(password);
        if (passwordError) errors.password = passwordError;

        return Object.keys(errors).length === 0;
    }

    function handleSubmit(event: Event) {
        if (!validateForm()) {
            event.preventDefault();
            return;
        }
        isLoading = true;
    }

    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    // Auto-focus email input on mount
    onMount(() => {
        const emailInput = document.querySelector(
            'input[name="email"]',
        ) as HTMLInputElement;
        if (emailInput) emailInput.focus();
    });
</script>

<svelte:head>
    <title>Sign In - My App</title>
    <meta name="description" content="Sign in to your account" />
</svelte:head>

<div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4"
>
    <div class="w-full max-w-md">
        <!-- Logo/Brand Section -->
        <div class="text-center mb-8">
            <div
                class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg"
            >
                <svg
                    class="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                </svg>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p class="text-gray-600">Sign in to your account to continue</p>
        </div>

        <!-- Sign In Form -->
        <form
            bind:this={form}
            method="POST"
            class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm"
            use:enhance={() => {
                return async ({ result, update }) => {
                    isLoading = false;

                    if (result.type === "failure") {
                        // Handle server-side errors
                        errors = { general: "Invalid email or password" };
                    } else if (result.type === "redirect") {
                        // Handle successful login
                        await goto(result.location);
                    }

                    await update();
                };
            }}
            on:submit={handleSubmit}
        >
            <!-- Email Field -->
            <div class="mb-6">
                <label
                    for="email"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                >
                    Email address
                </label>
                <div class="relative">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        bind:value={email}
                        class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 {errors.email
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}"
                        placeholder="Enter your email"
                        required
                        autocomplete="email"
                        aria-describedby={errors.email
                            ? "email-error"
                            : undefined}
                    />
                    <div
                        class="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                        <svg
                            class="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            ></path>
                        </svg>
                    </div>
                </div>
                {#if errors.email}
                    <p
                        id="email-error"
                        class="mt-2 text-sm text-red-600 flex items-center"
                    >
                        <svg
                            class="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        {errors.email}
                    </p>
                {/if}
            </div>

            <!-- Password Field -->
            <div class="mb-6">
                <label
                    for="password"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                >
                    Password
                </label>
                <div class="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        bind:value={password}
                        class="w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 {errors.password
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}"
                        placeholder="Enter your password"
                        required
                        autocomplete="current-password"
                        aria-describedby={errors.password
                            ? "password-error"
                            : undefined}
                    />
                    <button
                        type="button"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                        on:click={togglePasswordVisibility}
                        aria-label={showPassword
                            ? "Hide password"
                            : "Show password"}
                    >
                        {#if showPassword}
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                ></path>
                            </svg>
                        {:else}
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                ></path>
                            </svg>
                        {/if}
                    </button>
                </div>
                {#if errors.password}
                    <p
                        id="password-error"
                        class="mt-2 text-sm text-red-600 flex items-center"
                    >
                        <svg
                            class="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        {errors.password}
                    </p>
                {/if}
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between mb-6">
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a
                    href="/forgot-password"
                    class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                    Forgot password?
                </a>
            </div>

            <!-- General Error Message -->
            {#if errors.general}
                <div
                    class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                    <div class="flex items-center">
                        <svg
                            class="w-5 h-5 text-red-400 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span class="text-sm text-red-600"
                            >{errors.general}</span
                        >
                    </div>
                </div>
            {/if}

            <!-- Action Buttons -->
            <div class="space-y-4">
                <button
                    type="submit"
                    formaction="?/login"
                    disabled={isLoading}
                    class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                >
                    {#if isLoading}
                        <div class="flex items-center justify-center">
                            <svg
                                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                ></circle>
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Signing in...
                        </div>
                    {:else}
                        Sign in
                    {/if}
                </button>

                <button
                    type="submit"
                    formaction="?/register"
                    disabled={isLoading}
                    class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                >
                    Create new account
                </button>
            </div>

            <!-- Divider -->
            <div class="relative my-6">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500"
                        >Or continue with</span
                    >
                </div>
            </div>

            <!-- Social Login Buttons -->
            <div class="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                    <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Google
                </button>
                <button
                    type="button"
                    class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                    <svg
                        class="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                        />
                    </svg>
                    Twitter
                </button>
            </div>

            <!-- Footer -->
            <p class="text-center text-gray-600 text-sm mt-6">
                Don't have an account?
                <a
                    href="/register"
                    class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                    Sign up for free
                </a>
            </p>
        </form>

        <!-- Terms and Privacy -->
        <p class="text-center text-xs text-gray-500 mt-6">
            By signing in, you agree to our
            <a href="/terms" class="text-blue-600 hover:text-blue-700"
                >Terms of Service</a
            >
            and
            <a href="/privacy" class="text-blue-600 hover:text-blue-700"
                >Privacy Policy</a
            >
        </p>
    </div>
</div>
