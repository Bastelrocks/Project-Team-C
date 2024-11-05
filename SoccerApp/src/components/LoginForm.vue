<script setup>
import { ref } from 'vue';
import { sessionStore } from '@/stores/sessionStore';

let session = sessionStore();

</script>

<template>
    <div class="loginForm">
        <form v-if="session.isAutenticated === false"
            v-on:submit.prevent="session.logIn(session.loginData.email, session.loginData.password)">
            <label for="email">E-mail</label>
            <input name="email" type="email" v-model=session.loginData.email placeholder="E-mail" required />
            <label for="password">Password</label>
            <input name="password" type="password" v-model=session.loginData.password placeholder="Password" required />
            <button type="submit">Log me in</button>
        </form>
        <button v-if="session.isAutenticated === true" v-on:click="session.logOut()">Logout</button>
    </div>
</template>

<style scoped>
.loginForm {
    padding: 20px;

    /* To positioning on the right corner */
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid #006800;
    border-bottom-left-radius: 10px;
    background-color: #FFF;
}
.loginForm:hover{
    box-shadow: 0px 0px 10px 5px hsla(160, 100%, 37%, 1);
}

.loginForm input {
    padding: 8px;
    border-radius: 4px;
}

.loginForm button {
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