import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { supabase } from '@/lib/supabaseClient.js';

//Define the player store

export const playerStore = defineStore('playerStore', () => {
    const playerList = ref([]);
    let tableName = "player";

    async function getPlayers() {
        const { data, error } = await supabase
            .from(tableName)
            .select(`
                *,
                teams (name)
            `);

        if (error) {
            console.error("Error fetching players:", error);
            return;
        }
        playerList.value = data;
    }

    /**
     * The Function get a Player by his ID in the Database
     * @param {number} id is the id Number of the Player in
     * @returns 
     */
    async function getPlayer(id) {
        const { data } = await supabase.from(tableName).select().eq("id", id);
        return data[0];
    }

    /**
     * It will get/list all Players in determinate Club
     * @param {number} id is the ID from the Club 
     * @returns the size of the Club (in that case the number of team players)
     */
    async function getPlayersByClub(id) {
        const { data } = await supabase.from(tableName).select().eq("clubID", id);
        // data.forEach(player => {
        //     playerList.value.push(player);
        // })
        playerList.value = data;
        // return data.length;
        return playerList.value.length;
    }

    /**
     * This function will set the player 
     * @param {number} id 
     */
    async function setActive(id) {
        console.log("Change Status for player with id", id, "clicked");
        const { error } = await supabase
          .from("player")
          .update({ active: "TRUE" })
          .eq("id", id);
      }
      /**
       * 
       * @param {number} id 
       */
      async function setRetired(id) {
        console.log("Change Status for player with id", id, "clicked");
        const { error } = await supabase
          .from("player")
          .update({ active: "FALSE" })
          .eq("id", id);
      }
    return { getPlayers, getPlayersByClub, getPlayer, playerList, setActive, setRetired };
})