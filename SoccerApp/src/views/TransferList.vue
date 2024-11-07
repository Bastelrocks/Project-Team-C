<script setup>
import { onMounted, ref } from 'vue';
import { transferStore } from '@/stores/transferStore';
import { sessionStore } from '@/stores/sessionStore';
import AddNewTransfer from '@/components/TransferListComponents/AddNewTransfer.vue';

let session = sessionStore();
let transfer = transferStore();

const quantityPerSite = 15;
let page = 1;
let firstTransfer = ref(0), lastTransfer = ref(quantityPerSite - 1);

onMounted(() => {
    transfer.loadTransfers();
}
);

if (transfer.transferList.length > quantityPerSite)
    lastTransfer.value = transfer.transferList.length;

function viewTransfer() {
    if (page !== 0) {
        firstTransfer.value = (page - 1) * quantityPerSite;
        lastTransfer.value = (page * quantityPerSite) - 1;
    }
}

</script>
<template>
    <div>
    <table class="table table-striped table-bordered">
        <thead class="table-dark">
            <tr>
                <th>Name</th>
                <th>Club origin</th>
                <th>Club Destination</th>
                <th>Transfer Date</th>
                <th>Transfer Value<br />In Millions €</th>
            </tr>
        </thead>
        <tbody>
            <AddNewTransfer v-if="session.isAutenticated" />
            <tr>
                <td class="no-border" colspan="5"></td>
            </tr>
            <tr v-if="transfer.transferList.length === 0">
                <td colspan="5">No Transfer available</td>
            </tr>
            <tr v-for="(transfer, index) in transfer.transferList.slice(firstTransfer, lastTransfer)"
                v-bind:key="transfer.id">
                <td>{{ transfer.firstName.firstName + " " + transfer.lastName.lastName }}</td>
                <td>{{ transfer.clubOrigin.name || "loading..." }}</td>
                <td>{{ transfer.clubDestination.name || "loading..." }}</td>
                <td>{{ transfer.transferDate }}</td>
                <td class="marketValue">{{ transfer.marketValue }}M €</td>
            </tr>
            <tr>
                <td class="no-border" v-if="session.isAutenticated" colspan="5"></td>
                <td class="no-border" v-else colspan="5"></td>
            </tr>
        </tbody>
        <tfoot v-if="transfer.transferList.length > quantityPerSite">
            <tr>
                <td class="navPage" v-if="page > 1" v-on:click="viewTransfer(page--)">back</td>
                <td v-else>back</td>

                <td class="no-border" colspan="3"></td>

                <td class="navPage" v-if="transfer.transferList.length > (page * quantityPerSite)"
                    v-on:click="viewTransfer(page++)">next</td>
                <td v-else>next</td>
            </tr>
        </tfoot>
    </table>
    </div>
</template>
<style scoped>
div{
    margin-left: auto;
    margin-right: auto;
}
/* td {
    border: 1px solid black;
    border-radius: 4px;
    text-align: center;
    padding: 3px;
    min-height: 28px;
    min-width: 120px;
    height: auto;
} */

td.navPage:hover {
    background-color: hsla(160, 100%, 37%, 1);
    cursor: pointer;
}

table {
    margin-top: 10vh;
    
}

td.no-border {
    border: 0px;
}

td.marketValue {
    padding-left: 8px;
    text-align: left;
}

input {
    min-width: 150px;
}
</style>