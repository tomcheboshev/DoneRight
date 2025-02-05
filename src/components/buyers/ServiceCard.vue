<script setup>
import { ref } from "vue";
import img from "@/assets/lok.png";

const services = ref([
  { id: 1, name: "John", lastName: "Doe", job: "Electrician", image: img },
  { id: 2, name: "Jane", lastName: "Smith", job: "Plumber", image: img },
  { id: 3, name: "David", lastName: "Johnson", job: "Carpenter", image: img },
  { id: 4, name: "Michael", lastName: "Brown", job: "Mechanic", image: img },
  { id: 5, name: "Emily", lastName: "Clark", job: "Painter", image: img },
  { id: 6, name: "Daniel", lastName: "Miller", job: "Roofer", image: img },
  { id: 7, name: "Sarah", lastName: "White", job: "Gardener", image: img },
  { id: 8, name: "James", lastName: "Lee", job: "Technician", image: img },
  { id: 9, name: "Emma", lastName: "Walker", job: "Interior Designer", image: img },
  { id: 10, name: "William", lastName: "Harris", job: "Architect", image: img },
]);

const favorites = ref([]);

// Toggle favorite function
const toggleFavorite = (service) => {
  const index = favorites.value.findIndex((fav) => fav.id === service.id);
  if (index === -1) {
    favorites.value.push(service);
  } else {
    favorites.value.splice(index, 1);
  }
  saveFavorites();
};

// Check if a service is favorited
const isFavorite = (service) => {
  return favorites.value.some((fav) => fav.id === service.id);
};

// Save favorites to localStorage
const saveFavorites = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};

// Load favorites on component mount
const loadFavorites = () => {
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
  }
};

loadFavorites();
</script>

<template>
  <div class="services-container">
    <div v-for="service in services" :key="service.id" class="service-card">
      <div class="image-container">
        <img :src="service.image" :alt="`${service.name} ${service.lastName}`" class="profile-pic" />
      </div>
      <div class="info">
        <h3>{{ service.name }} {{ service.lastName }}</h3>
        <p class="job-title">{{ service.job }}</p>
        <button class="contact-btn">Contact Me</button>
        <button class="favorite-btn" @click="toggleFavorite(service)">
          <span :class="{ favorite: isFavorite(service) }">⭐ {{ isFavorite(service) ? "Added to Favorites" : "Add to Favorites" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ---- GRID LAYOUT ---- */
.services-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 50px;
  justify-content: center;
  max-width: 1400px;
  margin: auto;
}

@media (max-width: 1200px) {
  .services-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 800px) {
  .services-container {
    grid-template-columns: 1fr;
  }
}

/* ---- SERVICE CARD ---- */
.service-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

/* ---- IMAGE STYLE ---- */
.image-container {
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 15px;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.service-card:hover .profile-pic {
  transform: scale(1.1);
}

/* ---- TEXT STYLING ---- */
h3 {
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin-top: 15px;
}

.job-title {
  font-size: 16px;
  font-weight: 500;
  color: #555;
  margin-bottom: 20px;
}

/* ---- CONTACT BUTTON ---- */
.contact-btn {
  background: linear-gradient(135deg, #4e73df, #2e59d9);
  color: white;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

.contact-btn:hover {
  background: linear-gradient(135deg, #2e59d9, #1e3a8a);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
}

/* ---- FAVORITE BUTTON ---- */
.favorite-btn {
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
}

.favorite-btn span {
  color: #ffffff;
  transition: color 0.3s ease-in-out;
}

.favorite-btn span.favorite {
  color: #f1c40f;
}

.favorite-btn:hover span {
  color: #f1c40f;
}
</style>
