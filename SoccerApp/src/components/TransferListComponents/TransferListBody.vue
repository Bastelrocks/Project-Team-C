<script setup>
import { transferStore } from '@/stores/transferStore';
import { sessionStore } from '@/stores/sessionStore';
let session = sessionStore();
let transfer = transferStore();
</script>
<template>
    <tr v-if="transfer.transferList.length === 0">
        <td colspan="6">No Transfer available</td>
    </tr>
    <tr v-for="(transfer, index) in transfer.transferList.slice(firstTransfer, lastTransfer)" v-bind:key="transfer.id">
        <td>{{ transfer.firstName.firstName + " " + transfer.lastName.lastName }}</td>
        <td>{{ transfer.clubOrigin.name || "loading..." }}</td>
        <td>{{ transfer.clubDestination.name || "loading..." }}</td>
        <td>{{ transfer.transferDate }}</td>
        <td class="marketValue">{{ transfer.marketValue }}M €</td>
        <td v-if="session.isAutenticated">
            <button>Edit 1</button>
            <button>Edit 2</button>
        </td>
    </tr>
</template>
<style scoped>
td.marketValue {
    padding-left: 8px;
    text-align: left;
}
input {
    min-width: 150px;
}
td {
    border: 1px solid black;
    border-radius: 4px;
    text-align: center;
    padding: 3px;
    min-height: 28px;
    min-width: 120px;
    height: auto;
}
</style>
