<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import img from "@/assets/lok.png";

const router = useRouter();

const services = ref([
  { id: 1, name: "John", lastName: "Doe", job: "Electrician", image: img, description: "Expert in electrical wiring, installation, and repairs." },
  { id: 2, name: "Jane", lastName: "Smith", job: "Plumber", image: img, description: "Professional plumber specializing in pipe installation and repairs." },
  { id: 3, name: "David", lastName: "Johnson", job: "Carpenter", image: img, description: "Skilled carpenter with experience in furniture and home renovations." },
  { id: 4, name: "Michael", lastName: "Brown", job: "Mechanic", image: img, description: "Certified auto mechanic with 10 years of experience." },
]);

const favorites = ref([]);
const showToast = ref(false);

// Toggle favorite function
const toggleFavorite = (service) => {
  const index = favorites.value.findIndex((fav) => fav.id === service.id);
  if (index === -1) {
    favorites.value.push(service);
    showToastMessage();
  } else {
    favorites.value.splice(index, 1);
  }
  saveFavorites();
};

// Navigate to service details page
const goToDetails = (service) => {
  router.push({ 
    path: `/service/${service.id}`, 
    query: { 
      name: service.name, 
      lastName: service.lastName, 
      job: service.job, 
      description: service.description, 
      image: service.image 
    } 
  });
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

// Show toast notification
const showToastMessage = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 1500);
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
        <button class="contact-btn" @click="goToDetails(service)">Contact Me</button>
        <button class="favorite-btn" @click="toggleFavorite(service)">
          <span :class="{ favorite: isFavorite(service) }">★</span>
        </button>
      </div>
    </div>
  </div>

  <div v-if="showToast" class="toast">Added to Favorites</div>
</template>

<style scoped>
/* ---- GRID LAYOUT ---- */
.services-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 50px;
  max-width: 1400px;
  margin: auto;
}

/* ---- SERVICE CARD ---- */
.service-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
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
  transition: transform 0.4s ease-in-out;
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
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
}

/* ---- FAVORITE BUTTON ---- */
.favorite-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease-in-out, transform 0.2s ease;
}

.favorite-btn span {
  color: white;
  transition: color 0.3s ease-in-out, transform 0.2s ease;
}

.favorite-btn span.favorite {
  color: #f1c40f;
  transform: scale(1.2);
}

.favorite-btn:hover span {
  color: #f1c40f;
  transform: scale(1.1);
}

/* ---- TOAST NOTIFICATION ---- */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #4e73df;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  opacity: 1;
  animation: fadeOut 1.5s ease-in-out forwards;
}

@keyframes fadeOut {
  0% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
