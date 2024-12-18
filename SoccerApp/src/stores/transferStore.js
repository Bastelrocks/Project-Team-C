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
            marketValue`).order('transferDate', {ascending: false});
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
        const { data } = await supabase.from("player").update(obj).eq("id", playerID).select();
    }

    /** 
     * @description This function will add a new Transfer in Database  
     * 1 - will insert the data passed by transfer  
     * 2 - Update the player, in this case the field clubID and 
     * @param {object} transferObj Object where the data is stored
     * transferObj:  playerID, clubOrigin, clubDestination, transferDate, marketValue.
     */
    async function addNewTransfer(transferObj) {
        const { data, error } = await supabase.from(tableName).insert(transferObj).select();
        updatePlayer(data[0].playerID, data[0].clubDestination, data[0].marketValue);
        loadTransfers();
    }
    return { transferList, getAllTransfers, loadTransfers, addNewTransfer };
})
