<script setup>

</script>

<template>
    <h1>Welcome, you wanna Help us as <a href="#AdminForm">Admin</a> of the Page or You are <a href="#ManagerForm">Manager</a> from a Club?</h1>
    <br />
    <br />
    <br />
    <br />
    <br />
    <h2>I want help as Admin</h2>
    <form id="AdminForm">
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="E-mail Adress" />
        <input type="text" placeholder="Your Motivation" />
        <button type="submit">Send Request</button>
    </form>

    <br />
    <br />
    <br />
    <br />
    <br />

    <h2></h2>
    <form id="ManagerForm">
        <button type="submit">Register My Club</button>
    </form>

</template>