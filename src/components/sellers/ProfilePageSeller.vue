<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";  // Import Vue Router for navigation
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

const router = useRouter();  // Create router instance for navigation

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.profilePicture = URL.createObjectURL(file); // Store the file for preview
  }
};

const submitApplication = () => {
  // Validation for matching passwords
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Redirect to the next form page
  router.push("/next-form");  // Navigate to another page (adjust to your route)
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
          <button type="button" @click="$refs.profilePicInput.click()" class="add-profile-btn">Add Profile Picture</button>
          <input type="file" ref="profilePicInput" @change="handleFileChange" accept="image/*" class="file-input" />
        </div>

        <!-- Name Section -->
        <div class="name-section">
          <div class="input-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" v-model="form.firstName" required placeholder="Enter your first name" />
          </div>
          <div class="input-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" v-model="form.lastName" required placeholder="Enter your last name" />
          </div>
        </div>

        <!-- Email and Phone -->
        <div class="input-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="form.email" required placeholder="Enter your email address" />
        </div>
        <div class="input-group">
          <label for="phone">Phone Number</label>
          <input type="text" id="phone" v-model="form.phone" required placeholder="Enter your phone number" />
        </div>

        <!-- City Input -->
        <div class="input-group">
          <label for="city">City</label>
          <input type="text" id="city" v-model="form.city" required placeholder="Enter your city" />
        </div>

        <!-- Password and Confirm Password -->
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" required placeholder="Enter your password" />
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
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
/* Body Styling */
body {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  background-attachment: fixed;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #fff;
}

/* Container Styling */
.become-master-container {
  padding: 60px 50px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  max-width: 900px;
  margin: 30px auto;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.5s ease;
}

/* Title Section */
.title-section {
  text-align: center;
  margin-bottom: 40px;
}

.title-section h1 {
  font-size: 40px;
  font-weight: 700;
  color: #2a2a2a;
}

.subtitle {
  font-size: 18px;
  color: #777;
  font-weight: 400;
  letter-spacing: 1px;
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
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
}

.circle {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ddd;
  border: 3px solid #4e73df;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.add-profile-btn {
  background-color: #4e73df;
  color: white;
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.add-profile-btn:hover {
  background-color: #365a8a;
}

.file-input {
  display: none;
}

/* Name Section */
.name-section {
  display: flex;
  gap: 30px;
}

.name-section .input-group {
  flex: 1;
}

/* Input Group Styling */
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
}

.input-group input:focus {
  outline: none;
  border-color: #4e73df;
  box-shadow: 0 0 8px rgba(78, 115, 223, 0.2);
}

/* Already have an account? Section */
.account-link {
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
}

.account-link .link {
  color: #4e73df;
  cursor: pointer;
  font-weight: 600;
}

.account-link .link:hover {
  text-decoration: underline;
}

/* Submit Button */
.submit-btn {
  padding: 16px 28px;
  background-color: #4e73df;
  color: white;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #365a8a;
  transform: scale(1.05);
}

/* Animations */
@keyframes fadeInForm {
  0% {
    opacity: 0;
  }
  100% {
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
    width: 110px;
    height: 110px;
  }

  .add-profile-btn {
    font-size: 14px;
    padding: 10px 20px;
  }
}
</style>
