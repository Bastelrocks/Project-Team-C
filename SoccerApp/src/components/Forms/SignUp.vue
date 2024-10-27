<script setup>
import { supabase } from '@/lib/supabaseClient';

let signUpData = {
    email: "Victor.Martins.1310@gmail.com",
    password: "tesT.hAHa-124"
}

async function doSignUp(){
    const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password
    }
)
console.log(error);
console.log(data);
}

</script>
<template>
<form v-on:submit.prevent=doSignUp>
    <input type="email" placeholder="E-mail" v-model=signUpData.email required />
    <input type="password" v-model=signUpData.password required />
    <button type="submit">Sign Up!</button>
</form>    
</template>