<script setup>
import { ref } from 'vue';
import { teamssStore } from '@/stores/teamsStore';
import { countriesStore } from '@/stores/countriesStore';

let teams = teamssStore();
let countries = countriesStore();

countries.getCountries();
let countrieList = ref(countries.countrieList);
let teamList = ref(teams.teamsList);

let countrieID = ref(0);

function getTeams(id) {
    if (id > 0)
        teams.getTeams(id);
    else
        teams.getTeams()
}

</script>

<template>
    <h1>all Teams</h1>
    <select v-model="countrieID" v-on:change="getTeams(countrieID)">
        <option value=0>Select Countrie</option>
        <option v-for="countrie in countrieList" :value=countrie.id>{{ countrie.id }} - {{ countrie.name }}</option>
    </select>
    <p v-for="team in teamList">{{ team.name }}</p>
</template>