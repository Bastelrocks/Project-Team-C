<script>
export default {
  name: "NotFound"
};
</script>


<template>
    <div class="not-found">
    <img src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found-1024x576.png" alt="Not Found Logo" class="not-found-logo" />
    <h2>404 - Page Not Found</h2>
    <p>Sorry, we couldn't find the page you were looking for.</p>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
  color: #555;
}

.not-found-logo {
  width: 50%;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  color: #333;
}

p {
  font-size: 18px;
  color: #777;
}
</style>