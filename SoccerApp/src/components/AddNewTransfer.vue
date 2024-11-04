<script setup>
import { ref } from 'vue';
import { teamsStore } from '@/stores/teamsStore';
import { playerStore } from '@/stores/playerStore';
import { transferStore } from '@/stores/transferStore';

let teams = teamsStore();
let players = playerStore();
let transfer = transferStore();

//let today = new Date().toISOString().substring(0,10);
let newTransfer = ref({
    playerID: 0,
    clubOrigin: 0,
    clubDestination: 0,
    transferDate: new Date().toISOString().substring(0, 10),
    marketValue: 0.25
})

teams.getAllTeams();

function getPlayersByClub(clubID) {
    players.getPlayersByClub(clubID);
    teams.getTeamsWithout(clubID);
}

function onChangePlayer(playerID) {
    players.getPlayer(playerID).then(
        pl => {
            newTransfer.value.marketValue = pl.market_value;
        }
    )
}

function addNewTransfer(){
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
            <select v-if="players.playerList.length === 0" v-model="newTransfer.playerID" disabled>
                <option value="0" disabled selected>No Players to Select</option>
            </select>
            <select v-else v-model="newTransfer.playerID" v-on:change="onChangePlayer(newTransfer.playerID)">
                <option value="0">Select Player</option>
                <option v-for="player in players.playerList" v-bind:value="player.id">{{ player.firstName + " " +
                    player.lastName || "loading..." }}</option>
            </select>
        </td>
        <td>
            <select v-model="newTransfer.clubOrigin" v-on:change="getPlayersByClub(newTransfer.clubOrigin)">
                <option value="0">Select Team</option>
                <option v-for="club in teams.teamsList" v-bind:value="club.idTeam">{{ club.name || "loading..." }}
                </option>
            </select>
        </td>
        <td>
            <select v-if="newTransfer.clubOrigin > 0" v-model="newTransfer.clubDestination">
                <option value="0">Select Team</option>
                <option v-for="club in teams.teamDestinationList" v-bind:value="club.idTeam">{{ club.name ||
                    "loading..." }}</option>
            </select>

            <select v-else v-model="newTransfer.clubDestination" disabled>
                <option value="0" selected>Select Team</option>
            </select>
        </td>
        <td>
            <input type="date" v-model="newTransfer.transferDate" />
        </td>
        <td>
            <input class="transfervalue" type="number" min="0.00" step="0.25" v-model="newTransfer.marketValue"> M €
        </td>
        <td>
            <button v-on:click="addNewTransfer()">add Transfer</button>
        </td>
    </tr>
</template>

<style scoped>
.transfervalue {
    min-width: 60px;
    /* max-width: fit-content; */
    field-sizing: content;
    /*works only on chrome*/
}
</style>