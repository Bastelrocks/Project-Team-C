<script setup>
import { ref, onMounted } from 'vue';
import { transferStore } from '@/stores/transferStore';
import { teamssStore } from '@/stores/teamsStore';

let transfer = transferStore();
let teams = teamssStore();

transfer.getAllTransfers();
let transferList = ref(transfer.transferList);
const title = ref("Recent Transfers");

let teamNames = ref({}); // Reactive map to store team names by ID

const getTeamName = async (id) => {
    try {
        // Await the Promise to resolve and get the actual value
        const t = await teams.getTeamName(id);
        return t.name;
    } catch (error) {
        console.error('Error fetching team name:', error);
        return null;
    }
};

const populateTeamNames = async () => {
    for (let transfer of transferList.value) {
        if (!teamNames.value[transfer.clubOrigin]) {
            teamNames.value[transfer.clubOrigin] = await getTeamName(transfer.clubOrigin);
        }
        if (!teamNames.value[transfer.clubDestination]) {
            teamNames.value[transfer.clubDestination] = await getTeamName(transfer.clubDestination);
        }
    }
};

onMounted(async () => {
    await populateTeamNames();
});
</script>

<template>
    <h1>{{ title }}</h1>
    <ul>
        <li v-for="transfer in transferList" :key="transfer.uniqueID">
            {{ transfer.playerID }} - 
            {{ teamNames[transfer.clubOrigin] || 'Loading...' }} - 
            {{ teamNames[transfer.clubDestination] || 'Loading...' }} - 
            {{ transfer.value }}
        </li>
    </ul>
</template>