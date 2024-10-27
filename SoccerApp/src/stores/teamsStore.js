import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

export const teamssStore = defineStore('teamssStore', () => {
    function clearArray() {
        let arrayLength = teamsList.value.length;
        for (let i = 0; i <= arrayLength; i++) {
            teamsList.value.pop();
        }
    }

    let teamsList = ref([]);
    /** Get All teams
     * 
     */
    async function getTeams() {
        clearArray();
        const { data } = await supabase.from('teams').select().eq("countrie_id", id);
        if (data.length > 0)
            data.forEach(team => {
                teamsList.value.push(team);
            })
    }

    /** Function that select Teams by countrie
     * @param {number} id Id of the Countrie 
     */
    async function getTeams(id) {
        clearArray();
        const { data } = await supabase.from('teams').select().eq("countrie_id", id);
        if (data.length > 0)
            data.forEach(team => {
                teamsList.value.push(team);
            })
        // return await supabase.from('teams').select().eq("countrie_id", id);
    }
    return { getTeams, teamsList }
})
