import { ref } from 'vue';
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

export const countriesStore = defineStore('countriesStore', () => {
    let countrieList = ref([]);
    const tableName = "countries";

    /**
     * This function will clear the countrieList Array.  
     * That array need to be ref for changes be visible in the website
     */
    function clearArray() {
        if (countrieList.value.length > 0)
            for (let i = 0; i <= arrayLength; i++)
                countrieList.value.pop();
    }

    /**
     * this function will upload all Countries that exist in the Database into a array  
     * We ensure that the array is empty (for not repeating countries) with the function clearArray
     * 
     */
    async function getCountries() {
        clearArray();
        const { data } = await supabase.from(tableName).select();
        data.forEach(countrie =>{
            countrieList.value.push(countrie);
        })
    }
    return { getCountries, countrieList };
})
