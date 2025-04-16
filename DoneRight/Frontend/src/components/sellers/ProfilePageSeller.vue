<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  password: "",
  confirmPassword: "",
});

const router = useRouter();

const submitApplication = () => {
  router.push("/next-form");
};

const redirectToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="become-master-container">
      <h1 class="title">Стани Мајстор</h1>
      <p class="subtitle">Придружете се и споделете ги вашите знаења со нас.</p>

      <form @submit.prevent="submitApplication" class="application-form">
        <div class="form-grid">
          <div class="input-group">
            <input type="text" id="firstName" v-model="form.firstName" required />
            <label for="firstName">Име</label>
          </div>

          <div class="input-group">
            <input type="text" id="lastName" v-model="form.lastName" required />
            <label for="lastName">Презиме</label>
          </div>

          <div class="input-group">
            <input type="email" id="email" v-model="form.email" required />
            <label for="email">Емајл адреса</label>
          </div>

          <div class="input-group">
            <input type="text" id="phone" v-model="form.phone" required />
            <label for="phone">Телефонски број</label>
          </div>

          <div class="input-group">
            <input type="text" id="city" v-model="form.city" required />
            <label for="city">Град</label>
          </div>

          <div class="input-group">
            <input type="password" id="password" v-model="form.password" required />
            <label for="password">Лозинка</label>
          </div>
        </div>

        <p class="account-link">
          Имате веќе сметка? <span @click="redirectToLogin" class="link">Логирајте се тука</span>
        </p>

        <button type="submit" class="submit-btn">Продолжи</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Background Animation */
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

/* Overlay for a sleek effect */
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

/* When input is focused or has text */
.input-group input:focus + label,
.input-group input:valid + label {
  top: -2px; /* Moves label up */
  left: 5px;
  font-size: 12px;
  color: white; /* Matches form background */
  padding: 0 5px;
  
}

/* 👇 This removes ONLY the part of the border behind the label */
.input-group::before {
  content: "";
  position: absolute;
  top: 8px;
  left: 8px;
  width: 60px; /* Adjust based on label width */
  height: 14px;
  background-color: #212529; /* Same as form background */
  z-index: 1;
  transition: 0.3s;
  opacity: 0;
}

/* Show the "border cutout" when label is up */
.input-group input:focus ~ ::before,
.input-group input:valid ~ ::before {
  opacity: 1;
}

/* Account Link */
.account-link {
  font-size: 14px;
  margin-top: 25px;
  color: #ddd;
}

.account-link .link {
  color: #ffc107;
  cursor: pointer;
  font-weight: 600;
}

.account-link .link:hover {
  text-decoration: underline;
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

/* Responsiveness */
@media (max-width: 480px) {
  .become-master-container {
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
  
  .input-group{
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
