<script setup>
import { ref } from 'vue';
import { teamsStore } from '@/stores/teamsStore';
import { countriesStore } from '@/stores/countriesStore';

let teams = teamsStore();
let countries = countriesStore();

// Variables Definition
let countrieID = ref(0);

// Functions Section
/** Getting the Clubs per Countrie
 * @param {Number} id the id selected in DropDown Menu
 */
function getTeams(id) {
    if (parseInt(id) === 0) teams.getAllTeams();
    else teams.getTeams(id);
}

countries.getCountries();
teams.getAllTeams();
</script>

<template>
    <h1>all Teams</h1>
    <select v-model="countrieID" v-on:change="getTeams(countrieID)">
        <option value="0" selected>Select Countrie</option>
        <option v-for="countrie in countries.countrieList" v-bind:value=countrie.id>{{ countrie.name }}</option>
    </select>
    <ul>
        <li v-for="team in teams.teamsList">{{ team.name }}</li>
    </ul>
</template>
