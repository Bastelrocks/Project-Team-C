import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient';

export const teamssStore = defineStore('teamssStore', () => {
    let teamsList = ref([]);

    function clearArray() {
        let arrayLength = teamsList.value.length;
        if (arrayLength > 0)
            for (let i = 0; i <= arrayLength; i++) {
                teamsList.value.pop();
            }
    }

    /** Get All teams
     * 
     */
    async function getAllTeams() {
        clearArray();
        const { data } = await supabase.from('teams').select();
        data.forEach(team => {
            teamsList.value.push(team);
        });
    }

    /** Function that select Teams by countrie
     * @param {number} id Id of the Countrie 
     */
    async function getTeams(id) {
        clearArray();
        const { data } = await supabase.from('teams').select().eq("countrie_id", id);
        data.forEach(team => {
            teamsList.value.push(team);
        });
    }

    async function getTeamName(id){
        let teamName = ""
        const { data } = await supabase.from('teams').select("name").eq("idTeam", id);
        data.forEach(team => {
            teamName = team;
        });
        return teamName;
    }


    return { teamsList, getAllTeams, getTeams, getTeamName };
})
