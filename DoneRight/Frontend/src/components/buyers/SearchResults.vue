<template>
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
              <li v-for="service in filteredServices.value" :key="service" @mousedown="selectService(service)">
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
              <li v-for="city in filteredCities.value" :key="city" @mousedown="selectCity(city)">
                {{ city }}
              </li>
            </ul>
          </transition>
        </div>
      </div>

      <!-- Service Results -->
      <div class="results-container" v-if="visibleServices.length">
        <h2>Резултати</h2>
        <div class="result-card" v-for="service in visibleServices" :key="service.id">
          <h3>{{ service.service }}</h3>
          <p><strong>Опис:</strong> {{ service.description }}</p>
          <p><strong>Искуство:</strong> {{ service.experience }} години</p>
          <p><strong>Цена:</strong> {{ service.price }} ден.</p>
          <p><strong>Град:</strong> {{ service.city || 'Непознато' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

// Input & dropdown control
const searchService = ref("");
const searchCity = ref("");
const showServiceDropdown = ref(false);
const showCityDropdown = ref(false);

// Data from Firestore
const allServices = ref([]);
const filteredServices = ref([]);
const filteredCities = ref([]);

const loadServices = async () => {
  const querySnapshot = await getDocs(collection(db, "services"));
  allServices.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Initial dropdown content
  filteredServices.value = [...new Set(allServices.value.map((s) => s.service))];
  filteredCities.value = [...new Set(allServices.value.map((s) => s.city || "Непознато"))];
};

// Dropdown filtering
const filterServices = () => {
  filteredServices.value = searchService.value
    ? [...new Set(allServices.value
        .map((s) => s.service)
        .filter((service) =>
          service.toLowerCase().startsWith(searchService.value.toLowerCase())
        ))]
    : [...new Set(allServices.value.map((s) => s.service))];
};

const filterCities = () => {
  filteredCities.value = searchCity.value
    ? [...new Set(allServices.value
        .map((s) => s.city || "Непознато")
        .filter((city) =>
          city.toLowerCase().startsWith(searchCity.value.toLowerCase())
        ))]
    : [...new Set(allServices.value.map((s) => s.city || "Непознато"))];
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

// Services to display
const visibleServices = computed(() => {
  return allServices.value.filter((service) => {
    const matchesService = searchService.value
      ? service.service.toLowerCase().includes(searchService.value.toLowerCase())
      : true;
    const matchesCity = searchCity.value
      ? (service.city || "").toLowerCase().includes(searchCity.value.toLowerCase())
      : true;
    return matchesService && matchesCity;
  });
});

onMounted(() => {
  loadServices();
});
</script>

<style scoped>
/* Background & Container */
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

/* Title */
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

/* Inputs */
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

/* Dropdown */
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

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Results */
.results-container {
  margin-top: 30px;
  color: white;
}

.result-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  text-align: left;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    width: 80%;
  }
}
</style>
