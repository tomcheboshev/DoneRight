<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const profile = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  profilePicture: null,
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    profile.value.profilePicture = URL.createObjectURL(file);
  }
};

const submitChanges = () => {
  console.log("Profile updated:", profile.value);
  alert("Your profile has been updated!");
  router.push("/profile");
};
</script>

<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="edit-profile-container">
      <h1 class="title">Edit Your Profile</h1>

      <form @submit.prevent="submitChanges" class="edit-profile-form">
        <div class="form-grid">
          <div class="input-group">
            <input type="text" id="firstName" v-model="profile.firstName" required />
            <label for="firstName">First Name</label>
          </div>

          <div class="input-group">
            <input type="text" id="lastName" v-model="profile.lastName" required />
            <label for="lastName">Last Name</label>
          </div>

          <div class="input-group">
            <input type="email" id="email" v-model="profile.email" required />
            <label for="email">Email</label>
          </div>

          <div class="input-group">
            <input type="text" id="phone" v-model="profile.phone" required />
            <label for="phone">Phone</label>
          </div>

          <div class="input-group">
            <input type="text" id="city" v-model="profile.city" required />
            <label for="city">City</label>
          </div>

          <div class="input-group file-upload">
            <input type="file" id="profilePicture" @change="handleFileChange" />
            <label for="profilePicture">Upload Profile Picture</label>
          </div>

          <div v-if="profile.profilePicture" class="profile-preview-container">
            <img :src="profile.profilePicture" alt="Profile Picture" class="profile-preview" />
          </div>
        </div>

        <button type="submit" class="submit-btn">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Background */
.background {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #212529;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Overlay Effect */
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

/* Form Container */
.edit-profile-container {
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
  text-align: center;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Title */
.title {
  font-size: 24px;
  font-weight: 700;
  color: #ffc107;
  margin-bottom: 15px;
}

/* Form Grid */
.form-grid {
  display: grid;
  gap: 12px;
}

/* Input Fields */
.input-group {
  position: relative;
  width: 92%;
}

.input-group input {
  width: 100%;
  padding: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transition: 0.3s;
  margin-top: 6px;
}

/* Highlight border on focus */
.input-group input:focus {
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  border-color: #ffc107;
}

/* Floating Label */
.input-group label {
  position: absolute;
  top: 54%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #ddd;
  transition: 0.3s;
  pointer-events: none;
  background: transparent;
  padding: 0 5px;
}

/* Floating Label Effect */
.input-group input:focus + label,
.input-group input:valid + label {
  top: -2px;
  left: 5px;
  font-size: 12px;
  color: white;
  padding: 0 5px;
}

/* File Upload */
.file-upload input {
  display: none;
}

.file-upload label {
  display: block;
  padding: 12px;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.file-upload label:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Profile Picture Preview */
.profile-preview-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.profile-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ffc107;
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

/* Responsive Design */
@media (max-width: 480px) {
  .edit-profile-container {
    padding: 20px;
    max-width: 75%;
    margin-top: 30px;
  }

  .title {
    font-size: 22px;
  }

  .input-group input {
    font-size: 16px;
    padding: 12px;
  }

  .input-group {
    width: 91%;
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
