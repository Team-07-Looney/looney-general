<script>
  /** @type {import('./$types').ActionData} */
  import TimePicker from "../../../../../../lib/components/TimePicker.svelte";
  import FormEars from "../../../../../../lib/components/FormEars.svelte";
  import ShadowsForForms from "../../../../../../lib/components/ShadowsForForms.svelte";
  import AuthInput from "../../../../../../lib/components/AuthInput.svelte";
  import showElement from "$lib/showElement";
  import WhiteBanner from "../../../../../../lib/components/WhiteBanner.svelte";
  import BottomMenu from "../../../../../../lib/components/BottomMenu.svelte";

  $showElement = false;
  export let data;
  export let form;

  let filteredHabitNames = [];

  // Function to handle input change and filter predefined habit names
  const handleNameInputChange = (event) => {
    const inputValue = event.target.value.trim().toLowerCase(); // trim to handle spaces
    filteredHabitNames = inputValue
      ? data.predefinedHabits.filter(
        (name) => name.toLowerCase().includes(inputValue)
      )
      : [];
  };

  // Function to handle option click and set input value
  const handleOptionClick = (option) => {
    const input = document.getElementById("name");
    input.value = option;
    filteredHabitNames = [];
  };
</script>
<svelte:head>
    <title>Edit habit</title> 
</svelte:head>

<WhiteBanner
  title="Edit Habit"
  description="Tweak your habit like a pro. Use this form to remix and upgrade your routine."
  route="/categories/{data.category}/habits"
  displayBackButton="1"
  imgExtraPath="../../../"
/>
<div class="flex justify-center items-center mt-10">
  <div class="flex flex-col items-center">
    <FormEars />
    <div class="grid grid-cols-1">
      <ShadowsForForms width={260} height={310} />
      <div class="px-8 pt-8 z-[3]">
        <div class="bg-white rounded-xl px-4 py-5">
          <form
            method="POST"
            class="grid grid-cols-1 gap-4 text-gray-900"
            action="?/editHabit"
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
              value={data.habit.name}
              error={form?.errors?.some((error) => error.input == "name")}
              on:input={(event) => {handleNameInputChange(event);}}
            />
            {#if filteredHabitNames.length > 0}
              <div class="absolute mt-[61px] w-[230px] h-20">
                <ul class="bg-gray-100 border rounded-lg shadow-lg border-1 border-black">
                  {#each filteredHabitNames as option, index (option)}
                    <li class="{index === filteredHabitNames.length - 1 ? "cursor-pointer pl-4 py-1 pr-1" : "cursor-pointer pl-4 py-1 pr-1 border-b-[1px] border-black"} hover:bg-gray-100 w-full" >
                      <button on:click={() => handleOptionClick(option)}>
                        {option}
                      </button>
                      </li>
                  {/each}
                </ul>
              </div>
            {/if}

            <TimePicker
              label="Start Time"
              data={data.habit.start_time}
              display24="true"
              id="start_time"
              placeholder="hours and minutes"
              error={form?.errors?.some((error) => error.input == "start_time")}
            />

            <TimePicker
              label="Duration"
              data={data.habit.duration}
              id="duration"
              placeholder="minutes and seconds"
              error={form?.errors?.some((error) => error.input == "duration")}
            />
            <div class="flex flex-row gap-12 justify-center items-center">
              <a
                href="/categories/{data.category}/habits"
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
<BottomMenu imgPath="../../../" displayHabitText="1" />
