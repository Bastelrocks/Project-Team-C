<script setup>
import { onMounted, ref } from 'vue';
import { transferStore } from '@/stores/transferStore';
import { sessionStore } from '@/stores/sessionStore';
import AddNewTransfer from '@/components/AddNewTransfer.vue';

let session = sessionStore();
let transfer = transferStore();

const quantityPerSite = 15;
let page = 1;
let firstTransfer = ref(0), lastTransfer = ref(quantityPerSite - 1);

onMounted(() => {
    transfer.loadTransfers();
    if (transfer.transferList.length < quantityPerSite)
        lastTransfer.value = transfer.transferList.length;

    });

function viewTransfer(){
    if (page !== 0){
        firstTransfer.value = (page-1)*quantityPerSite;
        lastTransfer.value = (page*quantityPerSite) - 1;
        console.log("Page: " + page)
        console.log("First Element: " + firstTransfer.value);
        console.log("Last Element: " + lastTransfer.value);
    }
}

</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Club origin</th>
                <th>Club Destination</th>
                <th>Transfer Date</th>
                <th>Transfer Value<br />In Millions €</th>
                <th v-if="session.isAutenticated">Actions</th>
            </tr>
        </thead>
        <tbody>
            <AddNewTransfer v-if="session.isAutenticated" />
            <tr v-if="transfer.transferList.length === 0">
                <td colspan="6">No Transfer available</td>
            </tr>
            <tr v-for="transfer in transfer.transferList.slice(firstTransfer.value, lastTransfer.value)" v-bind:key="transfer.id">
                <td>{{ transfer.firstName.firstName + " " + transfer.lastName.lastName }}</td>
                <td>{{ transfer.clubOrigin.name || "loading..." }}</td>
                <td>{{ transfer.clubDestination.name || "loading..." }}</td>
                <td>{{ transfer.transferDate }}</td>
                <td>{{ transfer.marketValue }}M €</td>
                <td v-if="session.isAutenticated">
                    <button>Edit 1</button>
                    <button>Edit 2</button>
                </td>
            </tr>
            <tr v-for="number in (quantityPerSite - transfer.transferList.length)">
                <td colspan="6"></td>
            </tr>
        </tbody>
        <tfoot v-if="transfer.transferList.length > quantityPerSite">
            <tr>
                <td v-if="page > 1" v-on:click="viewTransfer(page--)">back</td>
                <td v-if="page > 1" colspan="3"></td>
                <td v-if="page === 1" colspan="4"></td>
                <td v-on:click="viewTransfer(page++)">next</td>
            </tr>
        </tfoot> 
    </table>
</template>
<style scoped>

input{
    min-width: 150px;
}

table{
    border: 1px solid black;
    border-radius: 4px;
}

td{
    border: 1px solid black;
    border-radius: 4px;
    text-align: center;
    padding: 3px;
    min-height: 28px;
    height: auto;
}

</style>