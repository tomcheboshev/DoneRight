<script setup>
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.push("/services");
};
</script>

<template>
  <DefaultLayout>
    <div class="details-container">
      <div class="details-card">
        <div class="image-wrapper">
          <img :src="route.query.image" alt="Service Provider" class="profile-pic" />
        </div>
        <h2 class="name">{{ route.query.name }} {{ route.query.lastName }}</h2>
        <h4 class="job-title">{{ route.query.job }}</h4>
        <p class="description">{{ route.query.description }}</p>

        <div class="actions">
          <button class="contact-btn">Hire Now</button>
          <button class="back-btn" @click="goBack">Go Back</button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
/* ---- CONTAINER ---- */
.details-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #dde1e7);
  padding: 20px;
}

/* ---- CARD DESIGN ---- */
.details-card {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 450px;
  width: 100%;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.details-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

/* ---- IMAGE WRAPPER ---- */
.image-wrapper {
  width: 100%;
  height: 220px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-in-out;
}

.details-card:hover .profile-pic {
  transform: scale(1.05);
}

/* ---- TEXT STYLING ---- */
.name {
  font-size: 26px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.job-title {
  font-size: 18px;
  font-weight: 600;
  color: #555;
  margin-bottom: 15px;
}

.description {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  padding: 0 15px;
}

/* ---- BUTTON STYLES ---- */
.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.contact-btn, .back-btn {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.contact-btn {
  background: linear-gradient(135deg, #4e73df, #2e59d9);
  color: white;
}

.contact-btn:hover {
  background: linear-gradient(135deg, #2e59d9, #1e3a8a);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.back-btn {
  background: #e0e0e0;
  color: #333;
}

.back-btn:hover {
  background: #d6d6d6;
}
</style>
