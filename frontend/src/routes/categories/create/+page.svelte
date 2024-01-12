<script>
    import AuthInput from "../../../lib/components/authInput.svelte";
    import IconsMenu from "../../../lib/components/IconsMenu.svelte";
    import BottomMenu from "../../../lib/components/BottomMenu.svelte";
    import showElement from '$lib/showElement';
    import WhiteBanner from "../../../lib/components/WhiteBanner.svelte";
    import FormEars from "../../../lib/components/FormEars.svelte";
    import ShadowsForForms from "../../../lib/components/ShadowsForForms.svelte";
    $showElement = false;
  /** @type {import('./$types').ActionData} */
  export let form;
  let storedIconId = 0;
  let iconId;

  function handleIconClick(event) {
    const id = event.detail.iconId.name;
    iconId = id;
  }
</script>
<WhiteBanner
    title="Create Category"
    description="Organize your habit with your own personal folder"
    route="/categories"
    displayBackButton="1"
    imgExtraPath="../"
    displayMenuButton="1"
/> 
<div class="flex justify-center items-center mt-28">
  <div class="flex flex-col items-center">
    <FormEars/>
    <div class="grid grid-cols-1">
      <ShadowsForForms height={159} width={259}/>
      <div class="px-8 pt-8 z-[3]">
        <div class="bg-white rounded-xl px-4 py-5">
          <form
            method="POST"
            class="grid grid-cols-1 gap-4 text-gray-900"
            action="?/createCategory"
          >
            {#if form && form.errors}
              <div
                class="bg-red-200 text-red-900 p-2 rounded z-[50] fixed w-[250px] top-[75px]"
              >
                <p class="text-sm pb-2">
                  Uh oh! There seems to be an issue with the create:
                </p>
                <ul class="text-sm">
                  {#each form?.errors as error}
                    {#if error.message}
                      <li class="error">
                        * {error.message}
                      </li>
                    {/if}
                  {/each}
                </ul>
              </div>
            {/if}
            
            <AuthInput
              name={"name"}
              label={"Name"}
              type={"text"}
              placeholder={"School Routine"}
              autocomplete={"given-name"}
              path={"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"}
              value={form?.name ?? ""}
              error={form?.errors?.some((error) => error.input == "name")}
            />
            <label>Choose an icon:</label>
            <IconsMenu bind:storedIconId iconId={iconId} on:iconSelected={handleIconClick} />
            <input type="hidden" name="icon_id" value={iconId} />
            <div class="flex flex-row gap-12 justify-center items-center">
              <a
                href="/categories"
                class="px-5 py-2 rounded-lg mt-3 font-bold"
                style="background-color: #B4B4B4">Cancel</a
              >
              <button
                class="px-5 py-2 rounded-lg mt-3 font-bold"
                type="submit"
                style="background-color: #9B9DD1">Create</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<BottomMenu imgPath="../" displayHabitText="1" />