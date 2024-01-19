import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
  cookies.delete("jwt");

  throw redirect(302, "/login");
};
