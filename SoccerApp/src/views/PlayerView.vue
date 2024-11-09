<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient.js";
import backgroundImage from "@/assets/soccerfieldverticalgreen.svg";
import { playerStore } from "@/stores/playerStore";
import CreatePlayer from "@/components/CreatePlayer.vue";
import { sessionStore } from "@/stores/sessionStore";
import DeletePlayer from "@/components/DeletePlayer.vue";

let session = sessionStore();
const player = playerStore();

const quantityPerSite = ref(15);
let page = 1;
let firstPlayer = ref(0), lastPlayer = ref(quantityPerSite.value);


function maxPages() {
  return parseInt(player.playerList.length / quantityPerSite.value) + 1;
}

if (player.playerList.length > quantityPerSite)
  lastPlayer.value = player.playerList.length;

onMounted(() => {
  player.getPlayers();
});

function viewPlayer() {
  if (page !== 0) {
    firstPlayer.value = (page - 1) * quantityPerSite.value;
    lastPlayer.value = (page * quantityPerSite.value);
  }
}
function onchangeQuant() {
  firstPlayer.value = (page - 1) * quantityPerSite.value;
  if (player.playerList.length > quantityPerSite)
    lastPlayer.value = player.playerList.length;
  lastPlayer.value = (page * quantityPerSite.value);
}

</script>

<template>
  <div class="soccerfield">
    <h1>All Players in our Database</h1>
    <CreatePlayer v-if="session.isAutenticated"></CreatePlayer>
    <p v-else>Log in to create new players</p>
    <DeletePlayer v-if="session.isAutenticated"></DeletePlayer>
    <p v-else>Log in to delete players</p>
    <div class="tablePlayers">
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Back Number</th>
            <th>Position</th>
            <th>Born</th>
            <th>Team</th>
            <th>Active</th>
            <th v-if="session.isAutenticated">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in player.playerList.slice(firstPlayer, lastPlayer)" :key="item.id">
            <td v-if="item.image" style="text-align: center">
              <div class="playerImg">
                <img :src="item.image" class="playerImage" />
              </div>
            </td>
            <td v-else>
              <div class="playerImg">
                <img src="@/assets/football-player.svg" class="playerImage" />
              </div>
            </td>
            <td>{{ item.firstName }} {{ item.lastName }}</td>
            <td style="text-align: center">{{ item.backNumber }}</td>
            <td>{{ item.position }}</td>
            <td>{{ item.birthDate }}</td>
            <td>{{ item.teams.name }}</td>
            <td v-if="item.active">Active</td>
            <td v-else>Retired</td>
            <td v-if="session.isAutenticated & item.active">
              <button class="statusBtn navPage" @click="player.setRetired(item.id)">Set retired</button>
            </td>
            <td v-if="session.isAutenticated & !item.active">
              <button class="statusBtn navPage" @click="player.setActive(item.id)">Set active</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <button v-if="page > 1" v-on:click="viewPlayer(page--)" class="navPage">Back</button>
            </td>
            <td v-if="session.isAutenticated" class="quantPage" colspan="6">
              Quantity per page
              <select v-model="quantityPerSite" v-on:change="onchangeQuant()">
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </td>
            <td v-else class="quantPage" colspan="5">
              Quantity per page
              <select v-model="quantityPerSite" v-on:change="onchangeQuant()">
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </td>

            <td>
              <button v-if="maxPages() > 1 && page < maxPages()" v-on:click="viewPlayer(page++)"
                class="navPage">Next</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-dark {
  font-weight: bold;
}

.soccerfield {
  /* background-size:auto;
  background-color: green;
  background-repeat: repeat; */
  margin-left: auto;
  margin-right: auto;
}

p {
  text-align: center;
}

h1 {
  text-align: center;
  color: black;
}

.tablePlayers {
  display: flex;
  justify-content: center;
  color: hsla(160, 100%, 37%, 1);
}

.tablehead {
  font-size: 1.4em;
  text-decoration: underline;
  font-weight: bold;
}

.playerImage {
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.playerImg {
  display: flex;
  justify-content: center;
}

.tableCell {
  border: 1px solid hsla(160, 100%, 37%, 1);
  padding: 0 5px;
}

button.navPage {
  border: 1px solid black;
  border-radius: 4px;
  text-align: center;
  padding: 3px;
  min-height: 28px;
  min-width: 120px;
  height: auto;
}

button.navPage:hover {
  background-color: hsla(160, 100%, 37%, 1);
  cursor: pointer;
}

td.quantPage {
  text-align: center;
}

.statusBtn:hover {
  background-color: hsla(160, 100%, 37%, 1);
  cursor: pointer;
}
</style>
