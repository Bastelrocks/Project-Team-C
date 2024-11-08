<script setup>
import { ref, onMounted } from 'vue';
import { teamsStore } from '@/stores/teamsStore';
import { countriesStore } from '@/stores/countriesStore';
import { playerStore } from '@/stores/playerStore';
import { sessionStore } from '@/stores/sessionStore';
import CreateTeam from '@/components/CreateTeam.vue';

let session = sessionStore();

let teams = teamsStore();
let countries = countriesStore();
let players = playerStore();

let countryID = ref(0);
let countryList = countries.countrieList;
// let teamList = teams.teamsList;
let squadSizes = ref({});

// Load countries and teams initially
onMounted(() => {
    countries.getCountries();
    teams.getAllTeams();
    // teams.teamsList.forEach(team => {
    //     fetchSquadSize(team.idTeam);
    // })
});

// Functions
function getTeams(id) {
  if (parseInt(id) === 0) teams.getAllTeams();
  else teams.getTeams(id);
  squadSizes.value = {}; // Reset squad sizes when loading new teams
}

async function fetchSquadSize(teamId) {
  const size = await players.getPlayersByClub(teamId); // Assuming this returns a number indicating squad size
  squadSizes.value[teamId] = size;
}

</script>

<template>
    <div>
        <CreateTeam v-if="session.isAutenticated"></CreateTeam>
        <p v-else>Log in to create new teams</p>
        
    <div class="selectButton">
        <select v-model="countryID" @change="getTeams(countryID)">
        <option value=0 selected>All Teams</option>
        <option v-for="country in countryList" :value="country.id">Teams in {{ country.name }}</option>
    </select>
    </div>
    <table class="table table-striped table-bordered">
        <thead class="table-dark">
            <tr>
                <th scope="col">Logo</th>
                <th scope="col">Team Name</th>
                <th scope="col">Founded in</th>
                <th scope="col">Squad Size</th>
            </tr>
        </thead>
        <tbody>
        <!-- Loool -->
            <tr v-for="team in teams.teamsList" :key="team.idTeam" @mouseenter="fetchSquadSize(team.idTeam)">
                <td v-if="team.image" style="text-align: center;">
                    <div class="playerImg"><img :src="team.image" class="playerImage"></div>
                </td>
                <td v-else>
                    <div class="playerImg"><img src="@/assets/clublogo2.svg" class="playerImage"></div>
                </td>
                <td>{{ team.name }}</td>
                <td style="text-align: center;">{{ team.foundationYear }}</td>
                <td v-if="squadSizes[team.idTeam] === 0" style="text-align: center;">{{ 0 }}</td>
                <td v-else style="text-align: center;">{{ squadSizes[team.idTeam] || 'Loading...' }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<style scoped>
div{
    margin-left: auto;
    margin-right: auto;
}
p{
    text-align: center;
}
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
