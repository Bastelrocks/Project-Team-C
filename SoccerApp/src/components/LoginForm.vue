<script setup>
import { ref } from 'vue';

let isAutenticated = ref(false);

function login(){
    isAutenticated.value = !isAutenticated.value;
}
let loginData = {
    email = "",
    password = ""
}

</script>

<template>
<form v-if="isAutenticated === false" v-on:submit.prevent="login">
    <input type="email" v-model=loginData.email placeholder="E-mail" />
    <input type="password" v-model=loginData.password placeholder="Password" />
    <button type="submit">Log me in</button>
</form>
<button v-if="isAutenticated === true" v-on:click="login">Logout</button>
</template>
<style scoped>
form {
    padding: 5px;
}
</style>