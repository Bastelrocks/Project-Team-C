import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/* Maybe at this place we will conect the database */

export const dataBaseStore = defineStore('database', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
