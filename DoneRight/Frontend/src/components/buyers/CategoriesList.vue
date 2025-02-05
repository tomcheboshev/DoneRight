<template>
  <div class="categories-list">
    <h2>Explore Services</h2>
    <div class="categories-container">
      <CategoryCard v-for="category in categories" :key="category.name" :category="category" />
    </div>
  </div>
</template>

<script>
import CategoryCard from './CategoryCard.vue';

export default {
  components: { CategoryCard },
  data() {
    return {
      categories: [
        { name: 'Electrician', icon: 'fas fa-plug' },
        { name: 'Plumber', icon: 'fas fa-wrench' },
        { name: 'Painter', icon: 'fas fa-paint-roller' },
        { name: 'Carpenter', icon: 'fas fa-hammer' },
      ],
    };
  },
};
</script>

<style scoped>
.categories-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
