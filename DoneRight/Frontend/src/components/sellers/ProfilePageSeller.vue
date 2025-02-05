<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PreloaderSection from "@/components/common/PreloaderSection.vue";

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  password: "",
  confirmPassword: "",
  profilePicture: null,
});

const router = useRouter();

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.profilePicture = URL.createObjectURL(file); // Store the file for preview
  }
};

const removeProfilePicture = () => {
  form.value.profilePicture = null; // Remove the picture, reset to default
};

const submitApplication = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  router.push("/next-form");
};

const redirectToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <PreloaderSection />
  <div class="become-master-container">
    <div class="title-section">
      <h1>Become a Master</h1>
      <p class="subtitle">Join our platform and showcase your expertise.</p>
    </div>

    <div class="form-container">
      <form @submit.prevent="submitApplication" class="application-form">
        <!-- Profile Picture Section -->
        <div class="profile-section">
          <div class="circle">
            <img :src="form.profilePicture || '/path/to/default-image.jpg'" alt="Profile" class="profile-img" />
          </div>

          <!-- Add, Change or Remove Picture Buttons -->
          <div class="button-group">
            <button v-if="!form.profilePicture" type="button" @click="$refs.profilePicInput.click()" class="add-profile-btn">Add Profile Picture</button>
            <div v-else class="profile-btns">
              <button type="button" @click="$refs.profilePicInput.click()" class="change-profile-btn">Change Picture</button>
              <button type="button" @click="removeProfilePicture" class="remove-profile-btn">Remove Picture</button>
            </div>
            <input type="file" ref="profilePicInput" @change="handleFileChange" accept="image/*" class="file-input" />
          </div>
        </div>

        <!-- Name Section -->
        <div class="name-section">
          <div class="input-group">
            <label for="firstName">Име</label>
            <input type="text" id="firstName" v-model="form.firstName" required placeholder="Внеси име" />
          </div>
          <div class="input-group">
            <label for="lastName">Презиме</label>
            <input type="text" id="lastName" v-model="form.lastName" required placeholder="Enter your last name" />
          </div>
        </div>

        <!-- Email and Phone -->
        <div class="input-group">
          <label for="email">E-маил адреса</label>
          <input type="email" id="email" v-model="form.email" required placeholder="Enter your email address" />
        </div>
        <div class="input-group">
          <label for="phone">Телефонски број</label>
          <input type="text" id="phone" v-model="form.phone" required placeholder="Enter your phone number" />
        </div>

        <!-- City Input -->
        <div class="input-group">
          <label for="city">Град / Општина</label>
          <input type="text" id="city" v-model="form.city" required placeholder="Внеси град" />
        </div>

        <!-- Password and Confirm Password -->
        <div class="input-group">
          <label for="password">Лозинка</label>
          <input type="password" id="password" v-model="form.password" required placeholder="Enter your password" />
        </div>
        <div class="input-group">
          <label for="confirmPassword">Потврди Лозинка</label>
          <input type="password" id="confirmPassword" v-model="form.confirmPassword" required placeholder="Confirm your password" />
        </div>

        <!-- Already have an account? Link -->
        <div class="account-link">
          <p>Already have an account? <span @click="redirectToLogin" class="link">Login here</span></p>
        </div>

        <!-- Continue Button -->
        <button type="submit" class="submit-btn">Continue</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Global Styles */
body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(145deg, #6b0f1a, #b91372); /* Vibrant gradient background */
  background-attachment: fixed;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #fff;
  overflow: hidden;
  position: relative;
}

/* Animated Background Layer */
body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.6));
  opacity: 0.6;
  z-index: -1;
}

/* Container Styling */
.become-master-container {
  padding: 60px 50px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  max-width: 900px;
  margin: 40px auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px);
  animation: fadeInContainer 1s ease-out;
  overflow: hidden;
  position: relative;
}

/* Title Section */
.title-section {
  text-align: center;
  margin-bottom: 50px;
  animation: fadeInTitle 1.5s ease-out;
}

.title-section h1 {
  font-size: 42px;
  font-weight: 700;
  color: #2a2a2a;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); /* Cool text shadow */
}

.subtitle {
  font-size: 18px;
  color: #777;
  font-weight: 400;
  letter-spacing: 1px;
  margin-top: 5px;
}

/* Form Container */
.form-container {
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadeInForm 1.5s ease-out forwards;
}

.application-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* Profile Section */
.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: slideIn 1s ease-out forwards;
}

.circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #4e73df;
  border: 4px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.circle:hover {
  border-color: #ff6a00;
  transform: scale(1.1);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* Profile Picture Buttons */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-btns {
  display: flex;
  gap: 20px; /* Align buttons next to each other */
}

.add-profile-btn, .change-profile-btn, .remove-profile-btn {
  background-color: #ff6a00;
  color: white;
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.add-profile-btn:hover, .change-profile-btn:hover, .remove-profile-btn:hover {
  background-color: #ee0979;
  transform: translateY(-2px);
}

.file-input {
  display: none;
}

/* Input Styling */
.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.input-group input {
  padding: 14px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #4e73df;
  box-shadow: 0 0 8px rgba(78, 115, 223, 0.2);
}

/* Link Styling */
.account-link {
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
}

.account-link .link {
  color: #ff6a00;
  cursor: pointer;
  font-weight: 600;
}

.account-link .link:hover {
  text-decoration: underline;
}

/* Submit Button */
.submit-btn {
  padding: 16px 28px;
  background-color: #ff6a00;
  color: white;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #ee0979;
  transform: scale(1.05);
}

/* Animations */
@keyframes fadeInForm {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInTitle {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInContainer {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .become-master-container {
    padding: 40px 30px;
  }

  .input-group input {
    width: 100%;
  }

  .name-section {
    flex-direction: column;
  }

  .circle {
    width: 120px;
    height: 120px;
  }

  .add-profile-btn {
    font-size: 14px;
    padding: 10px 20px;
  }
}
</style>
