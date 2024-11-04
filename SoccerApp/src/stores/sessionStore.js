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
      // isAutenticated.value = false;
      console.log("Only on start?");
    }
    else if (event === 'SIGNED_IN')  { isAutenticated.value = true; }
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
  }


  async function doSignUp(email, pwd) {
    const { data, error } = await supabase.auth.signUp(
      {
        email: email,
        password: pwd
      }
    )
  }

  async function logOut() {
    await supabase.auth.signOut();
  }

  return { isAutenticated, loginData, logIn, doSignUp, logOut };
})
