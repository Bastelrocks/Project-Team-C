<script setup>
import { transferStore } from '@/stores/transferStore';
import { teamssStore } from '@/stores/teamsStore';
import { sessionStore } from '@/stores/sessionStore';

let transfer = transferStore();
let teams = teamssStore();

let session = sessionStore();

/* TODO:
 * Add new Transfer in TransferStore
 * In that don't forget to add the new object in the arrayList
 */

let newTransfer = {
    playerID: 0,
    clubOrigin: 0,
    clubDestination: 0,
    value: 0
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