import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { supabase } from '@/lib/supabaseClient.js';


//Define the player store

export const usePlayerStore = defineStore('playerStore', () => {

    //State: Product Array where the items will be stored globally

    const player = ref([]);

    async function getPlayers() {
        const { data, error } = await supabase
            .from('player')
            .select(`
                *,
                teams (name)
            `);

        if (error) {
            console.error("Error fetching players:", error);
            return;
        }
        player.value = data;
    }

    onMounted(() => {
        getPlayers();
    });

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