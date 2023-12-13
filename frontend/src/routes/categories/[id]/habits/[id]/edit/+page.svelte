<script>
    import { onMount } from "svelte";

    /** @type {import('./$types').ActionData} */
    export let form;
    import Header from "../../../../../../lib/components/Header.svelte";
    import FormEars from "../../../../../../lib/components/FormEars.svelte";
    import ShadowsForForms from "../../../../../../lib/components/ShadowsForForms.svelte";
    import AuthInput from "../../../../../../lib/components/authInput.svelte";
    export let data;
    console.log(data)
</script>

<Header title="Edit habit" imgExtraPath="../../../" />
<div class="flex justify-center items-center mt-4">
    <div class="flex flex-col items-center">
        <FormEars />
        <div class="grid grid-cols-1">
            
            <ShadowsForForms width={307} height={373} />
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
                                    Uh oh! There seems to be an issue with the
                                    edit:
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
                            path={"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"}
                            value={data.name}
                            error={form?.errors?.some(
                                (error) => error.input == "name",
                            )}
                        />

                        <div class="flex flex-row gap-5">
                            <AuthInput
                                name={"start_time_hours"}
                                label={"Start time (hours)"}
                                type={"number"}
                                placeholder={""}
                                path={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}
                                value={data.start_time_hours}
                                error={form?.errors?.some(
                                    (error) =>
                                        error.input == "start_time_hours",
                                )}
                            />

                            <AuthInput
                                name={"start_time_minutes"}
                                label={"Start time (minutes)"}
                                type={"number"}
                                placeholder={""}
                                path={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}
                                value={data.start_time_minutes}
                                error={form?.errors?.some(
                                    (error) =>
                                        error.input == "start_time_minutes",
                                )}
                            />
                        </div>

                        <div class="flex flex-row gap-5">
                            <AuthInput
                                name={"duration_minutes"}
                                label={"Duration (minutes)"}
                                type={"number"}
                                placeholder={""}
                                path={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}
                                value={data.duration_minutes}
                                error={form?.errors?.some(
                                    (error) =>
                                        error.input == "duration_minutes",
                                )}
                            />

                            <AuthInput
                                name={"duration_seconds"}
                                label={"Duration (seconds)"}
                                type={"number"}
                                placeholder={""}
                                path={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"}
                                value={data.duration_seconds}
                                error={form?.errors?.some(
                                    (error) =>
                                        error.input == "duration_seconds",
                                )}
                            />
                        </div>

                        <div
                            class="flex flex-row gap-12 justify-center items-center"
                        >
                            <a
                                href="/categories/habits"
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