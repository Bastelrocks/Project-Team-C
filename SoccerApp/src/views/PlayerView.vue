<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient.js';
import backgroundImage from '@/assets/soccerfieldverticalgreen.svg'
import { playerStore } from '@/stores/playerStore';
import CreatePlayer from '@/components/CreatePlayer.vue';
import { sessionStore } from '@/stores/sessionStore';
import DeletePlayer from '@/components/DeletePlayer.vue';

let session = sessionStore();
const player=playerStore();

let players = playerStore();

    onMounted(() => {
        players.getPlayers();
    });

    console.log("Array",player.playerList);
</script>

<template>
    <div class="soccerfield">
        <h1>All Players in our Database</h1>
        <CreatePlayer v-if="session.isAutenticated"></CreatePlayer>
        <p v-else>Log in to create new players</p>
        <DeletePlayer v-if="session.isAutenticated"></DeletePlayer>
        <p v-else>Log in to delete players</p>
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
                <tr v-for="item in player.playerList" :key="item.id">
                    <td v-if="item.image" style="text-align: center;" class="tableCell"><div class="playerImg"><img :src="item.image" class="playerImage"></div></td>
                    <td v-else class="tableCell"><div class="playerImg"><img src="@/assets/football-player.svg" class="playerImage"></div></td>
                    <td class="tableCell">{{ item.firstName }} {{ item.lastName }}</td>
                    <td style="text-align: center;" class="tableCell">{{ item.backNumber }}</td>
                    <td class="tableCell">{{ item.position }}</td>
                    <td class="tableCell">{{ item.birthDate }}</td>
                    <td class="tableCell"> {{ item.teams.name }}</td>
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
p{
    text-align: center;
}
h1 {
    text-align: center;
    color: rgb(208, 214, 24);
}
.tablePlayers{
    display:flex;
    justify-content: center;
    color: hsla(160, 100%, 37%, 1);
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
.tableCell{
    border: 1px solid hsla(160, 100%, 37%, 1);;
    padding: 0 5px;
}
</style>