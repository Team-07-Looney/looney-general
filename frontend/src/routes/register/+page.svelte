<script>
  import AuthInput from "../../lib/components/authInput.svelte";
  import Header from "../../lib/components/Header.svelte";
  import FormEars from "../../lib/components/FormEars.svelte";
  import ShadowsForForms from "../../lib/components/ShadowsForForms.svelte";
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<Header title="Looney" />
<div class="mt-4 flex justify-center items-center">
  <div class="flex flex-col items-center">
    <FormEars/>
  <div class="grid grid-cols-1">
    <ShadowsForForms width={280} height={420}/>
    <div class="px-8 pt-8 z-[2]">
      <div class=" bg-white rounded-xl px-4 py-5">
        <form
          method="POST"
          class="grid grid-cols-1 gap-4 text-gray-900"
          action="?/register"
        >
          {#if form && form.errors}
            <div class="bg-red-200 text-red-900 p-2 rounded z-50 fixed w-[250px] top-[12px]">
              <p class="text-sm pb-2">
                Uh oh! There seems to be an issue during the registration:
              </p>
              <ul class="text-sm">
                {#each form?.errors as error}
                  <li class="error">* {error.message}</li>
                {/each}
              </ul>
            </div>
          {/if}

          <AuthInput
            name={"name"}
            label={"Name"}
            type={"text"}
            placeholder={"John Doe"}
            autocomplete={"given-name"}
            path={"M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"}
            value={form?.name ?? ""}
            error={form?.errors?.some((error) => error.input == "name")}
          />

          <AuthInput
            name={"email"}
            label={"Email"}
            type={"email"}
            placeholder={"foobar@looney.com"}
            autocomplete={"email"}
            path={"M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"}
            value={form?.email ?? ""}
            error={form?.errors?.some((error) => error.input == "email")}
          />

          <AuthInput
            name={"password"}
            label={"Password"}
            type={"password"}
            placeholder={"**********"}
            autocomplete={"new-password"}
            path={"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"}
            error={form?.errors?.some((error) => error.input == "password")}
          />

          <AuthInput
            name={"confirm-password"}
            label={"Confirm password"}
            type={"password"}
            placeholder={"**********"}
            autocomplete={"new-password"}
            path={"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"}
            error={form?.errors?.some((error) => error.input == "password")}
          />

          <div class="flex items-center justify-center">
            <button
              class="p-1.5 w-1/2 bg-lavender-500 rounded-lg mt-3 font-bold text-black"
              type="submit"
            >
              Register
            </button>
          </div>

          <a
            href="/login"
            class="text-xs text-center underline text-lavender-900"
            style="z-index: 99; position:relative"
            >Already have an account? Log in over here.</a
          >
        </form>
      </div>
    </div>
  </div>
</div>
</div>