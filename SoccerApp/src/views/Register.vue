<script setup>
import SignUp from '@/components/Forms/SignUp.vue';


</script>

<template>
    <div class="template">
    <h1>Welcome, you wanna Help us as <a href="#AdminForm">Admin</a> of the Page or You are <a href="#ManagerForm">Manager</a> from a Club?</h1>

    <h2>signUp</h2>
    <SignUp />
    
    <h2>I want help as Admin</h2>
    <form id="AdminForm">
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="E-mail Adress" />
        <input type="text" placeholder="Your Motivation" />
        <button type="submit">Send Request</button>
    </form>

    <h2>Register a Club</h2>
    <form id="ManagerForm">
        <button type="submit">Register My Club</button>
    </form>
</div>
</template>

<style scoped>
.template{
    display: flex;
    flex-direction: column;
}
</style>