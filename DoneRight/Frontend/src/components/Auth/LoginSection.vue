<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!");
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

const redirectToRegister = () => {
  router.push("/apply");
};
</script>

<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="login-container">
      <h1 class="title">Најава</h1>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <input type="email" id="email" v-model="form.email" required />
          <label for="email">Емајл адреса</label>
        </div>

        <div class="input-group">
          <input type="password" id="password" v-model="form.password" required />
          <label for="password">Лозинка</label>
        </div>

        <p class="account-link">
          Немате профил? <span @click="redirectToRegister" class="link">Регистрирај се</span>
        </p>

        <button type="submit" class="submit-btn">Најави се</button>
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
.login-container {
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
}

/* Input Fields */
.input-group {
  position: relative;
  width: 92%;
  margin-bottom: 15px;
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
}

.input-group input:focus + label,
.input-group input:valid + label {
  top: -2px;
  left: 5px;
  font-size: 12px;
  color: white;
}

/* Account Link */
.account-link {
  font-size: 14px;
  margin-top: 20px;
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
  .login-container {
    padding: 20px;
    max-width: 75%;
  }

  .title {
    font-size: 22px;
  }

  .input-group input {
    font-size: 16px;
    padding: 12px;
  }

  .submit-btn {
    font-size: 14px;
    padding: 12px;
  }
}
</style>
