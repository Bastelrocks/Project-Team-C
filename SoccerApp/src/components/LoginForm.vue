<script setup>
import { ref } from 'vue';

let isAutenticated = ref(false);

function login(){
    isAutenticated.value = !isAutenticated.value;
    alert("Under Construction");
}
let loginData = {
    email: "",
    password: ""
}

// loginData.email = "Dump@Email";
// loginData.password = "badPassword";

</script>

<template>
    <div class="login">
        <form v-if="isAutenticated === false" v-on:submit.prevent="login">
            <input type="email" v-model=loginData.email placeholder="E-mail" required />
            <input type="password" v-model=loginData.password placeholder="Password" required />
            <button type="submit">Log me in</button>
        </form>
        <button v-if="isAutenticated === true" v-on:click="login">Logout</button>
    </div>
</template>
<style scoped>
.form {
    padding: 5px;
}
</style>