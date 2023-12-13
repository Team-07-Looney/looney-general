<script>

  import Header from "../../../lib/components/Header.svelte";
  import AuthInput from "../../../lib/components/authInput.svelte";
 
  /** @type {import('./$types').ActionData} */
  export let form;
</script>
<Header title="Add Category"/>
<div class="flex justify-center items-center mt-4">
  <div class="flex flex-col items-center">

    <div class="grid grid-cols-1">
      
     
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
              placeholder={"School"}
              autocomplete={"given-name"}
              path={"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"}
              value={form?.name ?? ""}
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
                style="background-color: #9B9DD1">Create</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
