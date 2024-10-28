import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

/* Maybe at this place we will conect the database */
export const sessionStore = defineStore('sessionStore', () => {
  let isAutenticated = ref(false);

  /* Not Sure if we need this
  const { sessionData } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'INITIAL_SESSION') {
      console.log(event, session)
    } else if (event === 'SIGNED_IN') {
      console.log(event, session)
    } else if (event === 'SIGNED_OUT') {
      console.log(event, session)
    } else if (event === 'PASSWORD_RECOVERY') {
      console.log(event, session)
    } else if (event === 'TOKEN_REFRESHED') {
      console.log(event, session)
    } else if (event === 'USER_UPDATED') {
      console.log(event, session)
    }
  })
  // call unsubscribe to remove the callback
  sessionData.subscription.unsubscribe();
  */

  /** Function to do SignIn
   * @param {String} email Valid E-mail address
   * @param {String} password 
  */
  async function logIn(email, password) {
    console.log(email);
    console.log(password);
    if (isAutenticated.value === false) {
      const { data, error } = await supabase.auth.signInWithPassword(
        {
          email: email,
          password: password
        }
      )
      console.log(data);
      // console.error(error);
    }
    isAutenticated.value = true;
    //console.log(sessionData);
    alert("Under Construction");
  }

  async function logOut() {
    await supabase.auth.signOut();
    isAutenticated.value = false;
  }

  return { isAutenticated, logIn, logOut };
})
