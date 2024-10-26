<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';

let isAutenticated = ref(false);
let loginData = {
    email: "",
    password: ""
};

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
// sessionData.subscription.unsubscribe();

loginData.email = "victor.martins.1310@hotmail.com";
loginData.password = "badPassword.1234";


/** Funktion zum Einloggen
 * @param {String} email 
 * @param {number} password 
*/
async function logIn(email, password){
    if (isAutenticated.value === false){
        const {data, error} = await supabase.auth.signInWithPassword(
            {
                email: loginData.email,
                password: loginData.password
            }
        )
        console.log(data);
        // console.error(error);
    }
    isAutenticated.value = true;
    console.log(sessionData);
    alert("Under Construction");
}

async function logOut(){
    await supabase.auth.signOut();
    isAutenticated.value = false;
}

</script>

<template>
    <div class="loginForm">
        <form v-if="isAutenticated === false" v-on:submit.prevent="logIn">
            <input type="email" v-model=loginData.email placeholder="E-mail" required />
            <input type="password" v-model=loginData.password placeholder="Password" required />
            <button type="submit">Log me in</button>
        </form>
        <button v-if="isAutenticated === true" v-on:click="logOut">Logout</button>
    </div>
</template>
<style scoped>
.loginForm {
    padding: 8px;
    gap: 20px; /* Not Working */

    /* To positioning on the right corner */
    position: absolute;
    right: 10px;
    top: 10px;
    border: 1px solid #006800;
}

.loginForm input{
    padding: 8px;
    border-radius: 4px;
}

.loginForm button{
    padding: 8px 16px;
    background-color: #008000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.loginForm button:hover {
    background-color: #006800;
  }
</style>