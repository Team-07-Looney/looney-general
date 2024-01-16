<script>
  import showElement from "$lib/showElement";
  import WhiteBanner from "../lib/components/WhiteBanner.svelte";
  $showElement = false;
</script>

<div>
  <WhiteBanner
    title="Looney"
    description="Please Login or Register"
    displayMenuButton="0"
    displayBackButton="0"
  />
  <div
    class="h-full flex flex-col justify-center items-center text-center text-xl pt-[10.5rem]"
  >
    <div class="w-full flex justify-center items-center absolute z-10 top-40">
      <img
        src="/src/img/mainLooney.png"
        alt="Looney"
        class="h-52 drop-shadow-lg"
      />
    </div>
    <div
      class="bg-white pt-16 pb-6 px-5 rounded-lg"
      style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
    >
      <p>Let's get started</p>
      <div>
        <a
          href="/login"
          type="button"
          class="bg-accent rounded-lg min-w-[240px] p-4 flex-row m-2"
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
          class="bg-accent rounded-lg min-w-[240px] p-4 flex-row m-2"
          style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
        >
          Register
        </a>
      </div>
    </div>
  </div>
</div>
