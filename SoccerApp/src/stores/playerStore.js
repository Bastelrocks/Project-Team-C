import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { supabase } from "@/lib/supabaseClient.js";

export const playerStore = defineStore("playerStore", () => {
  const playerList = ref([]);
  let tableName = "player";

  async function getPlayers() {
    const { data, error } = await supabase.from(tableName).select(`
                *,
                teams (name)
            `);

    if (error) {
      console.error("Error fetching players:", error);
      return;
    }
    playerList.value = data;
  }

  /**
   * The Function get a Player by his ID in the Database
   * @param {number} id is the id Number of the Player in
   * @returns
   */
  async function getPlayer(id) {
    const { data } = await supabase.from(tableName).select().eq("id", id);
    return data[0];
  }

  /**
   * It will get/list all Players in determinate Club
   * @param {number} id is the ID from the Club
   * @returns the size of the Club (in that case the number of team players)
   */
  async function getPlayersByClub(id) {
    let size = 0;
    const { data } = await supabase.from(tableName).select().eq("clubID", id);
    data.forEach((player) => {
      playerList.value.push(player);
      size++;
    });
    playerList.value = data;
    return size;
  }

  /**
   * This function will set the retired player to active
   * @param {number} id is the playerID
   */
  async function setActive(id) {
    const { error } = await supabase
      .from("player")
      .update({ active: "TRUE" })
      .eq("id", id);
    await getPlayers(); // Re-fetch the players to refresh the list
  }
  /**
   * This function will set the player to retired
   * @param {number} id is the playerID
   */
  async function setRetired(id) {
    const { error } = await supabase
      .from("player")
      .update({ active: "FALSE" })
      .eq("id", id);
    await getPlayers(); // Re-fetch the players to refresh the list
  }
  /**
   * It will insert a new Player in the Database
   * @param newPlayer
   */
  async function addPlayer(newPlayer) {
    const { error } = await supabase
      .from("player")
      .insert({
        firstName: newPlayer.firstName,
        backNumber: newPlayer.backNumber,
        lastName: newPlayer.lastName,
        clubID: newPlayer.clubID,
        birthDate: newPlayer.birthDate,
        position: newPlayer.position,
        image: newPlayer.image,
      });
    await getPlayers(); // Re-fetch the players to refresh the list
  }
  async function deletePlayer(id) {
    const response = await supabase.from("player").delete().eq("id", id);
    alert('The player with the id '+id+' has been deleted from the database.')
    // const { data } = await supabase.from("player").select();
    // player.playerList.value = data;
    await getPlayers(); // Re-fetch the players to refresh the list
  }
  return {
    getPlayers,
    getPlayersByClub,
    getPlayer,
    playerList,
    setActive,
    setRetired,
    addPlayer,
    deletePlayer
  };
});
