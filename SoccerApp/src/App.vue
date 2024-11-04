<script setup>
import LoginForm from './components/LoginForm.vue';
import HomeView from './views/HomeView.vue';
import OurMain from './components/OurMain.vue';

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/soccerappLogo.svg" width="125" height="125" />
    <h1>Welcome to the home of Soccerapp!</h1>
    <LoginForm />
  </header>
  <div class="OurMain">
    <!-- <OurMain class="OurMain" /> -->
    <OurMain />
  </div>
</template>

<style scoped>
.OurMain {
  display: flex;
  flex-direction: row;
}

main {
  min-width: 1024px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  top: 0;
  background-color: hsla(160, 100%, 37%, 1);
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    place-items: flex-start;
    /* flex-wrap: wrap; */
    min-width: 1024px;
    width: 85vw;
    /* margin-left: 5vw; */
    min-height: 600px;
    background-color: azure;
  }
}
</style>
