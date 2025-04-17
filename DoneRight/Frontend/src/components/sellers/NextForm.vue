<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase"; // Your Firebase config file
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

const router = useRouter();
const auth = getAuth(); // Initialize Firebase Authentication

const form = ref({
  service: "",
  description: "",
  experience: "",
  price: "",
});

const availableServices = [
  "Електричар",
  "Водоводџија",
  "Каменорезец",
  "Автомеханичар",
  "Дизајн на ентериери",
  "Фотограф",
  "Писател",
  "Илустратор",
  "Консултант",
  "Копирајтер",
  "Преведувач",
  "Графички Дизајн",
  "Брендинг Специјалист",
  "Видео Продуцент",
  "Друго",
];

const submitMasterProfile = async () => {
  if (!form.value.service) {
    alert("Изберете услуга.");
    return;
  }

  // Get the current logged-in user's ID
  const user = auth.currentUser;
  if (!user) {
    alert("User is not logged in");
    return;
  }

  try {
    // Add data to the 'services' collection
    const docRef = await addDoc(collection(db, "services"), {
      service: form.value.service,
      description: form.value.description,
      experience: form.value.experience,
      price: form.value.price,
      userId: user.uid, // Use the logged-in user's ID
      createdAt: Timestamp.fromDate(new Date()), // Adds a timestamp for creation
    });

    console.log("Master profile added with ID: ", docRef.id);
    router.push("/profile-picture");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const redirectToPreviousForm = () => {
  router.push("/apply");
};

</script>

<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="become-master-container">
      <h1 class="title">Изберете Услуга</h1>
      <p class="subtitle">Изберете што нудите и додадете детали за себе.</p>

      <form @submit.prevent="submitMasterProfile" class="application-form">
        <!-- Service Selection -->
        <div class="input-group">
          <select v-model="form.service" required>
            <option value="" disabled selected>Изберете услуга</option>
            <option v-for="service in availableServices" :key="service" :value="service">
              {{ service }}
            </option>
          </select>
        </div>

        <!-- Description -->
        <div class="input-group">
          <input type="text" v-model="form.description" required />
          <label>Краток опис за вас</label>
        </div>

        <!-- Experience -->
        <div class="input-group">
          <input type="number" v-model="form.experience" required />
          <label>Искуство (години)</label>
        </div>

        <!-- Price -->
        <div class="input-group">
          <input type="number" v-model="form.price" required />
          <label>Цена за услуга ($)</label>
        </div>

        <button type="submit" class="submit-btn">Поднеси профил</button>
      </form>

      <button class="back-btn" @click="redirectToPreviousForm">Назад</button>
    </div>
  </div>
</template>

<style scoped>
/* Background */
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #212529;
  overflow: hidden;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

/* Form Container */
.become-master-container {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
  text-align: center;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Title & Subtitle */
.title {
  font-size: 24px;
  font-weight: 700;
  color: #ffc107;
}

.subtitle {
  font-size: 14px;
  color: #ddd;
  margin-bottom: 20px;
}

/* Input Group */
.input-group {
  position: relative;
  width: 91%;
  margin-bottom: 15px;
}

/* Input & Select Fields */
.input-group input,
.input-group select {
  width: 100%;
  padding: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transition: 0.3s;
  margin-top: 6px;
  appearance: none; /* Removes default browser styles */
}

.input-group select{
  width: 108.6%;
}

/* Label */
.input-group label {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #ddd;
  transition: 0.3s;
  pointer-events: none;
}

/* Floating Effect */
.input-group input:focus + label,
.input-group input:valid + label {
  top: -5px;
  left: 10px;
  font-size: 12px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  padding: 0 5px;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, #ff9d00, #ffcd38);
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 15px;
}

.submit-btn:hover {
  background: linear-gradient(90deg, #ffb400, #ffdf70);
}

/* Back Button */
.back-btn {
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.2);
  padding: 12px 18px;
  font-size: 14px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive Design */
@media (max-width: 480px) {
  .become-master-container {
    padding: 20px;
    max-width: 75%;
  }

  .title {
    font-size: 22px;
  }

  .input-group input,
  .input-group select {
    font-size: 16px;
    padding: 12px;
  }

  .input-group label {
    font-size: 13px;
  }

  .submit-btn {
    font-size: 14px;
    padding: 12px;
  }
}
</style>
