<template>
  <div class="container">
    <!-- Title Section -->
    <div class="title">
      <h1>Our Service Providers</h1>
      <p class="subtitle">Find the best professionals near you</p>
    </div>

    <!-- Input Fields for Searching Services and City -->
    <div class="inputs-container">
      <input
        type="text"
        placeholder="Search for Services..."
        v-model="searchService"
        class="filter-input"
      />
      <input
        type="text"
        placeholder="Enter City..."
        v-model="searchCity"
        class="filter-input"
      />
    </div>

    <!-- Service cards would go here later -->
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchService = ref('');
const searchCity = ref('');
</script>

<style scoped>
/* Overall container to center the content */
.container {
  padding: 50px 60px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 40px auto 0 auto; /* Added margin-top for spacing */
  text-align: center;
  font-family: "Arial", sans-serif;
}

/* Title Section */
.title {
  margin-bottom: 30px;
}

.title h1 {
  font-size: 40px;
  font-weight: 800;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 18px;
  color: #777;
  margin-top: 5px;
  font-weight: 400;
}

/* Container for Inputs */
.inputs-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 50px;
}

/* Input Fields Styling */
.filter-input {
  padding: 16px 24px;
  font-size: 16px;
  border-radius: 30px;
  border: 1px solid #ddd;
  width: 350px;
  max-width: 100%;
  background-color: #fafafa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.filter-input::placeholder {
  color: #aaa;
  font-weight: 300;
}

/* Hover and Focus Effects for Inputs */
.filter-input:hover {
  border-color: #4e73df;
  box-shadow: 0 4px 10px rgba(78, 115, 223, 0.2);
}

.filter-input:focus {
  outline: none;
  border-color: #4e73df;
  box-shadow: 0 0 10px rgba(78, 115, 223, 0.3);
}

/* Responsive Design for Small Screens */
@media (max-width: 768px) {
  .inputs-container {
    flex-direction: column;
    align-items: center;
  }

  .filter-input {
    width: 100%;
    max-width: 500px;
  }
}

@media (max-width: 480px) {
  .title h1 {
    font-size: 32px;
  }

  .subtitle {
    font-size: 16px;
  }
}
</style>
