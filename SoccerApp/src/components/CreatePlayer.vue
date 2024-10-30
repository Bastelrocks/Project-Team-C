<script setup>
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'
const teams = ref([])
const newPlayer = reactive({
    id: '',
    firstName: '',
    backNumber: '1',
    lastName: '',
    clubID: '',
    birthDate: '',
    position:'',
    image:'',
    market_value:''

});


async function getTeams() {
    const { data } = await supabase.from('teams').select();
    teams.value = data;
}

onMounted(() => {
    getTeams()
})


async function addPlayer(newPlayer){
    console.log("Button add Player clicked")
    console.log(newPlayer);
    const { error } = await supabase
    .from('player')
    .insert({ firstName: newPlayer.firstName, backNumber: newPlayer.backNumber, lastName: newPlayer.lastName, clubID: newPlayer.clubID, birthDate: newPlayer.birthDate, position: newPlayer.position, image: newPlayer.image })
}
    
    
</script>

<template>
    <form v-on:submit.prevent="submit" class="createPlayer">
        <input type="text" placeholder="First Name" v-model="newPlayer.firstName" required>
        <br>
        <input type="text" placeholder="Last Name" v-model="newPlayer.lastName" required>
        <label for="Back Number">Back Number:</label>
        <input type="number" placeholder="Back Number"v-model="newPlayer.backNumber" required>
        <label for="birthdate">Birthdate:</label>
        <input type="date" placeholder="birthdate" v-model="newPlayer.birthDate" required>
        <br>
        <select name="position" placeholder="Position" v-model="newPlayer.position" required>
            <option value=0 selected>Select Position</option>
            <option value="goalkeeper">Goalkeeper</option>
            <option value="defense">Defense</option>
            <option value="midfield">Midfield</option>
            <option value="offense">Offense</option>
        </select>
        <input type="url" placeholder="image-url" v-model="newPlayer.image">
        <select name="team" placeholder="Team" v-model="newPlayer.clubID" required>
            <option value=0 selected>Select team</option>
            <option v-for="item in teams" value="item.idTeam">{{ item.name }}</option>
        </select> 
        <button type="submit" @click="addPlayer(newPlayer)">Add player to database</button>
    </form>
</template>

<style scoped>
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