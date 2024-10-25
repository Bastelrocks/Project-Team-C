<script setup>
import { ref } from 'vue';

let isAutenticated = ref(false);

function login(){
    isAutenticated.value = !isAutenticated.value;
}

</script>

<template>
<form v-if="isAutenticated === false" v-on:submit.prevent="login" class="login">
    <input type="email" placeholder="E-mail" />
    <input type="password" placeholder="Password" />
    <button type="submit">Log me in</button>
</form>
<button v-if="isAutenticated === true" v-on:click="login">Logout</button>
</template>

<style scoped>
.login {
  top: 0;
  right: 0;
  position: fixed;
}
</style>