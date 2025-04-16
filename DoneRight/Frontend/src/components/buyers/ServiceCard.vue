<template>
  <div>
    <!-- Search Section -->
    <div class="background">
      <div class="overlay"></div>

      <div class="container">
        <!-- Title Section -->
        <div class="title">
          <h1>Најди Мајстор</h1>
          <p class="subtitle">Пронајди најдобрите професионалци во твојот град</p>
        </div>

        <!-- Input Fields -->
        <div class="inputs-container">
          <!-- Service Dropdown -->
          <div class="input-group">
            <input
              type="text"
              id="service"
              v-model="searchService"
              @input="filterServices"
              @focus="showServiceDropdown = true"
              @blur="hideDropdown('service')"
              placeholder="Пребарај услуга..."
            />
            <transition name="fade">
              <ul v-if="showServiceDropdown" class="dropdown">
                <li v-for="service in filteredServices" :key="service" @mousedown="selectService(service)">
                  {{ service }}
                </li>
              </ul>
            </transition>
          </div>

          <!-- City Dropdown -->
          <div class="input-group">
            <input
              type="text"
              id="city"
              v-model="searchCity"
              @input="filterCities"
              @focus="showCityDropdown = true"
              @blur="hideDropdown('city')"
              placeholder="Внеси град..."
            />
            <transition name="fade">
              <ul v-if="showCityDropdown" class="dropdown">
                <li v-for="city in filteredCities" :key="city" @mousedown="selectCity(city)">
                  {{ city }}
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Cards Section -->
    <div class="services-container">
      <div v-for="service in filteredServicesList" :key="service.id" class="service-card">
        <div class="image-container">
          <img :src="service.image" :alt="`${service.name} ${service.lastName}`" class="profile-pic" />
        </div>

        <div class="info">
          <h3>{{ service.name }} {{ service.lastName }}</h3>
          <p class="job-title">
            <span class="job-badge">{{ getJobIcon(service.job) }}</span>
            {{ service.job }}
          </p>
          <p class="location">📍 {{ service.location }}</p>
          <p class="rating">⭐ {{ service.rating }}/5</p>

          <div class="btn-container">
            <button class="contact-btn" @click="goToDetails(service)">Контактирај ме</button>
            <button class="favorite-btn" @click="toggleFavorite(service)">
              <span :class="{ favorite: isFavorite(service) }">★</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import img from "@/assets/lok.png";

// Search Logic
const searchService = ref("");
const searchCity = ref("");
const showServiceDropdown = ref(false);
const showCityDropdown = ref(false);

const servicesList = ["Електричар", "Водоводџија", "Молер", "Градинар", "Керамичар"];
const citiesList = ["Скопје", "Битола", "Куманово", "Охрид", "Штип"];

const filteredServices = ref([...servicesList]);
const filteredCities = ref([...citiesList]);

const filterServices = () => {
  filteredServices.value = searchService.value
    ? servicesList.filter((service) => service.toLowerCase().startsWith(searchService.value.toLowerCase()))
    : [...servicesList];
};

const filterCities = () => {
  filteredCities.value = searchCity.value
    ? citiesList.filter((city) => city.toLowerCase().startsWith(searchCity.value.toLowerCase()))
    : [...citiesList];
};

const selectService = (service) => {
  searchService.value = service;
  showServiceDropdown.value = false;
};

const selectCity = (city) => {
  searchCity.value = city;
  showCityDropdown.value = false;
};

const hideDropdown = (type) => {
  setTimeout(() => {
    if (type === "service") showServiceDropdown.value = false;
    if (type === "city") showCityDropdown.value = false;
  }, 200);
};

// Service Cards Logic
const router = useRouter();
const services = ref([
  { id: 1, name: "John", lastName: "Doe", job: "Електричар", location: "Скопје", rating: 4.8, image: img },
  { id: 2, name: "Томче", lastName: "Бошев", job: "Електричар", location: "Битола", rating: 4.5, image: img },
  { id: 3, name: "David", lastName: "Johnson", job: "Дрводелец", location: "Прилеп", rating: 4.7, image: img },
  { id: 4, name: "Michael", lastName: "Brown", job: "Механичар", location: "Куманово", rating: 4.6, image: img },
]);

const favorites = ref([]);

const toggleFavorite = (service) => {
  const index = favorites.value.findIndex((fav) => fav.id === service.id);
  if (index === -1) {
    favorites.value.push(service);
  } else {
    favorites.value.splice(index, 1);
  }
};

const goToDetails = (service) => {
  router.push({ path: `/service/${service.id}` });
};

const isFavorite = (service) => favorites.value.some((fav) => fav.id === service.id);

const getJobIcon = (job) => {
  const icons = {
    "Електричар": "⚡",
    "Водоводџија": "🔧",
    "Дрводелец": "🪵",
    "Механичар": "🔩",
  };
  return icons[job] || "💼";
};

// Computed Filtered Services Based on City and Service
const filteredServicesList = computed(() => {
  return services.value.filter(service => {
    const matchesService = !searchService.value || service.job.toLowerCase().includes(searchService.value.toLowerCase());
    const matchesCity = !searchCity.value || service.location.toLowerCase().includes(searchCity.value.toLowerCase());
    return matchesService && matchesCity;
  });
});
</script>

<style scoped>
/* Shared Styles for both Sections */
.services-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  padding: 40px;
  max-width: 1400px;
  margin: auto;
}

.service-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  text-align: center;
  padding: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.service-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 15px 40px rgba(255, 193, 7, 0.5);
}

.image-container {
  width: 100%;
  height: 200px;
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

h3 {
  font-size: 22px;
  font-weight: 700;
  color: #ffc107;
  margin-top: 15px;
}

.job-title, .location, .rating {
  font-size: 16px;
  color: #ddd;
  margin-bottom: 10px;
}

.job-badge {
  background: rgba(255, 193, 7, 0.2);
  padding: 5px 10px;
  border-radius: 10px;
}

.btn-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.contact-btn {
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: white;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  background: linear-gradient(135deg, #ff9800, #ff6f00);
  box-shadow: 0px 4px 15px rgba(255, 193, 7, 0.4);
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.favorite-btn span {
  color: white;
  transition: color 0.3s ease, transform 0.2s ease;
}

.favorite-btn span.favorite {
  color: #ffc107;
  transform: scale(1.2);
}

.favorite-btn:hover span {
  color: #ffc107;
  transform: scale(1.1);
}

/* Search Section Styles */
.background {
  position: relative;
  width: 100%;
  height: 50vh;
  background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6px);
}

.container {
  position: relative;
  background-color: #212529;
  border-radius: 15px;
  padding: 40px;
  max-width: 750px;
  width: 90%;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.title h1 {
  font-size: 32px;
  font-weight: 700;
  color: #ffcc00;
}

.subtitle {
  font-size: 16px;
  color: #ddd;
  margin-top: 5px;
}

.inputs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.input-group {
  position: relative;
  width: 90%;
  max-width: 350px;
}

.input-group input {
  width: 90%;
  padding: 14px;
  font-size: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
}

.input-group input:focus {
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border-color: #ffcc00;
  box-shadow: 0 0 12px rgba(255, 204, 0, 0.6);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 90%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  max-height: 180px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.dropdown li {
  padding: 12px;
  cursor: pointer;
  color: white;
  list-style: none;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown li:hover {
  background: rgba(255, 204, 0, 0.3);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
