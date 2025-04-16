<template>
  <div class="background">
    <div class="overlay"></div>
    <div class="success-card">
      <h1>🎉 Честитки!</h1>
      <p>Вашата апликација е успешно поднесена.</p>

      <!-- Confetti Animation -->
      <div class="emoji-animation">🎊</div>

      <!-- Action Buttons -->
      <div class="button-group">
        <button @click="goToDashboard" class="dashboard-btn">Оди на Дашборд</button>
        <button @click="exploreServices" class="explore-btn">Истражи Услуги</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import confetti from "canvas-confetti";
import { useRouter } from "vue-router";

const router = useRouter();

// Function to launch confetti effect
const launchConfetti = () => {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 },
  });
};

onMounted(() => {
  launchConfetti();
});

// Redirect functions
const goToDashboard = () => {
  router.push("/seller-dashboard");
};

const exploreServices = () => {
  router.push("/services");
};
</script>

<style scoped>
/* Background */
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #212529;
  padding: 20px;
  overflow: hidden;
}

/* Overlay */
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
}

/* Success Card */
.success-card {
  position: relative;
  background: rgba(255, 255, 255, 0.12);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  max-width: 450px;
  width: 100%;
  text-align: center;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: popIn 0.7s ease-in-out;
}

/* Title */
h1 {
  font-size: 30px;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
}

/* Subtitle */
p {
  font-size: 16px;
  color: #f1f1f1;
  margin-bottom: 20px;
}

/* Emoji Animation */
.emoji-animation {
  font-size: 60px;
  margin-bottom: 20px;
  animation: bounce 1s infinite;
}

/* Button Group */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Buttons */
.dashboard-btn, .explore-btn {
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s;
  width: 100%;
  border: none;
}

.dashboard-btn {
  background: #2c3e50;
  color: white;
}

.dashboard-btn:hover {
  background: #1c2833;
}

.explore-btn {
  background: #ff6a00;
  color: white;
}

.explore-btn:hover {
  background: #d95b00;
}

/* Animations */
@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* 🔥 RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .success-card {
    max-width: 90%;
    padding: 30px;
  }

  h1 {
    font-size: 24px;
  }

  p {
    font-size: 14px;
  }

  .emoji-animation {
    font-size: 50px;
  }

  .dashboard-btn, .explore-btn {
    font-size: 15px;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .success-card {
    max-width: 95%;
    padding: 25px;
  }

  h1 {
    font-size: 22px;
  }

  p {
    font-size: 13px;
  }

  .emoji-animation {
    font-size: 45px;
  }

  .dashboard-btn, .explore-btn {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
