import supabase from "~/config/supabaseClient"

export async function signUpNewUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173",
      },
    })

    if (error) {
      throw error
    } else if (data && data.user) {
      return data.user.email
    }
  } catch (error) {
    console.error(error, "An error occured signing up new user")
  }
}
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    } else if (data && data.user && data.session && data.user.email) {
      return { email: data.user.email, access_token: data.session.access_token }
    }
  } catch (error) {
    console.error(error, "An error occured signing up new user")
  }
}
