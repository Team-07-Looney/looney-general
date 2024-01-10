<script>
    import AuthInput from "../../../lib/components/authInput.svelte";
    import BottomMenu from "../../../lib/components/BottomMenu.svelte";
    import showElement from '$lib/showElement';
    import WhiteBanner from "../../../lib/components/WhiteBanner.svelte";
    import * as Icon from 'svelte-twitter-emoji';
    $showElement = false;
  /** @type {import('./$types').ActionData} */
  export let form;

  $: iconId = null;
  let storedIconId;

  function selectIcon(id){
    let icon = document.getElementById(id);
    if (iconId == null) {
      icon.classList.add("bg-[#fdefc7]");
      iconId = id;
      storedIconId = id;
    } else {
      let previousIcon = document.getElementById(storedIconId);
      previousIcon.classList.remove("bg-[#fdefc7]");
      icon.classList.add("bg-[#fdefc7]");
      storedIconId = id;
      iconId = id;
    }
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
<div class="flex justify-center items-center">
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
              placeholder={"School Routine"}
              autocomplete={"given-name"}
              path={"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"}
              value={form?.name ?? ""}
              error={form?.errors?.some((error) => error.input == "name")}
            />
            <label>Choose an icon:</label>
            <div class="border-black-300 border-2 p-1">
            <div class="flex">
              <Icon.A1F315 class="p-2" size="45" id="A1F315" on:click={() => selectIcon('A1F315')}/>
              <Icon.A1F316 class="p-2" size="43" id="A1F316" on:click={() => selectIcon('A1F316')}/>
              <Icon.A1F318 class="p-2" size="45" id="A1F318" on:click={() => selectIcon('A1F318')}/>
              <Icon.A1F313 class="p-2" size="45" id="A1F313" on:click={() => selectIcon('A1F313')}/>  
              <Icon.A1F311 class="p-2" size="45" id="A1F311" on:click={() => selectIcon('A1F311')}/>
              <Icon.A1F320 class="p-2" size="45" id="A1F320" on:click={() => selectIcon('A1F320')}/>
            </div>
            <div class="flex">
              <Icon.A2600 class="p-2" size="45" id="A2600" on:click={() => selectIcon('A2600')}/>
              <Icon.A2B50 class="p-2" size="45" id="A2B50" on:click={() => selectIcon('A2B50')}/>   
              <Icon.A1F33b class="p-2" size="45" id="A1F33b" on:click={() => selectIcon('A1F33b')}/> 
              <Icon.A1F338 class="p-2" size="45" id="A1F338" on:click={() => selectIcon('A1F338')}/>  
              <Icon.A1F4aa1f3fc class="p-2" size="45" id="A1F4aa1f3fc" on:click={() => selectIcon('A1F4aa1f3fc')}/>
              <Icon.A1F98b class="p-2" size="45" id="A1F98b" on:click={() => selectIcon('A1F98b')}/>
           
            </div>
            <div class="flex"> 
              <Icon.A1F3bc class="p-2" size="45" id="A1F3bc" on:click={() => selectIcon('A1F3bc')}/>   
              <Icon.A1F4af class="p-2" size="45" id="A1F4af" on:click={() => selectIcon('A1F4af')}/>
              <Icon.A1F4d5 class="p-2" size="45" id="A1F4d5" on:click={() => selectIcon('A1F4d5')}/>  
              <Icon.A2764 class="p-2" size="45" id="A2764" on:click={() => selectIcon('A2764')}/>
              <Icon.A2708 class="p-2" size="45" id="A2708" on:click={() => selectIcon('A2708')}/>
              <Icon.A1F3ae class="p-2" size="45" id="A1F3ae" on:click={() => selectIcon('A1F3ae')}/>
            </div>
          </div>
          <input type="hidden" name="icon_id" bind:value={iconId} />

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