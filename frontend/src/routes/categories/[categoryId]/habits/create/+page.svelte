  <script>
    import FormEars from "../../../../../lib/components/FormEars.svelte";
    import AuthInput from "../../../../../lib/components/AuthInput.svelte";
    import ShadowsForForms from "../../../../../lib/components/ShadowsForForms.svelte";
    import TimePicker from "../../../../../lib/components/TimePicker.svelte";
    import WhiteBanner from "../../../../../lib/components/WhiteBanner.svelte";
    import BottomMenu from "../../../../../lib/components/BottomMenu.svelte";
    import showElement from '$lib/showElement';

    $showElement = false;
    /** @type {import('./$types').ActionData} */
    export let form;

    export let data;
  
    // date for time picker
    let date = new Date();
    $: _date = date.toLocaleTimeString("en-GB", { timeStyle: 'short' });

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
      console.log('form:', form);
      console.log('option:', option);

      if (form) {
        form.name = option;
        filteredHabitNames = [];
      }
    };

</script>

<WhiteBanner
title="Create Habit"
description="Time to build your new habit, use this form and let’s make it happen"
route="/categories/{data.categoryId}/habits"
displayBackButton="1"
imgExtraPath="../../"
/>
<div class="mt-10 flex justify-center items-center">
  <div class="flex flex-col items-center">
    <FormEars />
    <div class="grid grid-cols-1">
      <ShadowsForForms width={260} height={310} />
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
              path={"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"}              value={form?.name ?? ""}
              error={form?.errors?.some((error) => error.input == "name")}
              on:input={(event) => {
                console.log('AuthInput on:input event');
                handleNameInputChange(event);
              }}
            />
         
            {#if filteredHabitNames.length > 0}
              <div class="absolute mt-[61px] w-[230px] h-20">
                <ul class="bg-gray-100 border rounded-lg shadow-lg border-1 border-black">
                  {#each filteredHabitNames as option, index (option)}
                    <li class="{index === filteredHabitNames.length - 1 ? 'cursor-pointer pl-4 py-1 pr-1' : 'cursor-pointer pl-4 py-1 pr-1 border-b-[1px] border-black'} hover:bg-gray-100 w-full" on:click={() => handleOptionClick(option)}>
                      {option}
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}

            <TimePicker 
            bind:_date 
            label="Start Time"
            id="start_time"
            display24=true
            error={form?.errors?.some((error) => error.input == "start_time")} 
            placeholder="hours and minutes"
            data={form?.startTime} />

            <TimePicker 
            label="Duration" 
            id="duration"
            error={form?.errors?.some((error) => error.input == "duration")} 
            placeholder="minutes and seconds"
            data={form?.duration} />

            <div class="flex flex-row gap-12 justify-center items-center">
              <a
                href="/categories/{data.categoryId}/habits"
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
<BottomMenu imgPath="../../" displayHabitText="1" />