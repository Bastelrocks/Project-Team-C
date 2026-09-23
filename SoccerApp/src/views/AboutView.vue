<template>
  <div class="about">
    <h1>Our Soccerapp</h1>
    <p>This is the project for the Front End Bootcamp @Ironhack from Aug 20th to Nov 9th 2024 from Victor Fernandes Martins,
      Tim Rabisch and Raed Tarawneh.
    </p>
    <h2>Features, when finished</h2>
    <ul>
      <li>stored on GitHub</li>
      <li>available online on Netlify</li>
      <li>apllied <i>KISS</i> and <i>DRY</i> principles</li>
      <li>styled with CSS</li>
      <li>using a Supabase Database</li>
      <li>status handling with Vue's Pinia</li>
      <li>handling of asynchronous operations using Async/await</li>
      <li>Authentication (sign up, sign in, sign out)</li>
      <li>ability to add new players/teams</li>
      <li>ability to edit existing players/teams</li>
      <li>ability to tranfer players between teams</li>
      <li>ability to delete existing players/teams</li>
    </ul>
    <p>Read a full documentation of the app's features, configuration and technical specifications on <a href="https://github.com/Bastelrocks/Project-Team-C/blob/main/README.md">GitHub</a></p>

  
  </div>
</template>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
} */

.about {
  display: flex;
  flex-direction: column;
  color:black;
}

 h1{
  font-size:2.5em;
  padding:20px;
  text-align: center;
 }
 h2{
  font-size:2em;
  padding:20px; 
  text-align: center;
 }
 ul{
  padding:20px; 
  text-align: center;
  list-style: none;
  font-size: 1.5em;
 }
p{
  padding:20px;
  font-size: 1.5em;
  text-align: center;
}

</style>
