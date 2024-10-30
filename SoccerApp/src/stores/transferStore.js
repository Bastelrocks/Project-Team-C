import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

import { teamssStore } from './teamsStore';

export const transferStore = defineStore('transferStore', () => {
    let transferList = ref([]);
    let teams = teamssStore();

    function clearArray() {
        let arrayLength = transferList.length;
        for (let i = 0; i <= arrayLength; i++) {
            transferList.pop();
        }
    }
    async function getAllTransfers() {
        clearArray();
        const { data } = await supabase.from('transfers').select();
        data.forEach(transfer => {
            transferList.value.push(transfer);
        });
    }
    async function loadTransfers() {
        clearArray();
        const { data, error } = await supabase.from('transfers').select(`
            firstName: player!playerID (firstName),
            lastName: player!playerID (lastName),
            clubOrigin: teams!clubOrigin (name),
            clubDestination: teams!clubDestination (name),
            id,
            transferDate,
            value`);
        if (error) {
            console.log(error);
        }
        data.forEach(t => { transferList.value.push(t) });
        
    }
    return { transferList, getAllTransfers, loadTransfers };
})
