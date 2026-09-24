<script setup>
import { onMounted, ref } from 'vue';
import { teamsStore } from '@/stores/teamsStore';
import { playerStore } from '@/stores/playerStore';
import { transferStore } from '@/stores/transferStore';

let teams = teamsStore();
let players = playerStore();
let transfer = transferStore();

let newTransfer = ref({
    playerID: 0,
    clubOrigin: 0,
    clubDestination: 0,
    transferDate: new Date().toISOString().substring(0, 10),
    marketValue: 0.25
})

onMounted(() => {
    teams.getAllTeams();
})

/**
 * It will get the players from determinated club. 
 * @param {number} clubID the id that passed selected select menu
 */
function getPlayersByClub(clubID) {
    newTransfer.value.playerID = 0;
    players.getPlayersByClub(clubID);
    teams.getTeamsWithout(clubID);
}

/**
 * This function is destinated only for getting the actual market Value of determinated Player
 * @param playerID the ID of the player
 */
function onChangePlayer(playerID) {
    if (playerID > 0){
        players.getPlayer(playerID).then(
            pl => {
                newTransfer.value.marketValue = pl.market_value;
            }
        )
    }else newTransfer.value.marketValue = 0;
}

/**
 * This will add add a new Transfer
 * Firstly it verify if all fields are filled  
 * In case not it will give a alert message
 * If all fields are filled then it calls the addNewTransfer function where in fact the date will be stored 
 * It will reset all values
 */
function addNewTransfer() {
    if (newTransfer.value.playerID === 0
        && newTransfer.value.clubOrigin === 0
        && newTransfer.value.clubDestination === 0) alert("Error Fill all Fiels");
    else {
        transfer.addNewTransfer(newTransfer.value);
        newTransfer.value =
        {
            playerID: 0,
            clubOrigin: 0,
            clubDestination: 0,
            transferDate: new Date().toISOString().substring(0, 10),
            marketValue: 0.25
        }
    }
}

</script>
<template>
    <tr>
        <td>
            <select v-if="newTransfer.clubOrigin > 0 && players.playerList.length > 0" v-model="newTransfer.playerID" v-on:change="onChangePlayer(newTransfer.playerID)">
                <option :value=0>Select Player</option>
                <option v-for="player in players.playerList" v-bind:value=player.id>{{ player.firstName + " " +
                    player.lastName || "loading..." }}</option>
            </select>
            <select v-else v-model="newTransfer.playerID" disabled>
                <option :value=0 disabled selected>No Players to Select</option>
            </select>
        </td>
        <td>
            <select v-model="newTransfer.clubOrigin" v-on:change="getPlayersByClub(newTransfer.clubOrigin)">
                <option :value=0>Select Team</option>
                <option v-for="club in teams.teamsList" v-bind:value=club.idTeam>{{ club.name || "loading..." }}
                </option>
            </select>
        </td>
        <td>
            <select v-if="newTransfer.playerID > 0 && newTransfer.clubOrigin > 0" v-model="newTransfer.clubDestination">
                <option :value=0>Select Team</option>
                <option v-for="club in teams.teamDestinationList" v-bind:value=club.idTeam>{{ club.name ||
                    "loading..." }}</option>
            </select>
            <select v-else v-model="newTransfer.clubDestination" disabled>
                <option :value=0 selected>No Teams to Select</option>
            </select>
        </td>
        <td>
            <input type="date" v-model="newTransfer.transferDate" />
        </td>
        <td>
            <input class="transfervalue" type="number" min="0.00" step="0.25" v-model="newTransfer.marketValue"> M €
        </td>
    </tr>
    <tr>
        <td colspan="5" style="text-align: center;">
            <button style="padding: 6px" v-on:click="addNewTransfer()">Add this Transfer</button>
        </td>
    </tr>
</template>

<style scoped>
.transfervalue {
    min-width: 60px;
    field-sizing: content;
}

button {
    border: 1px solid black;
    border-radius: 4px;
    text-align: center;
    padding: 3px;
    min-height: 28px;
    min-width: 120px;
    height: auto;
}

button:hover {
    background-color: hsla(160, 100%, 37%, 1);
    cursor: pointer;
}
</style>