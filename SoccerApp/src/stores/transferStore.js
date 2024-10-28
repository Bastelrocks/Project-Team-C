import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

export const transferStore = defineStore('transferStore', () => {
    let transferList = ref([]);

    function clearArray() {
        let arrayLength = transferList.length;
        for (let i = 0; i <= arrayLength; i++) {
            transferList.pop();
        }
    }
    async function getAllTransfers() {
        clearArray();
        const { data } = await supabase.from('transfer').select();
        data.forEach(transfer => {
            transferList.value.push(transfer);
        })
    }
    return { transferList, getAllTransfers };
})
