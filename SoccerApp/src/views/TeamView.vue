<script setup>
import { ref } from 'vue';
import { teamssStore } from '@/stores/teamsStore';
import { countriesStore } from '@/stores/countriesStore';

let teams = teamssStore();
let countries = countriesStore();

countries.getCountries();
let countryList = ref(countries.countrieList);
let teamList = ref(teams.teamsList);

let countryID = ref(0);

function getTeams(id){
    teams.getTeams(id);
    console.log(teamList.value);
}

</script>

<template>
    <div><h1>all Teams in our Database</h1>
    <select v-model="countryID" v-on:change="getTeams(countryID)">
        <option value=0>Select Country</option>
        <option v-for="country in countryList" :value=country.id>{{ country.id }} - {{ country.name }}</option>
    </select>
    <div class="tablePlayers">
        <table>
            <thead class="tablehead">
                <tr>
                    <th>Logo</th>
                    <th>Team Name</th>
                    <th>Founded in</th>
                    <th></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in teamList" :key="item.id">
                    <td class="tableCell"></td>
                    <td class="tableCell">{{ item.name }}</td>
                    <td style="text-align: center;" class="tableCell">{{ item.foundationYear }}</td>
                    <td class="tableCell"> Link to players of team</td>
                    
                </tr>
            </tbody>

        </table>
        </div>
    </div>
</template>

<style scoped>
h1,select{
    text-align: center;
}
.tablePlayers{
    display:flex;
    justify-content: center;
    color: black;
}
.tablehead{
    font-size: 1.4em;
    text-decoration: underline;
    font-weight: bold;
}
.playerImage{
    width:30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.playerImg{
    display: flex;
    justify-content: center;
}
.tableCell{
    border: 1px solid black;
    padding: 0 5px;
}
</style>