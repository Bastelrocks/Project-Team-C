<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'
import backgroundImage from '@/assets/soccerfieldverticalgreen.svg'
const player = ref([])

async function getPlayers() {
    const { data } = await supabase.from('player').select()
    player.value = data
}

onMounted(() => {
    getPlayers()
})
console.log(player)

</script>

<template>
    <div class="soccerfield" :style="{ backgroundImage: `url(${backgroundImage})` }">
        <h1>All Players in our Database</h1>

        <ul>
            <li v-for="item in player" :key="item.id" >{{ item.lastName }}</li>
        </ul>

    </div>


</template>

<style scoped>
.soccerfield {
    background-size: cover;
    background-color: green;

}

h1 {
    text-align: center;
    color: rgb(208, 214, 24);
}
</style>