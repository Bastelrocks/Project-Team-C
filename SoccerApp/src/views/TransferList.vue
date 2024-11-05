<script setup>
import { onMounted, ref } from 'vue';
import { transferStore } from '@/stores/transferStore';
import { sessionStore } from '@/stores/sessionStore';
import AddNewTransfer from '@/components/TransferListComponents/AddNewTransfer.vue';
import TransferListBody from '@/components/TransferListComponents/TransferListBody.vue';

let session = sessionStore();
let transfer = transferStore();


// const props = defineProps(){
//     quantityPerSite: number,
//     page: number,

// }

const quantityPerSite = 15;
let page = 1;
let firstTransfer = ref(0), lastTransfer = ref(quantityPerSite - 1);

onMounted(() => {
    transfer.loadTransfers();
}
);

if (transfer.transferList.length > quantityPerSite)
    lastTransfer.value = transfer.transferList.length;
console.log(firstTransfer.value + " " + lastTransfer.value);

function viewTransfer() {
    if (page !== 0) {
        firstTransfer.value = (page - 1) * quantityPerSite;
        lastTransfer.value = (page * quantityPerSite) - 1;
        console.log("Page: " + page + " First Element: " + firstTransfer.value + " Last Element: " + lastTransfer.value);
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
            <tr>
                <td class="no-border" v-if="session.isAutenticated" colspan="6"></td>
                <td class="no-border" v-else colspan="5"></td>
            </tr>



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





            <tr>
                <td class="no-border" v-if="session.isAutenticated" colspan="6"></td>
                <td class="no-border" v-else colspan="5"></td>
            </tr>
        </tbody>
        <tfoot v-if="transfer.transferList.length > quantityPerSite">
            <tr>
                <td class="navPage" v-if="page > 1" v-on:click="viewTransfer(page--)">back</td>
                <td v-else>back</td>

                <td class="no-border" v-if="session.isAutenticated" colspan="4"></td>
                <td class="no-border" v-else colspan="3"></td>

                <td class="navPage" v-if="transfer.transferList.length > (page * quantityPerSite)"
                    v-on:click="viewTransfer(page++)">next</td>
                <td v-else>next</td>
            </tr>
        </tfoot>
    </table>
</template>
<style scoped>
td {
    border: 1px solid black;
    border-radius: 4px;
    text-align: center;
    padding: 3px;
    min-height: 28px;
    min-width: 120px;
    height: auto;
}

td.navPage:hover {
    background-color: green;
    cursor: pointer;
}

table {
    /* border-collapse: collapse; */
    padding: 5px;
    margin: auto;
    margin-top: 10px;
    border: 1px solid black;
    border-radius: 4px;
}

/* tr {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
} */

td.no-border {
    border: 0px;
}
</style>