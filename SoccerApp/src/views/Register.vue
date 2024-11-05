<script setup>
import { ref } from 'vue';
import SignUp from '@/components/Forms/SignUp.vue';
import { countriesStore } from '@/stores/countriesStore';
import { teamsStore } from '@/stores/teamsStore';

let adminForm = ref(false);
let managerForm = ref(true);

let countries = countriesStore();
let teams = teamsStore();
countries.getCountries();

let actualYear = new Date().getFullYear();

let newClub = ref(
    {
        name: "",
        foundationYear: actualYear,
        countrie_id: 0
    })

function addManager() {
    teams.addNewTeam(newClub.value);
}

</script>

<template>
    <div class="template">
        <h1>Welcome, you wanna Help us as <a href="#AdminForm"
                v-on:click="adminForm = true; managerForm = false">Admin</a>
            of the Page or You are <a href="#ManagerForm" v-on:click="managerForm = true; adminForm = false">Manager</a>
            from a Club?</h1>

        <h2>signUp Just Club</h2>

        <form id="AdminForm" v-if="adminForm">
            <h2>I want help as Admin</h2>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input type="text" placeholder="First Name" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="text" placeholder="Last Name" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="email" placeholder="E-mail Adress" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="text" placeholder="Your Motivation" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button type="submit">Send Request</button></td>
                    </tr>
                </tbody>
            </table>
            <SignUp />
        </form>

        <form id="ManagerForm" v-if="managerForm" v-on:submit.prevent="addManager()">
            <h2>Register a Club</h2>
            <table>
                <tbody>
                    <tr>
                        <td><label>Countrie: </label></td>
                        <td>
                            <select v-model="newClub.countrie_id" required>
                                <option value="0" selected>Select Countrie</option>
                                <option v-bind:value="countrie.id" v-for="countrie in countries.countrieList">{{
                                    countrie.name }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Club: </label></td>
                        <td>
                            <input type="text" placeholder="Club Name" v-model="newClub.name" required />
                        </td>
                    </tr>
                    <tr>
                        <td>Year: </td>
                        <td>
                            <input class="year" type="number" v-bind:min="actualYear - 250" v-bind:max="actualYear"
                                v-model="newClub.foundationYear" required />
                            <button type="submit">Register My Club</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <SignUp />
        </form>
    </div>
</template>

<style scoped>
.year {
    min-width: 50px;
    max-width: fit-content;
    field-sizing: content;
}

.template {
    display: flex;
    flex-direction: column;
}
</style>