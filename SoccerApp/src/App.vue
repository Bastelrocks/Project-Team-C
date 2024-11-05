<script setup>
import LoginForm from './components/LoginForm.vue';
import HomeView from './views/HomeView.vue';
import OurMain from './components/OurMain.vue';

</script>

<template>
  <header>
    <LoginForm />
  </header>
  <div class="ourMain">
    <OurMain />
  </div>
</template>

<style scoped>
.ourMain {
  display: flex;
  flex-direction: row;
}

/* header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  top: 0;
  background-color: hsla(160, 100%, 37%, 1);
} */

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
