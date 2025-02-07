<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PreloaderSection from "@/components/common/PreloaderSection.vue"; // Preloader component

const router = useRouter();

const form = ref({
  services: [],
  description: "",
  images: [],
  experience: "",
  price: "",
});

const availableServices = [
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
  "SEO Optimization",
  "App Development",
  "Photography",
  "Writing",
  "Illustration",
  "Consulting",
  "Copywriting",
  "Translation",
  "UI/UX Design",
  "Branding",
  "Video Production",
  "Other",
];

// Submit Form Data
const submitMasterProfile = () => {
  if (form.value.services.length === 0) {
    alert("Please select at least one service.");
    return;
  }
  
  console.log(form.value);  // Handle form data

  // Redirect to confirmation or next step
  router.push("/profile-success");
};

// Redirect to the previous form
const redirectToPreviousForm = () => {
  router.push("/previous-form");
};
</script>

<template>
  <PreloaderSection />
  <div class="next-form-container">
    <div class="title-section">
      <h1>Set Your Services</h1>
      <p class="subtitle">Choose the services you're capable of and add more details about yourself.</p>
    </div>

    <div class="form-container">
      <form @submit.prevent="submitMasterProfile" class="master-profile-form">
        
        <!-- Service Selection -->
        <div class="service-section">
          <h3>Select Your Services</h3>
          <div class="service-dropdown">
            <label for="services">Select Services</label>
            <select
              v-model="form.services"
              id="services"
              multiple
              class="service-dropdown-input"
            >
              <option v-for="(service, index) in availableServices" :key="index" :value="service">
                {{ service }}
              </option>
            </select>
          </div>
        </div>

        <!-- Description -->
        <div class="input-group">
          <label for="description">Tell Us About Yourself</label>
          <textarea
            id="description"
            v-model="form.description"
            required
            placeholder="Write a short description of yourself and your experience"
          ></textarea>
        </div>

        <!-- Experience Input -->
        <div class="input-group">
          <label for="experience">Experience (in years)</label>
          <input
            type="text"
            id="experience"
            v-model="form.experience"
            required
            placeholder="How many years of experience do you have?"
          />
        </div>

        <!-- Price Input -->
        <div class="input-group">
          <label for="price">Price per Service ($)</label>
          <input
            type="number"
            id="price"
            v-model="form.price"
            required
            placeholder="Set your price per service"
          />
        </div>

        <!-- Submit Button -->
        <button type="submit" @click="router.push('/success')" class="submit-btn">Submit Profile</button>
      </form>

      <button class="back-btn" @click="redirectToPreviousForm">Go Back</button>
    </div>
  </div>
</template>

<style scoped>
/* Main container */
.next-form-container {
  padding: 60px 50px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border-radius: 20px;
  max-width: 1000px;
  margin: 30px auto;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  animation: fadeInForm 1s ease-in-out;
}

.title-section {
  text-align: center;
  margin-bottom: 40px;
}

.title-section h1 {
  font-size: 42px;
  font-weight: 700;
}

.subtitle {
  font-size: 18px;
  color: #f0f0f0;
}

/* Form container */
.form-container {
  background-color: #ffffff;
  padding: 40px 50px;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Form Fields */
.master-profile-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* Dropdown Styling */
.service-dropdown {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.service-dropdown label {
  font-size: 16px;
  color: #333;
}

.service-dropdown-input {
  padding: 15px;
  font-size: 16px;
  border-radius: 10px;
  border: 2px solid #ddd;
  background-color: #f9f9f9;
  color: #333;
  cursor: pointer;
}

.service-dropdown-input:focus {
  border-color: #4e73df;
  outline: none;
  box-shadow: 0 0 5px rgba(78, 115, 223, 0.3);
}

/* Textarea and Input Styling */
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

.input-group input,
.input-group textarea {
  padding: 14px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #4e73df;
  box-shadow: 0 0 8px rgba(78, 115, 223, 0.2);
}

/* Button Styling */
.submit-btn {
  padding: 16px 28px;
  background-color: #4e73df;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #365a8a;
  transform: scale(1.05);
}

.back-btn {
  background-color: #ddd;
  padding: 12px 20px;
  font-size: 16px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #ccc;
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

/* Responsive Design */
@media (max-width: 768px) {
  .next-form-container {
    padding: 30px;
  }

  .service-dropdown-input {
    width: 100%;
  }
}
</style>
