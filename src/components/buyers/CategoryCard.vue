<template>
  <div class="category-card">
    <i :class="category.icon"></i>
    <h3>{{ category.name }}</h3>
  </div>
</template>

<script>
export default {
  props: ['category'],
};
</script>

<style scoped>
.category-card {
  text-align: center;
  background-color: #efefef;
  padding: 1rem;
  border-radius: 8px;
  width: 150px;
  margin: 10px;
}
</style>
