<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <h1>Login</h1>
  <input type="text" placeholder="email">
  <input type="text" placeholder="password">
  <RouterLink to="/register"><a href="">Forgotpass</a></RouterLink>

</template>

<style scoped>
</style>
