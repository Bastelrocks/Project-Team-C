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
                let obj = transferList.value.pop();
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
            value`);
        if (error) {
            console.error(error);
        }
        data.forEach(t => { transferList.value.push(t) });
        
    }

    async function updatePlayer(playerID, clubID, value){
        const { data } = await supabase.from(tableName).update(
            {
                clubID: clubID,
                value: value
            }
        ).eq("playerID", playerID).select();
    }

    async function getTransfer(id){
        const { data } = await supabase.from(tableName).select(`
            firstName: player!playerID (firstName),
            lastName: player!playerID (lastName),
            clubOrigin: teams!clubOrigin (name),
            clubDestination: teams!clubDestination (name),
            id,
            transferDate,
            value`).eq("id", id);
        //;
        data.forEach(transfer => {
            transferList.value.push(transfer);
        })
    }
    async function addNewTransfer(transferObj){
        const { data, error } = await supabase.from(tableName).insert(transferObj).select();
        data.forEach(transfer => {
            getTransfer(transfer.id);
        })
       // console.log(data.id);
        //await getTransfer(data.id);
        // updatePlayer(data.id, data.clubDestination, data.value);
        // transferList.value.push(data);
    }
    return { transferList, getAllTransfers, loadTransfers, addNewTransfer };
})
