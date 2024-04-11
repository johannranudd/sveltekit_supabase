import { zod } from "sveltekit-superforms/adapters"
import { message, superValidate } from "sveltekit-superforms"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import { loginUserSchema } from "~/lib/schemas"

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
  return {
    form: await superValidate(zod(loginUserSchema)),
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event.request, zod(loginUserSchema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { error: formError } = await event.locals.supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password,
    })
    if (formError) {
      return message(form, "form failed")
    }

    return message(form, "Form posted successfully!"), redirect(302, "/")
  },
}
