import { ref } from 'vue';
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

export const countriesStore = defineStore('countriesStore', () => {
    let countrieList = ref([]);
    function clearArray() {
        let arrayLength = countrieList.value.length;
        for (let i = 0; i <= arrayLength; i++) {
            countrieList.value.pop();
        }
    }
    async function getCountries() {
        clearArray();
        const { data } = await supabase.from('countries').select();
        data.forEach(countrie =>{
            countrieList.value.push(countrie);
        })
    }
    return { getCountries, countrieList };
})
