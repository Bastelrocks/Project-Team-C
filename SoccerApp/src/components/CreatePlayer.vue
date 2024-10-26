<script setup>
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'
const teams = ref([])
const newPlayer = reactive({
    id: '',
    firstName: '',
    backNumber: '1',
    lasName: '',
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

console.log(teams)

function addPlayer(){
    console.log("Button add Player clicked")
}
    
    
</script>

<template>
    <form v-on:submit.prevent="submit" class="createPlayer">
        <input type="text" placeholder="First Name" v-model="newPlayer.firstName" required>
        <br>
        <input type="text" placeholder="Last Name" v-model="newPlayer.lastName" required>
        <input type="number" placeholder="Back Number"v-model="newPlayer.backNumber" required>
        <label for="birthdate">Birthdate:</label>
        <input type="date" placeholder="birthdate" v-model="newPlayer.birthDate" required>
        <br>
        <select name="position" placeholder="Position" v-model="newPlayer.position" required>
            <option value="goalkeeper">Goalkeeper</option>
            <option value="defense">Defense</option>
            <option value="midfield">Midfield</option>
            <option value="offense">Offense</option>
        </select>
        <input type="url" placeholder="image-url">
        <select name="team" placeholder="Team" v-model="newPlayer.id" required>
            <option v-for="item in teams" :id="item.idTeam">{{ item.name }}</option>
        </select> 
        <button type="submit" @click="addPlayer">Add player to database</button>
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
  background-color: #ff6347;
  color: white;
  cursor: pointer;
  border: none;
}

button:hover {
  background-color: #e5533d;
}
</style>