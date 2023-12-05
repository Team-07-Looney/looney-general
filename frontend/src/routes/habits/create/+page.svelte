<script>
  import FormEars from "../../../lib/components/FormEars.svelte";
  import Header from "../../../lib/components/Header.svelte";
  import AuthInput from "../../../lib/components/authInput.svelte";
  import ShadowsForForms from "../../../lib/components/ShadowsForForms.svelte";
  import TimePicker from "../../../lib/components/TimePicker.svelte";
  import { onMount } from "svelte";

  /** @type {import('./$types').ActionData} */
  export let form;

  // date for time picker
  let date = new Date();
  $: _date = date.toLocaleTimeString("en-GB", { timeStyle: 'short' });

  onMount(() => {
    function addNulIfNeeded(event) {
      if (event.target.value >= 0 && event.target.value <= 9) {
        event.target.value = `0${event.target.value}`;
      }
    }

    const start_time_minutes = document.getElementById("start_time_minutes");
    const start_time_hours = document.getElementById("start_time_hours");
    const duration_seconds = document.getElementById("duration_seconds");

    start_time_minutes.addEventListener("change", addNulIfNeeded);
    start_time_hours.addEventListener("change", addNulIfNeeded);
    duration_seconds.addEventListener("change", addNulIfNeeded);
  });
</script>

<div class="h-screen flex justify-center items-center">
  <div class="flex flex-col items-center">
    <FormEars />
    <div class="grid grid-cols-1">
      <Header title="Add Habit" displayBackButton="0" />
      <ShadowsForForms width={307} height={373} />
      <div class="px-8 pt-8 z-[3]">
        <div class="bg-white rounded-xl px-4 py-5">
          <form
            method="POST"
            class="grid grid-cols-1 gap-4 text-gray-900"
            action="?/createHabit"
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
              placeholder={"Brush teeth"}
              autocomplete={"given-name"}
              path={"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"}
              value={form?.name ?? ""}
              error={form?.errors?.some((error) => error.input == "name")}
            />

            <div class="flex flex-row gap-5">
              <!-- TODO: add min="0" and max="23" -->
              <AuthInput
                name={"start_time_hours"}
                label={"Start time (hours)"}
                type={"number"}
                placeholder={"09"}
                autocomplete={"given-name"}
                path={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}
                value={form?.startTimeHours ?? ""}
                error={form?.errors?.some(
                  (error) => error.input == "start_time_hours",
                )}
              />

              <!-- TODO: add min="0" and max="59" -->
              <AuthInput
                name={"start_time_minutes"}
                label={"Start time (minutes)"}
                type={"number"}
                placeholder={"30"}
                autocomplete={"given-name"}
                path={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}
                value={form?.startTimeMinutes ?? ""}
                error={form?.errors?.some(
                  (error) => error.input == "start_time_minutes",
                )}
              />
            </div>

            <div class="flex flex-row gap-5">
              <!-- TODO: add min="0" and max="90" -->
              <AuthInput
                name={"duration_minutes"}
                label={"Duration (minutes)"}
                type={"number"}
                placeholder={"05"}
                autocomplete={"given-name"}
                path={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}
                value={form?.durationMinutes ?? ""}
                error={form?.errors?.some(
                  (error) => error.input == "duration_minutes",
                )}
              />

              <!-- TODO: add min="0" and max="59" -->
              <AuthInput
                name={"duration_seconds"}
                label={"Duration (seconds)"}
                type={"number"}
                placeholder={"00"}
                autocomplete={"given-name"}
                path={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}
                value={form?.durationSeconds ?? ""}
                error={form?.errors?.some(
                  (error) => error.input == "duration_seconds",
                )}
              />
            </div>

            <p>Time: {_date}</p>
            <TimePicker bind:date />

            <div class="flex flex-row gap-12 justify-center items-center">
              <a
                href="/habits"
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
