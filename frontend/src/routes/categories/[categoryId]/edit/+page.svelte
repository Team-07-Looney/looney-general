<script>
  import BottomMenu from "../../../../lib/components/BottomMenu.svelte";
  import WhiteBanner from "../../../../lib/components/WhiteBanner.svelte";
  /** @type {import('./$types').ActionData} */
  export let form;
  import AuthInput from "../../../../lib/components/AuthInput.svelte";
  export let data;
  import showElement from "$lib/showElement";
  import FormEars from "../../../../lib/components/FormEars.svelte";
  import ShadowsForForms from "../../../../lib/components/ShadowsForForms.svelte";
  $showElement = false;
</script>

<WhiteBanner
  title="Edit Category"
  description="Tweak your category like a pro. Use this form to remix and upgrade your routine."
  route="/categories"
  displayBackButton="1"
  imgExtraPath="../"
/>
<div class="mt-28 flex justify-center items-center">
  <div class="flex flex-col items-center">
    <FormEars />
    <div class="grid grid-cols-1">
      <ShadowsForForms height={159} width={259} />
      <div class="px-8 pt-8 z-[3]">
        <div class="bg-white rounded-xl px-4 py-5">
          <form
            method="POST"
            class="grid grid-cols-1 gap-4 text-gray-900"
            action="?/editCategory"
          >
            {#if form && form.errors}
              <div
                class="bg-red-200 text-red-900 p-2 rounded z-[50] fixed w-[250px] top-[75px]"
              >
                <p class="text-sm pb-2">
                  Uh oh! There seems to be an issue with the edit:
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
              placeholder={""}
              path={"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"}
              value={data.name}
              error={form?.errors?.some((error) => error.input == "name")}
            />
            <div class="flex flex-row gap-12 justify-center items-center">
              <a
                href="/categories"
                class="px-5 py-2 rounded-lg mt-3 font-bold"
                style="background-color: #B4B4B4">Cancel</a
              >
              <button
                class="px-5 py-2 rounded-lg mt-3 font-bold"
                type="submit"
                style="background-color: #9B9DD1">Submit</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<BottomMenu imgPath="../" displayHabitText="1" />
