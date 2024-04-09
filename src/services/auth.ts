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

    if (error) throw error
    console.log(data)
  } catch (error) {
    console.error(error, "An error occured signing up new user")
  }
}
