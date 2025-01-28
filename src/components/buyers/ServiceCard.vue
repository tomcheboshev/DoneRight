<template>
  <div class="service-card">
    <i :class="service.icon"></i>
    <h3>{{ service.name }}</h3>
    <p>{{ service.description }}</p>
    <button @click="$emit('view-details')">View Details</button>
  </div>
</template>

<script>
export default {
  props: ['service'],
};
</script>

<style scoped>
.service-card {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  max-width: 200px;
  margin: 1rem;
}
button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
</style>
