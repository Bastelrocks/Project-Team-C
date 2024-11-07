import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

/* Maybe at this place we will conect the database */
export const sessionStore = defineStore('sessionStore', () => {
  let isAutenticated = ref(false);

  /* To remove at the End */
  let loginData = ref(
    {
      email: "victor.martins.1310@hotmail.com",
      password: "badPassword.1234"
    });

  /* Not Sure if we need this */
  const { sessionData } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'INITIAL_SESSION') { // Discover what exactly that it is
      if (session) isAutenticated.value = true;
      else isAutenticated.value = false;
    }
    else if (event === 'SIGNED_IN')  {
      isAutenticated.value = true; }
    else if (event === 'SIGNED_OUT') { isAutenticated.value = false; }
 // else if (event === 'PASSWORD_RECOVERY') { console.log(event, session) } 
 // else if (event === 'TOKEN_REFRESHED')   { console.log(event, session) }
 // else if (event === 'USER_UPDATED')      { console.log(event, session) }
  })
  // call unsubscribe to remove the callback
  //  sessionData.subscription.unsubscribe();

  /** Function to do SignIn
   * @param {String} email Valid E-mail address
   * @param {String} password 
   * @returns {error} it will return a error in case if is not possible do the Login
  */
  async function logIn(email, password) {
    if (isAutenticated.value === false) {
      const { data, error } = await supabase.auth.signInWithPassword(
        {
          email: email,
          password: password
        }
      )
    }
    return error;
  }

  /**
   * This Function will signUp In our case register a new User  
   * It will return a error case something happen wrong.
   */
  async function doSignUp(email, pwd) {
    const { data, error } = await supabase.auth.signUp(
      {
        email: email,
        password: pwd,
      }
    );
    return error;
  }
  /**
   * Do the Logout of the User
   */
  async function logOut() {
    await supabase.auth.signOut();
  }

  return { isAutenticated, loginData, logIn, doSignUp, logOut };
})
