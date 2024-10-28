<script setup>
import { ref } from 'vue';
import { teamssStore } from '@/stores/teamsStore';
import { countriesStore } from '@/stores/countriesStore';

let teams = teamssStore();
let countries = countriesStore();

// Variables Definition
let countrieID = ref(0);
let countrieList = countries.countrieList;
let teamList = teams.teamsList;

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
        <option value=0 selected>Select Countrie</option>
        <option v-for="countrie in countrieList" v-bind:value=countrie.id>{{ countrie.id }} - {{ countrie.name }}</option>
    </select>
    <ul>
        <li v-for="team in teamList">{{ team.name }}</li>
    </ul>
</template>