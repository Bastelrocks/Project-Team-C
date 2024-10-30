<script setup>
import { onMounted, ref } from 'vue';
import { transferStore } from '@/stores/transferStore';
import { teamssStore } from '@/stores/teamsStore';
import { sessionStore } from '@/stores/sessionStore';

let transfer = transferStore();
let teams = teamssStore();

let session = sessionStore();
teams.getAllTeams();

/* TODO:
 * Add new Transfer in TransferStore
 * In that don't forget to add the new object in the arrayList
 */

//transfer.getAllTransfers();
/*
onMounted(() => {
    transfer.getAllTransfers();
    //teamList = ref(teams.getAllTeams());
    transferList.forEach(transfer => {
        let clubOriginID = transfer.clubOrigin;
        let clubDestinationID = transfer.clubDestination;
        transfer.clubOrigin = getTeamName(clubOriginID);
        transfer.clubDestination = getTeamName(clubDestinationID)
        console.log(transfer);
     //   teamList.value.push(data);
    })
})
*/

let newTransfer = {
    playerID: 0,
    clubOrigin: 0,
    clubDestination: 0,
    value: 0
}

async function getTeamName(id) {
    return await teams.getTeamName(id)
        .then(({ t }) => { console.log(t); return t; });
}

transfer.loadTransfers();


</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Club origin</th>
                <th>Club Destination</th>
                <th>Value</th>
                <th v-if="session.isAutenticated">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="session.isAutenticated">
                <td>
                    <select v-model="newTransfer.playerID">
                        <option value="0">Select Player</option>
                        <!-- <option v-for="club in teams.teamsList">{{ club.name }}</option> -->
                    </select>
                </td>
                <td>
                    <select v-model="newTransfer.clubOrigin">
                        <option value="0">Select Team</option>
                        <option v-for="club in teams.teamsList">{{ club.name }}</option>
                    </select>
                </td>
                <td>
                    <select  v-model="newTransfer.clubDestination">
                        <option value="0">Select Team</option>
                        <option v-for="club in teams.teamsList">{{ club.name }}</option>
                    </select>
                </td>
                <td>
                    <input type="number"  v-model="newTransfer.value">
                </td>
                <td>
                    <button v-on:click="transfer.addNewTransfer(newTransfer)">add Transfer</button>z
                </td>
            </tr>
            <tr v-for="transfer in transfer.transferList" v-bind:key="transfer.id">
                <td>{{ transfer.firstName.firstName }} {{ transfer.lastName.lastName }}</td>
                <td>{{ transfer.clubOrigin.name || "loading..." }}</td>
                <td>{{ transfer.clubDestination.name || "loading..." }}</td>
                <td>{{ transfer.value }}</td>
            </tr>
        </tbody>
    </table>
</template>