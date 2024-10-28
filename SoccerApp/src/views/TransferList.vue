<script setup>
import { ref } from 'vue';
import { transferStore } from '@/stores/transferStore';

let transfer = transferStore();

transfer.getAllTransfers();
let transferList =ref(transfer.transferList);
const title = "Recent Transfers";
defineEmits([title]);


</script>

<template>
    <h1>Under Construction</h1>
    <ul>
        <li v-for="transfer in transferList">{{ transfer.playerID }} - {{ transfer.clubOrigin }} - {{ transfer.clubDestination }}</li>
    </ul>
</template>