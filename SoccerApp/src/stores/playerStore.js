import { ref  } from 'vue'
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient.js';

export const playerStore = defineStore('playerStore', () => {
    const playerList = ref([]);
    const tableName = "player";

    async function getPlayers() {
        const { data } = await supabase.from(tableName).select();
        data.forEach(player => {
            playerList.value.push(player);
        })
    }

    async function getPlayersByClub(id){
        const { data } = await supabase.from(tableName).select().eq("clubID", id);
        // data.forEach(player => {
        //     playerList.value.push(player);
        // })
        playerList.value = data;
    }
    
    return { getPlayers, getPlayersByClub, playerList };
})