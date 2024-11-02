<script setup>
import { sessionStore } from '@/stores/sessionStore';

let session = sessionStore();

</script>
<template>
<form v-on:submit.prevent="session.doSignUp(session.loginData.email, session.loginData.password)">
    <input type="email" placeholder="E-mail" v-model=session.loginData.email required />
    <input type="password" v-model=session.loginData.password required />
    <button type="submit" disabled>Sign Up!</button>
</form>    
</template>