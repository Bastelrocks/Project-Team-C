import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';

export const teamsStore = defineStore('teamsStore', () => {
    let teamsList = ref([]);
    const tableName = "teams";

    let teamDestinationList = ref([]);

    function clearArrays() {
        let arrayLength = teamsList.value.length;
        if (arrayLength > 0)
            for (let i = 0; i <= arrayLength; i++) {
                teamsList.value.pop();
            }
        arrayLength = teamDestinationList.value.length;
        if (arrayLength > 0)
            for (let i = 0; i <= arrayLength; i++) {
                teamDestinationList.value.pop();
            }
    }

    /** 
     * @description It will put all Teams in the TeamList array  
     * In first step it will clear the array teamList   
     * it will call the select function from Supabase with all fields from the "teams" Table.  
     * the pretended data will be puted in the teamList array
     */
    async function getAllTeams() {
        clearArrays();
        const { data } = await supabase.from(tableName).select();
        data.forEach(team => {
            teamsList.value.push(team);
        });
    }

    /** Function that select Teams by countrie
     * @param {number} id Id of the Countrie 
     */
    async function getTeams(coutryID) {
        clearArrays();
        const { data } = await supabase.from(tableName).select().eq("countrie_id", coutryID);
        data.forEach(team => {
            teamsList.value.push(team);
        });
    }

    async function getTeamsWithout(teamID) {
        let arrayLength = teamDestinationList.value.length;
        if (arrayLength > 0)
            for (let i = 0; i <= arrayLength; i++) {
                teamDestinationList.value.pop();
            }
        
        const { data } = await supabase.from(tableName).select();
        data.forEach(team => {
            if (team.idTeam !== teamID) {
                teamDestinationList.value.push(team);
            }
        });
    }

    async function getTeamName(id) {
        let teamName = "";
        const { data } = await supabase.from(tableName).select("name").eq("idTeam", id);
        data.forEach(team => {
            teamName = team;
        });
        return teamName; /* returns the Object t = t.name */
    }

    /**
     * 
     * @param {object} newTeam 
     */
    async function addNewTeam(newTeam) {
        const { data, error } = await supabase.from(tableName).insert(newTeam).select();
        await getAllTeams(); // Re-fetch the teams to refresh the list
    }

    async function addTeam(newTeam){
        const { error } = await supabase
     .from('teams')
     .insert({ name: newTeam.name, foundationYear: newTeam.foundationYear, countrie_id: newTeam.countrie_id })
     alert('The new team '+newTeam.name+' has been added to the database.')
     await getAllTeams(); // Re-fetch the teams to refresh the list
 }

    return { teamsList, teamDestinationList, getAllTeams, getTeams, getTeamName, addNewTeam, getTeamsWithout, addTeam };
})
