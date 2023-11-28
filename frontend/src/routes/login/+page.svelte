<script>
  import AuthInput from "../../lib/components/authInput.svelte";

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<div class="h-screen flex justify-center items-center">
  <div class="grid grid-cols-1">
    <h1 class="text-center text-5xl text-black">Looney</h1>
    <h2 class="text-center text-3xl text-black">Login</h2>
    <div class="px-8 pt-8">
      <div class="bg-white rounded px-4 py-5">
        <form
          method="POST"
          class="grid grid-cols-1 gap-4 text-gray-900"
          action="?/login"
        >
          {#if form && form.errors}
            <div class="bg-red-200 text-red-900 p-2 rounded">
              <p class="text-sm pb-2">
                Uh oh! There seems to be an issue with the login:
              </p>
              <ul class="text-sm">
                {#each form?.errors as error}
                  {#if error.message}
                    <li class="error">* {error.message}</li>
                  {/if}
                {/each}
              </ul>
            </div>
          {/if}

          <AuthInput
            name={"email"}
            label={"Email"}
            type={"email"}
            placeholder={"foobar@looney.com"}
            path={"M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"}
            value={form?.email ?? ""}
            error={form?.errors?.some((error) => error.input == "email")}
          />

          <AuthInput
            name={"password"}
            label={"Password"}
            type={"password"}
            placeholder={"**********"}
            autocomplete={"password"}
            path={"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"}
            error={form?.errors?.some((error) => error.input == "password")}
          />

          <div class="flex items-center justify-center">
            <button
              class="p-1.5 w-1/2 bg-lavender-500 rounded-lg mt-3"
              type="submit"
            >
              Login
            </button>
          </div>

          <a
            href="/register"
            class="text-xs text-center underline text-lavender-600 hover:text-lavender-900"
            >No account yet? Register over here.</a
          >
        </form>
      </div>
    </div>
  </div>
</div>
