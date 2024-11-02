<script setup>
import { ref, onMounted } from 'vue';
import { transferStore } from '@/stores/transferStore';
import { teamsStore } from '@/stores/teamsStore';
import { sessionStore } from '@/stores/sessionStore';
import { playerStore } from '@/stores/playerStore';

let session = sessionStore();
let transfer = transferStore();
let teams = teamsStore();
let players = playerStore();

/* TODO:
 * Add new Transfer in TransferStore
 * In that don't forget to add the new object in the arrayList
 */

//let today = new Date().toISOString().substring(0,10);
let newTransfer = ref({
    playerID: 0,
    clubOrigin: 0,
    clubDestination: 0,
    transferDate: new Date().toISOString().substring(0,10),
    value: 0
})

teams.getAllTeams();
transfer.loadTransfers();

function getPlayersByClub(clubID){
    players.getPlayersByClub(clubID);
    teams.getTeamsWithout(clubID);
}

function onChangePlayer(playerID){
    let newValue = 0;
    newValue = players.getPlayer(playerID).then(
         pl => {
            newValue = pl.market_value;
            newTransfer.value.value = pl.market_value;
            return newValue;
         }
        )
    }

</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Club origin</th>
                <th>Name</th>
                <th>Club Destination</th>
                <th>Transfer Date</th>
                <th>Value</th>
                <th v-if="session.isAutenticated">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="session.isAutenticated">
                <td>
                    <select v-model="newTransfer.clubOrigin" v-on:change="getPlayersByClub(newTransfer.clubOrigin)">
                        <option value="0">Select Team</option>
                        <option v-for="club in teams.teamsList" v-bind:value="club.idTeam">{{ club.idTeam }} - {{ club.name || "loading..." }}</option>
                    </select>
                </td>
                <td>
                    <select v-if="players.playerList.length === 0" v-model="newTransfer.playerID" disabled>
                        <option value="0" disabled selected>No Players to Select</option>
                    </select>
                    <select v-else v-model="newTransfer.playerID" v-on:change="onChangePlayer(newTransfer.playerID)">
                        <option value="0">Select Player</option>
                        <option v-for="player in players.playerList" v-bind:value="player.id">{{ player.firstName + " " + player.lastName || "loading..." }}</option>
                    </select>
                </td>
                <td>
                    <select v-if="newTransfer.clubOrigin > 0" v-model="newTransfer.clubDestination">
                        <option value="0">Select Team</option>
                        <option v-for="club in teams.teamDestinationList" v-bind:value="club.idTeam">{{ club.name || "loading..." }}</option>
                    </select>

                    <select v-else v-model="newTransfer.clubDestination" disabled>
                        <option value="0" selected>Select Team</option>
                    </select>
                </td>
                <td>
                    <input type="date" v-model="newTransfer.transferDate"/>
                </td>
                <td>
                    <input class="transfervalue" type="number" v-model="newTransfer.value">
                </td>
                <td>
                    <button v-on:click="transfer.addNewTransfer(newTransfer)">add Transfer</button>
                </td>
            </tr>
            <tr v-for="transfer in transfer.transferList" v-bind:key="transfer.id">
                <td>{{ transfer.clubOrigin.name || "loading..." }}</td>
                <td>{{ transfer.firstName.firstName + " " + transfer.lastName.lastName }}</td>
                <td>{{ transfer.clubDestination.name || "loading..." }}</td>
                <td>{{ transfer.transferDate }}</td>
                <td>{{ transfer.value }}</td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped>
input{
    min-width: 150px;
}
.transfervalue {
    min-width: 60px;
    max-width: fit-content;
    field-sizing: content; /*works only on chrome*/
}
</style>