<script setup>
import { ref, reactive, onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient.js";
import { playerStore } from "@/stores/playerStore";
const teams = ref([]);
// const player = ref(playerStore());

const player = playerStore();

async function getTeams() {
  const { data } = await supabase.from("teams").select();
  teams.value = data;
  
}

onMounted(() => {
  getTeams();
});


</script>

<template>
  <h1>Delete a player</h1>
  <form v-on:submit.prevent="submit" class="createPlayer">
    <select name="team" v-model="player.id" required>
      <option value="" selected>Select player to delete</option>
      <option v-for="item in player.playerList" :value="item.id">
        {{ item.firstName }} {{ item.lastName }}
      </option>
    </select>
    <button type="submit" @click="player.deletePlayer(player.id)">
      Delete player
    </button>
  </form>
</template>

<style scoped>
h1 {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}

label,
p {
  margin: 10px 0 5px;
}

input,
select,
button {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  accent-color: brown;
}

button {
  background-color: white;
  color: hsla(160, 100%, 37%, 1);
  cursor: pointer;
  border: 1px solid hsla(160, 100%, 37%, 1);
}

button:hover {
  background-color: white;
  box-shadow: 0px 0px 10px 5px hsla(160, 100%, 37%, 1);
}
</style>
