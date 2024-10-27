import { ref } from 'vue';
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

export const countriesStore = defineStore('countriesStore', () => {
    let countrieList = ref([]);
    async function getCountries() {
        const {data} = await supabase.from('countries').select();
        data.forEach(countrie =>{
            countrieList.value.push(countrie);
        })
    }
    return { getCountries, countrieList }
})
