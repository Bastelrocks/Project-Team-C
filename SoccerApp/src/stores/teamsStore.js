import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';

export const teamsStore = defineStore('teamsStore', () => {
    let teamsList = ref([]);
    const tableName = "teams";

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
        const { data } = await supabase.from(tableName).select();
        data.forEach(team => {
            teamsList.value.push(team);
        });
    }

    /** Function that select Teams by countrie
     * @param {number} id Id of the Countrie 
     */
    async function getTeams(id) {
        clearArray();
        const { data } = await supabase.from(tableName).select().eq("countrie_id", id);
        data.forEach(team => {
            teamsList.value.push(team);
        });
    }

    async function getTeamName(id){
        let teamName = "";
        const { data } = await supabase.from(tableName).select("name").eq("idTeam", id);
        data.forEach(team => {
            teamName = team;
        });
        return teamName; /* returns the Object t = t.name */
    }
    
    async function addNewTeam(newTeam){
        const { data, error } = await supabase.from(tableName).insert(newTeam).select();
        console.log(error);
    }

    return { teamsList, getAllTeams, getTeams, getTeamName, addNewTeam };
})
