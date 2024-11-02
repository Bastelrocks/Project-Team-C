import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { supabase } from '@/lib/supabaseClient.js';

//Define the player store

export const playerStore = defineStore('playerStore', () => {

    //State: Product Array where the items will be stored globally

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

    async function getPlayer(id) {
        const { data } = await supabase.from(tableName).select().eq("id", id);
        return data[0];
    }

    async function getPlayersByClub(id) {
        const { data } = await supabase.from(tableName).select().eq("clubID", id);
        // data.forEach(player => {
        //     playerList.value.push(player);
        // })
        playerList.value = data;
    }
    return { getPlayers, getPlayersByClub, getPlayer, playerList };
})