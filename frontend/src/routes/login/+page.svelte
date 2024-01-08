<script>
  import AuthInput from "../../lib/components/authInput.svelte";
  /** @type {import('./$types').ActionData} */
  export let form;
  import FormEars from "../../lib/components/FormEars.svelte";
  import ShadowsForForms from "../../lib/components/ShadowsForForms.svelte";
    import WhiteBanner from "../../lib/components/WhiteBanner.svelte";
</script>

<WhiteBanner title="Looney" description="Please Login" displayMenuButton=0/>

<div class="mt-6 flex justify-center items-center">
  <div class="flex flex-col items-center mt-10">
    <FormEars/>
  <div class="grid grid-cols-1">
    <ShadowsForForms height={194} width={260}/>
    <div class="px-8 pt-8 z-[2]">
      <div class="bg-white rounded px-4 py-4 mb-16">
        <form
          method="POST"
          class="grid grid-cols-1 gap-4 text-gray-900"
          action="?/login"
        >
          {#if form && form.errors}
            <div class="bg-red-200 text-red-900 p-2 rounded fixed w-[220px] top-[130px] ml-[3px]">
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
            placeholder={"Your@email.com"}
            autocomplete={"email"}
            path={"M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"}
            value={form?.email ?? ""}
            error={form?.errors?.some((error) => error.input == "email")}
          />

          <AuthInput
            name={"password"}
            label={"Password"}
            type={"password"}
            placeholder={"Your password"}
            autocomplete={"current-password"}
            path={"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"}
            error={form?.errors?.some((error) => error.input == "password")}
          />

          <div class="flex items-center justify-center">
            <button
              class="p-1.5 w-1/2 bg-lavender-500 rounded-lg mt-3 font-bold text-black"
              type="submit"
            >
              Login
            </button>
          </div>

          <a
            href="/register"
            class="text-xs text-center underline text-lavender-900"
            >No account yet? Register over here.</a
          >
        </form>
      </div>
    </div>
  </div>
</div>
</div>
