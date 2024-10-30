import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { supabase } from '@/lib/supabaseClient.js';


//Define the player store

export const usePlayerStore= defineStore('playerStore',()=>{

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

// Using Supabase's `.select()` with join

// // const { data, error } = await supabase
// // .from('player')
// // .select(`
// //     *,
// //     teams: idTeam (name)
// // `);

// if (error) {
// console.error("Error fetching players:", error);
// return;
// }

onMounted(() => {
    getPlayers();
});

return{player,getPlayers};
})