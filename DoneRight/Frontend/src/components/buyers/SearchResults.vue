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
</template>

<script setup>
import { ref } from "vue";

const searchService = ref("");
const searchCity = ref("");
const showServiceDropdown = ref(false);
const showCityDropdown = ref(false);

const services = ["Електричар", "Водоводџија", "Молер", "Градинар", "Керамичар"];
const cities = ["Скопје", "Битола", "Куманово", "Охрид", "Штип"];

const filteredServices = ref([...services]);
const filteredCities = ref([...cities]);

const filterServices = () => {
  filteredServices.value = searchService.value
    ? services.filter((service) => service.toLowerCase().startsWith(searchService.value.toLowerCase()))
    : [...services];
};

const filterCities = () => {
  filteredCities.value = searchCity.value
    ? cities.filter((city) => city.toLowerCase().startsWith(searchCity.value.toLowerCase()))
    : [...cities];
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

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    width: 80%;
  }
}
</style>
