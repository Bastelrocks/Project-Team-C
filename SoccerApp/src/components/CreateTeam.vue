<script setup>
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'
const countries = ref([])
const newTeam = reactive({
    id: '',
    name: '',
    foundationYear: '1',
    countrie_id: '',
  });


async function getCountries() {
    const { data } = await supabase.from('countries').select();
    countries.value = data;
}

onMounted(() => {
    getCountries()
})


async function addTeam(newTeam){
    console.log("Button add Player clicked")
    console.log(newTeam);
    const { error } = await supabase
    .from('teams')
    .insert({ name: newTeam.name, foundationYear: newTeam.foundationYear, countrie_id: newTeam.countrie_id })
}

</script>

<template>
    <h1>Add a Team to Database</h1>
    <form v-on:submit.prevent="submit" class="createTeam">
        <input type="text" placeholder="Team Name" v-model="newTeam.name" required>
        <br>
        <label for="foundationYear">Founded in:</label>
        <input type="number" placeholder="1800" min="1800" max="2024" v-model="newTeam.foundationYear" required>
        <br>
        <select name="country" v-model="newTeam.countrie_id" required>
            <option value="" selected>Select country</option>
            <option v-for="item in countries" :value="item.id">{{ item.name }}</option>
        </select> 
        <button type="submit" @click="addTeam(newTeam)">Add Team to database</button>
    </form>
</template>

<style scoped>
h1{
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