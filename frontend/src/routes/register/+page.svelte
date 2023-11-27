<script>
  import AuthInput from "../../lib/components/authInput.svelte";
</script>

<div class="h-screen">
  <div class="grid grid-cols-1">
    <h1 class="text-center text-5xl text-black pt-7">Looney</h1>
    <h2 class="text-center text-3xl text-black">Register</h2>
    <div class="px-8 pt-8">
      <div class="bg-white rounded px-4 py-5">
        <form
          method="POST"
          class="grid grid-cols-1 gap-4 text-gray-900"
          action="?/register"
        >
          <AuthInput
            name={"name"}
            label={"Name"}
            type={"text"}
            placeholder={"John Doe"}
            path={"M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"}
          />

          <AuthInput
            name={"email"}
            label={"Email"}
            type={"email"}
            placeholder={"foobar@looney.com"}
            path={"M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"}
          />

          <AuthInput
            name={"password"}
            label={"Password"}
            type={"password"}
            placeholder={"**********"}
            path={"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"}
          />

          <AuthInput
            name={"confirm-password"}
            label={"Confirm password"}
            type={"password"}
            placeholder={"**********"}
            path={"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"}
          />

          <div class="flex items-center justify-center">
            <button class="p-1.5 w-1/2 bg-[#9C9ED3] rounded-lg mt-3" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
