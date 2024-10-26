import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { supabase } from '@/lib/supabaseClient.js';


//Define the player store

export const usePlayerStore= defineStore('playerStore',()=>{

    //State: Product Array where the items will be stored globally

    const player = ref([]);

async function getPlayers() {
    const { data } = await supabase.from('player').select();
    player.value = data;
}

onMounted(() => {
    getPlayers();

});

return{player,getPlayers};
})