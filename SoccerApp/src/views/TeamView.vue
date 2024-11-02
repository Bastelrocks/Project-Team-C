<script setup>
import { ref } from 'vue';
import { teamsStore } from '@/stores/teamsStore';
import { countriesStore } from '@/stores/countriesStore';

let teams = teamsStore();
let countries = countriesStore();

// Variables Definition
let countryID = ref(0);
let countryList = countries.countrieList;
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
    <div>
    <div class="selectButton">
        <select v-model="countryID" v-on:change="getTeams(countryID)">
        <option value=0 selected>All Teams</option>
        <option v-for="country in countryList" v-bind:value=country.id>Teams in {{ country.name }}</option>
    </select>
    </div>
    <table>
            <thead class="tablehead">
                <tr>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Founded in</th>
                    <th>Link to Players</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="team in teamList">
                    <td v-if="team.image" style="text-align: center;" class="tableCell"><div class="playerImg"><img :src="item.image" class="playerImage"></div></td>
                    <td v-else class="tableCell"><div class="playerImg"><img src="@/assets/football-player.svg" class="playerImage"></div></td>
                    <td class="tableCell">{{ team.name }}</td>
                    <td style="text-align: center;" class="tableCell">{{ team.foundationYear }}</td>
                    <td class="tableCell"></td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<style scoped>
table{
    min-width: 500px;
}
h1 {
    text-align: center;
    color: rgb(208, 214, 24);
}
.tablePlayers{
    display:flex;
    justify-content: center;
    color: hsla(160, 100%, 37%, 1);
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
    border: 1px solid hsla(160, 100%, 37%, 1);;
    padding: 0 5px;
}
select
{
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  accent-color: brown;
  width: 400px;
 
} 
.selectButton{
    display: flex;
    justify-content: center;
}
</style>
