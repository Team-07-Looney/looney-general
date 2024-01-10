<script>
  /** @type {import('./$types').ActionData} */
  export let form;
  import FormEars from "../../lib/components/FormEars.svelte";
  import showElement from '$lib/showElement'
	$showElement = false;
  import WhiteBanner from "../../lib/components/WhiteBanner.svelte";
  import BottomMenu from "../../lib/components/BottomMenu.svelte";
  import AuthInput from "../../lib/components/authInput.svelte";
</script>

<WhiteBanner
  title="Profile"
  description="Change password or logout"
  route="/home"
  displayBackButton="1"
  displayMenuButton="0"
  imgExtraPath="../"
/>

<div class="flex justify-center items-center pt-5">
  <div class="flex flex-col ml-2 py-5 items-center w-64 px-1 gap-2">
    <FormEars/>
    <div class="bg-white rounded w-full p-3 z-[2]">
      <form
        method="POST"
        class="grid grid-cols-1 gap-4 text-gray-900"
        action="?/changePassword"
      >
        {#if form && form.errors}
          <div
            class="bg-red-200 text-red-900 p-2 rounded fixed w-[220px] top-[130px] ml-[3px]"
          >
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
        <h3 class="text-lg font-extrabold">Change password</h3>

        <AuthInput
          name={"current-password"}
          label={"Current password"}
          type={"password"}
          placeholder={""}
          autocomplete={"current-password"}
          path={"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"}
          value={form?.email ?? ""}
          error={form?.errors?.some(
            (error) => error.input == "current-password",
          )}
        />

        <AuthInput
          name={"new-password"}
          label={"New password"}
          type={"password"}
          placeholder={""}
          autocomplete={"new-password"}
          path={"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"}
          error={form?.errors?.some((error) => error.input == "new-password")}
        />

        <AuthInput
          name={"confirm-new-password"}
          label={"Confirm new password"}
          type={"password"}
          placeholder={""}
          autocomplete={"new-password"}
          path={"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"}
          error={form?.errors?.some(
            (error) => error.input == "confirm-new-password",
          )}
        />

        <div class="flex items-center justify-center">
          <button
            class="p-1.5 w-1/2 bg-lavender-500 rounded-lg mt-3 font-bold text-black"
            type="submit"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
    <div class="w-full">
      <div class="bg-white rounded w-full flex p-3">
        <form method="POST" class="text-gray-900 w-full" action="?/logout">
          <button
            class="p-1.5 bg-lavender-500 w-full rounded-lg font-bold text-black"
            type="submit"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
    <div class="w-full">
      <div class="bg-white rounded w-full flex p-3">
        <form method="POST" class="text-gray-900 w-full" action="?/logout">
          <button
            class="p-1.5 bg-lavender-500 w-full rounded-lg font-bold text-black"
            type="submit"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
<BottomMenu imgPath="../" />
