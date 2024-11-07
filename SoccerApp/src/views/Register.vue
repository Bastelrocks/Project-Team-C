<script setup>
import { ref } from 'vue';
import { sessionStore } from '@/stores/sessionStore';
import { countriesStore } from '@/stores/countriesStore';
import { teamsStore } from '@/stores/teamsStore';

let session = sessionStore();
let countries = countriesStore();

countries.getCountries();

const registeredSucessfull = ref(false);
let actualYear = new Date().getFullYear();

let newClub = ref(
    {
        name: "",
        foundationYear: actualYear,
        countrie_id: 0,
        full_name: "Victor F Martins",
    }
)

function addManager() {
    if (newClub.value.countrie_id === 0) alert("Please Select a Countrie");
    else{
        if(!session.doSignUp(session.loginData.email, session.loginData.password))
            alert("Something happen wrong");

        let teams = teamsStore();
        teams.addNewTeam(newClub.value);
        registeredSucessfull.value = true;
    }
}

</script>

<template>
    <div class="template">
        <h1>Welcome, Are You Manager from a club?</h1>
        <h2>Register here your Club</h2>

        <form id="ManagerForm" v-on:submit.prevent="addManager()">
            <table>
                <tbody>
                    <tr>
                        <td><label for="countrie">Countrie: </label></td>
                        <td>
                            <select id="countrie" v-model="newClub.countrie_id" required>
                                <option value=0 selected>Select Countrie</option>
                                <option v-bind:value="countrie.id" v-for="countrie in countries.countrieList">
                                    {{ countrie.name }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="club">Club: </label></td>
                        <td>
                            <input id="club" type="text" placeholder="Club Name" v-model="newClub.name" required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="foundationYear">Foundation: </label>
                        </td>
                        <td>
                            <input id="foundationYear" class="year" type="number" v-bind:min="actualYear - 250"
                                v-bind:max="actualYear" v-model="newClub.foundationYear" required />
                        </td>
                    </tr>
                    <tr>
                        <td><label for="email">Email: </label></td>
                        <td>
                            <input id="email" type="email" placeholder="E-mail" v-model=session.loginData.email
                                required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="password">Password: </label>
                        </td>
                        <td>
                            <input id="password" type="password" v-model=session.loginData.password required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="fullName">Full Name: </label>
                        </td>
                        <td>
                            <input id="fullName" type="text" v-model="newClub.full_name" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;">
                            <button type="submit">Sign Up!</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot v-if="registeredSucessfull">
                    <tr>
                        <td colspan="2">You Registered your team Sucessfull</td>
                    </tr>
                </tfoot>
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

form {
    margin: auto;
}

tfoot tr td{
    color: hsla(160, 100%, 37%, 1);
}
</style>