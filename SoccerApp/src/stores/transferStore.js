import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

export const transferStore = defineStore('transferStore', () => {
    let transferList = ref([]);
    const tableName = 'transfers';

    function clearArray() {
        let arrayLength = transferList.value.length;
        if (arrayLength > 0)
            for (let i = 0; i <= arrayLength; i++) {
                transferList.value.pop();
            }
    }

    async function getAllTransfers() {
        clearArray();
        const { data } = await supabase.from(tableName).select();
        data.forEach(transfer => {
            transferList.value.push(transfer);
        });
    }

    async function loadTransfers() {
        clearArray();
        const { data, error } = await supabase.from(tableName).select(`
            firstName: player!playerID (firstName),
            lastName: player!playerID (lastName),
            clubOrigin: teams!clubOrigin (name),
            clubDestination: teams!clubDestination (name),
            id,
            transferDate,
            marketValue`);
        if (error) {
            console.error(error);
        }
        data.forEach(transferItem => { transferList.value.push(transferItem) });
    }

    async function updatePlayer(playerID, clubID, value) {
        let obj = {
            clubID: clubID,
            market_value: value
        };
        console.log("playerID: " + playerID + " clubID: ", clubID + " marketValue: " + value + "M€");
        const { data } = await supabase.from("player").update(obj).eq("id", playerID).select();
        console.table(data);
    }

    async function getTransfer(id) {
        const { data } = await supabase.from(tableName).select(`
            firstName: player!playerID (firstName),
            lastName: player!playerID (lastName),
            clubOrigin: teams!clubOrigin (name),
            clubDestination: teams!clubDestination (name),
            id,
            transferDate,
            marketValue`).eq("id", id);
        data.forEach(transfer => {
            console.table(transfer);
            transferList.value.push(transfer);
        })
    }

    async function addNewTransfer(transferObj) {
        // console.table(transferObj);
        const { data, error } = await supabase.from(tableName).insert(transferObj).select();
        updatePlayer(data[0].playerID, data[0].clubDestination, data[0].marketValue);
        transferList.value.push(data);
    }
    return { transferList, getAllTransfers, loadTransfers, addNewTransfer };
})
