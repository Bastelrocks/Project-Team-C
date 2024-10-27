import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

export const teamssStore = defineStore('teamssStore', () => {
    let teamsList = ref([]);
    /** Get All teams
     * 
     */
    function clearArray(){
        console.log("Before " + teamsList.value.length);
        for (let i = 0; i <= teamsList.value.length; i++){
            teamsList.value.pop();
            console.log(teamsList.value.length);
        }
    }
    async function getTeams() {
        const { data } = await supabase.from('teams').select();
        // return data;
        // return await supabase.from('teams').select();
    }
    /** Function that select Teams by countrie
     * @param {number} id Id of the Countrie 
     */
    async function getTeams(id) {
        const { data } = await supabase.from('teams').select().eq("countrie_id", id);
        clearArray();
        data.forEach(team => {
            teamsList.value.push(team);
        })
        // return await supabase.from('teams').select().eq("countrie_id", id);
    }
    return { getTeams, teamsList }
})
