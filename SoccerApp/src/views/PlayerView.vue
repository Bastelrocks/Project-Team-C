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
    <div class="soccerfield">
        <h1>All Players in our Database</h1>
        <div class="tablePlayers">
        <table>
            <thead class="tablehead">
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Back Number</th>
                    <th>Position</th>
                    <th>Born</th>
                    <th>Team</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in player" :key="item.id">
                    <td v-if="item.image" style="text-align: center;"><div class="playerImg"><img :src="item.image" class="playerImage"></div></td>
                    <td v-else><div class="playerImg"><img src="@/assets/football-player.svg" class="playerImage"></div></td>
                    <td>{{ item.firstName }} {{ item.lastName }}</td>
                    <td style="text-align: center;">{{ item.backNumber }}</td>
                    <td>{{ item.position }}</td>
                    <td>{{ item.birthDate }}</td>
                    <td></td>
                </tr>
            </tbody>

        </table>
        </div>
        
    </div>


</template>

<style scoped>
/* .soccerfield {
    background-size:auto;
    background-color: green;
    background-repeat: repeat;

} */

h1 {
    text-align: center;
    color: rgb(208, 214, 24);
}
.tablePlayers{
    display:flex;
    justify-content: center;
    color: white;
}
.tablehead{
    font-size: 1.4em;
    text-decoration: underline;
    font-weight: bold;
}
.playerImage{
    width:30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.playerImg{
    display: flex;
    justify-content: center;
}
</style>