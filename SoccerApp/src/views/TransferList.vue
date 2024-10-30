<script setup>
import { ref, onMounted } from 'vue';
import { transferStore } from '@/stores/transferStore';
import { teamssStore } from '@/stores/teamsStore';

let transfer = transferStore();
let teams = teamssStore();

transfer.getAllTransfers();
let transferList = ref(transfer.transferList);
const title = "Recent Transfers";
defineEmits([title]);

async function getTeamName(id){
    let teamName = await teams.getTeamName(id).then( t => {
        return t.name
    });
    return teamName;
}

console.log(getTeamName(2));
let originClub;

</script>

<template>
    <h1>Under Construction</h1>
    <ul>
        <li v-for="transfer in transferList">{{ transfer.playerID }} - {{  originClub = getTeamName(transfer.clubOrigin)  }} - {{ getTeamName(transfer.clubDestination) }} - {{ transfer.value }}</li>
    </ul>
</template>