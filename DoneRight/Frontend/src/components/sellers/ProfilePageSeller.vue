<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import DefaultProfilePicture from "@/assets/DefaultProfilePicture.jpg";

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
    form.value.profilePicture = URL.createObjectURL(file);
  }
};

const removeProfilePicture = () => {
  form.value.profilePicture = null;
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
  <div class="body">
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
            <img :src="form.profilePicture || DefaultProfilePicture" alt="Profile" class="profile-img" />
          </div>
          <div class="button-group">
            <button v-if="!form.profilePicture" type="button" @click="$refs.profilePicInput.click()" class="add-profile-btn">Add Profile Picture</button>
            <div v-else class="profile-btns">
              <button type="button" @click="$refs.profilePicInput.click()" class="change-profile-btn">Change</button>
              <button type="button" @click="removeProfilePicture" class="remove-profile-btn">Remove</button>
            </div>
            <input type="file" ref="profilePicInput" @change="handleFileChange" accept="image/*" class="file-input" />
          </div>
        </div>

        <!-- Grid Layout for Input Fields -->
        <div class="form-grid">
          
          <!-- First Name -->
<!-- Grid Layout for First Name and Last Name -->
<div class="name-section">
  <!-- First Name -->
  <div class="input-group">
    <input type="text" id="firstName" v-model="form.firstName" required />
    <label for="firstName">Име</label>
  </div>

  <!-- Last Name -->
  <div class="input-group">
    <input type="text" id="lastName" v-model="form.lastName" required />
    <label for="lastName">Презиме</label>
  </div>
</div>

          <!-- Phone -->
          <div class="phone-city-section">
  <div class="input-group">
    <input type="text" id="phone" name="phone" required>
    <label for="phone">Телефонски број</label>
  </div>
  <div class="input-group">
    <input type="text" id="city" name="city" required>
    <label for="city">Град / Општина</label>
  </div>
</div>

          <!-- Email -->

          <div class="ko">
          <div class="input-group">
            <input type="email" id="email" v-model="form.email" required />
            <label for="email">Емајл</label>
          </div>

          <div class="input-group">
    <input type="text" id="city" name="city" required>
    <label for="city">Адреса</label>
  </div>
</div>

          



          <div class="password-section">
          <!-- Password -->
          <div class="input-group">
    <input type="password" id="password" v-model="form.password" required />
    <label for="password">Лозинка</label>
  </div>

          <!-- Confirm Password -->
          <div class="input-group">
    <input type="password" id="confirmPassword" v-model="form.confirmPassword" required />
    <label for="confirmPassword">Потврди лозинка</label>
  </div>
        </div>
      </div>

        

        <!-- Already have an account? Link -->
        <div class="account-link">
          <p>Already have an account? <span @click="redirectToLogin" class="link">Login here</span></p>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-btn">Continue</button>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>
/* Global Styles */

/* Global Styles */
.body {
  font-family: 'Poppins', sans-serif;
  background-color: #283242;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
}

/* Container Styling */
.become-master-container {
  padding: 30px 20px; /* Further reduced padding */
  background-color: #ffffff;
  border-radius: 15px;
  max-width: 550px; /* Decreased max width */
  margin: 20px auto; /* Adjusted margin */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  animation: fadeInContainer 1s ease-out;
  overflow: hidden;
  position: relative;
}

@media (max-width: 768px) {
  .become-master-container {
    padding: 20px 10px; /* Further reduce padding on small screens */
    max-width: 85%; /* Make it responsive */
  }
}
/* Title Section */
.title-section {
  text-align: center;
}

.title-section h1 {
  font-size: 42px;
  font-weight: 700;
  color: #4a90e2;
  text-shadow: 2px 2px 8px rgba(74, 144, 226, 0.2);
}

.subtitle {
  font-size: 18px;
  color: #6c757d;
  font-weight: 400;
  letter-spacing: 1px;
}

/* Form Container */
.form-container {
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  opacity: 0;
  animation: fadeInForm 1.5s ease-out forwards;
}

.application-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* Ensure profile picture stays on the left */
.circle {
  flex-shrink: 0; /* Prevents shrinking */
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #777;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.circle:hover {
  border-color: #007bff;

}

/* Profile Picture Buttons */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-btns {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.add-profile-btn, 
.change-profile-btn, 
.remove-profile-btn {
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  font-size: 15px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.add-profile-btn:hover, 
.change-profile-btn:hover, 
.remove-profile-btn:hover {
  background-color: #0056b3;
}

.file-input {
  display: none;
}

/* Responsive Fix for Small Screens */
@media (max-width: 768px) {
  .profile-section {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .circle{
    height: 110px;
    width: 110px;
  }

  .profile-section .profile-btns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }

  .add-profile-btn, .change-profile-btn, .remove-profile-btn {
    width: 100%;
    font-size: 14px;
    padding: 10px 16px;
  }
}

.file-input {
  display: none;
}

/* Name Section */
.name-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* Input Group */
.input-group {
  position: relative;
  margin-bottom: 13px;
  width: 83%;
}

.input-group#email{
  width: 90%;
}

.phone-city-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.ko{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* Password and Confirm Password Section */
.password-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .password-section {
    grid-template-columns: 1fr;
    gap: 0px;
  }

  .ko{
    grid-template-columns: 1fr;
    gap: 0px;
  }
}


.input-group input {
  padding: 16px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  transition: all 0.3s ease;
}

.input-group input:focus {
  border-color: #000000;
  background-color: white;
  box-shadow: 0 0 5px rgba(245, 0, 0, 0.9);
}

/* Floating Label */
.input-group label {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #777;
  pointer-events: none;
  transition: all 0.3s ease;
  background-color: white;
  padding: 0 5px;
}

/* When input is focused or has content, move label up */
.input-group input:focus + label,
.input-group input:valid + label {
  top: 0.01px;
  left: 14px;
  font-size: 12px;
  color: #777;
}

/* Account Link */
.account-link {
  text-align: center;
  font-size: 16px;
}

.account-link .link {
  color: #007bff;
  cursor: pointer;
  font-weight: 600;
}

.account-link .link:hover {
  text-decoration: underline;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* Submit Button */
.submit-btn {
  padding: 16px 28px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
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

@keyframes fadeInContainer {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .name-section {
    grid-template-columns: 1fr;
    gap: 0px;
  }

  .profile-btns {
    flex-direction: column;
    gap: 10px;
  }

  .add-profile-btn, .change-profile-btn, .remove-profile-btn {
    width: 100%;
    font-size: 14px;
    padding: 10px 16px;
  }

  .become-master-container {
    padding: 10px 30px;
  }

  .input-group label {
    font-size: 14px;
  }

  .input-group input {
    font-size: 14px;
    padding: 12px;
  }

  .phone-city-section {
    grid-template-columns: 1fr;
    gap: 0px;
  }
}


</style>
