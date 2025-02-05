<template>
  <div class="edit-profile-container">
    <h1>Edit Your Profile</h1>

    <form @submit.prevent="submitChanges" class="edit-profile-form">
      <div class="input-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model="profile.firstName" placeholder="Enter your first name" />
      </div>

      <div class="input-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="profile.lastName" placeholder="Enter your last name" />
      </div>

      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="profile.email" placeholder="Enter your email" />
      </div>

      <div class="input-group">
        <label for="phone">Phone</label>
        <input type="text" id="phone" v-model="profile.phone" placeholder="Enter your phone number" />
      </div>

      <div class="input-group">
        <label for="city">City</label>
        <input type="text" id="city" v-model="profile.city" placeholder="Enter your city" />
      </div>

      <div class="input-group">
        <label for="profilePicture">Profile Picture</label>
        <input type="file" id="profilePicture" @change="handleFileChange" />
        <div v-if="profile.profilePicture">
          <img :src="profile.profilePicture" alt="Profile Picture" class="profile-preview" />
        </div>
      </div>

      <button type="submit" class="submit-btn">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Sample initial profile data
const profile = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: Number(''),
  profilePicture: null,
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    profile.value.profilePicture = URL.createObjectURL(file); // Store the file for preview
  }
};

const submitChanges = () => {
  // Logic to update profile (e.g., save to the server)
  console.log('Profile updated:', profile.value);
  alert('Your profile has been updated!');
  // Optionally, you can navigate back to the profile page after saving changes
   router.push('/'); // Uncomment if you have a profile page to navigate back to
};
</script>

<style scoped>
.edit-profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.edit-profile-container h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}

.edit-profile-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 1rem;
  margin-bottom: 5px;
}

.input-group input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.input-group input:focus {
  outline: none;
  border-color: #4e73df;
}

.profile-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 50%;
}

.submit-btn {
  padding: 12px 20px;
  background-color: #4e73df;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #365a8a;
}
</style>
