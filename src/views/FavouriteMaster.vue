<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { ref, onMounted } from "vue";

const favorites = ref([]);

// Load favorites from localStorage
const loadFavorites = () => {
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
  }
};

onMounted(loadFavorites);
</script>

<template>
 <DefaultLayout>
  <div class="favourites-container">
    <h2>Your Favorite Masters</h2>
    <div v-if="favorites.length === 0" class="empty-message">
      No favorites added yet.
    </div>
    <div v-else class="services-container">
      <div v-for="service in favorites" :key="service.id" class="service-card">
        <div class="image-container">
          <img :src="service.image" :alt="`${service.name} ${service.lastName}`" class="profile-pic" />
        </div>
        <div class="info">
          <h3>{{ service.name }} {{ service.lastName }}</h3>
          <p class="job-title">{{ service.job }}</p>
        </div>
      </div>
    </div>
  </div>
 </DefaultLayout>
</template>

<style scoped>

.favourites-container {
  padding: 40px;
  text-align: center;
}

.empty-message {
  font-size: 18px;
  color: #777;
  margin-top: 20px;
}

.services-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .services-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .services-container {
    grid-template-columns: 1fr;
  }
}
</style>
