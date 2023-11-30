<script>
  import CoralCluster from "../../../lib/components/CoralCluster.svelte";
import FormEars from "../../../lib/components/FormEars.svelte";
  import Header from "../../../lib/components/Header.svelte";
  import AuthInput from "../../../lib/components/authInput.svelte";
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<div class="h-screen flex justify-center items-center">
  <div class="flex flex-col items-center">
    <FormEars/>
    <div class="gird grid-cols-1">
      <Header header="Add Habit" />
      <div class="px-8 pt-8 z-[3] relative">
        <div
          class="bg-white rounded-xl px-4 py-5"
          style="box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
        >
          <form
            method="POST"
            class="grid grid-cols-1 gap-4 text-gray-900"
            action="?/createHabit"
          >
            {#if form && form.errors}
              <div class="bg-red-200 text-red-900 p-2 rounded z-[50] fixed w-[250px] top-[75px]">
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
              placeholder={"Brush teeth"}
              autocomplete={"given-name"}
              path={"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"}
              value={form?.name ?? ""}
              error={form?.errors?.some((error) => error.input == "name")}
            />

            <AuthInput
              name={"start_time"}
              label={"Start time"}
              type={"text"}
              placeholder={"10:00"}
              autocomplete={"given-name"}
              path={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}
              value={form?.name ?? ""}
              error={form?.errors?.some((error) => error.input == "start_time")}
            />

            <AuthInput
              name={"duration"}
              label={"Duration"}
              type={"text"}
              placeholder={"30"}
              autocomplete={"given-name"}
              path={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}
              value={form?.name ?? ""}
              error={form?.errors?.some((error) => error.input == "duration")}
            />

            <div class="flex flex-row gap-6 justify-center items-center">
              <a href="/habits" class="px-5 py-2 rounded-lg mt-3 font-bold" style="background-color: #B4B4B4"
              >Cancel</a
            >
              <button class="px-5 py-2 rounded-lg mt-3 font-bold" type="submit" style="background-color: #9B9DD1"
              >Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <CoralCluster/>
</div>
