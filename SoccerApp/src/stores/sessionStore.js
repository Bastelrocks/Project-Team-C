import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

export const sessionStore = defineStore('sessionStore', () => {
  let isAutenticated = ref(false);

  let loginData = ref(
    {
      email: "",
      password: ""
    });

  /**
   * this function will recognize if exist a session or if someone logged out
   */
  const { sessionData } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'INITIAL_SESSION') { // verifies if exist a session
      if (session) isAutenticated.value = true;
      else isAutenticated.value = false;
    }
    else if (event === 'SIGNED_IN') {
      isAutenticated.value = true;
    }
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
    const { data, error } = await supabase.auth.signInWithPassword(
      {
        email: email,
        password: password
      }
    )
    return error;
  }

  /**
   * This Function will signUp In our case register a new User  
   * It will return a error case something happen wrong.
   */
  async function doSignUp(email, pwd) {
    // console.log("Email: " + email + " Password: " + pwd);
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
