<script>
  import showElement from "$lib/showElement";
    import FormEars from "../lib/components/FormEars.svelte";
    import ShadowsForForms from "../lib/components/ShadowsForForms.svelte";
  import WhiteBanner from "../lib/components/WhiteBanner.svelte";
  $showElement = false;
</script>

  <WhiteBanner
    title="Looney"
    description="Please Login or Register"
    displayMenuButton="0"
    displayBackButton="0"
  />

  <div class="w-full flex justify-center items-center absolute z-10 top-40">
    <img
      src="/src/img/mainLooney.png"
      alt="Looney"
      class="h-52 drop-shadow-lg"
    />
  </div>
<div class="mt-36 text-center">
  <div class="flex flex-col">
    <FormEars />
    <div class="grid grid-cols-1">
      <ShadowsForForms width={295} height={250} />
      <div class="px-8 pt-8 z-[2]">
        <div class=" bg-white rounded-xl px-6 pt-14 pb-6">
          <p>Let's get started</p>
          <div>
            <a
              href="/login"
              type="button"
              class="bg-lavender-500 rounded-lg min-w-[240px] p-3 flex-row m-2 font-bold text-lg"
              style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
            >
              Login
            </a>
          </div>
          <p>Or</p>
          <div>
            <a
              href="/register"
              type="button"
              class="bg-lavender-500 rounded-lg min-w-[240px] p-4 flex-row m-2 font-bold"
              style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

