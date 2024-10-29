<script setup>
import { ref } from 'vue';
import { transferStore } from '@/stores/transferStore';
import { teamssStore } from '@/stores/teamsStore';

let transfer = transferStore();
let teams = teamssStore();

transfer.getAllTransfers();
let transferList = ref(transfer.transferList);
const title = "Recent Transfers";
defineEmits([title]);

function getTeamName(id){
    let teamName = "";
    teamName = teams.getTeamName(id).then( t => {
        console.log("T: " + t);
        console.log("T.Name: " + t.name);
        return t;
    });
    console.log(teamName);
    return teamName;
}


</script>

<template>
    <h1>Under Construction</h1>
    <ul>
        <li v-for="transfer in transferList">{{ transfer.playerID }} - {{ getTeamName(transfer.clubOrigin) }} - {{ getTeamName(transfer.clubDestination) }} - {{ transfer.value }}</li>
    </ul>
</template>