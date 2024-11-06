<script setup>
import { ref } from 'vue';
import { sessionStore } from '@/stores/sessionStore';
import { countriesStore } from '@/stores/countriesStore';
import { teamsStore } from '@/stores/teamsStore';

let session = sessionStore();
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

let profileData = ref(
    {
        full_name: "Victor F Martins",
    }
)

function addManager() {
    console.table(newClub.value);
    console.table(profileData.value);
    if (newClub.value.countrie_id === 0) alert("Please Select a Countrie")
    //teams.addNewTeam(newClub.value);
}

</script>

<template>
    <div class="template">
        <h1>Welcome, you wanna Help us as <a href="#AdminForm"
                v-on:click="adminForm = true; managerForm = false">Admin</a>
            of the Page or You are <a href="#ManagerForm" v-on:click="managerForm = true; adminForm = false">Manager</a>
            from a Club?</h1>

        <h2>signUp Just Club</h2>
        <form id="ManagerForm" v-on:submit.prevent="addManager()">
            <h2>Register a Club</h2>
            <table>
                <tbody>
                    <tr>
                        <td><label for="countrie">Countrie: </label></td>
                        <td>
                            <select name="countrie" v-model="newClub.countrie_id" required>
                                <option value=0 selected>Select Countrie</option>
                                <option v-bind:value="countrie.id" v-for="countrie in countries.countrieList">
                                    {{ countrie.name }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="club">Club: </label></td>
                        <td>
                            <input name="club" type="text" placeholder="Club Name" v-model="newClub.name" required />
                        </td>
                    </tr>
                    <tr>
                        <td><label for="foundationYear">Year: </label></td>
                        <td>
                            <input name="foundationYear" class="year" type="number" v-bind:min="actualYear - 250" v-bind:max="actualYear"
                                v-model="newClub.foundationYear" required />
                        </td>
                    </tr>
                    <tr><td>
                        <label for="email">Email: </label>
                        <input name="email" type="email" placeholder="E-mail" v-model=session.loginData.email required />
                        <label for="password">Password: </label>
                        <input name="password" type="password" v-model=session.loginData.password required />
                        <label for="fullName">Full Name: </label>
                        <input name="fullName" type="text" v-model="profileData.full_name" />
                        <button type="submit">Sign Up!</button>
                        </td>
                    </tr>
                </tbody>
            </table>
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