<script setup>
import { onMounted } from "vue";
import confetti from "canvas-confetti";
import { useRouter } from "vue-router";

const router = useRouter();

// Function to launch confetti effect
const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
  });
};

onMounted(() => {
  launchConfetti();
});

// Redirect functions
const goToDashboard = () => {
  router.push("/dashboard");
};

const exploreServices = () => {
  router.push("/services");
};
</script>

<template>
  <div class="success-container">
    <div class="success-card">
      <h1>🎉 Congratulations!</h1>
      <p>Your application has been successfully submitted.</p>

      <!-- Cool Success Animation -->
      <div class="emoji-animation">✅</div>

      <!-- Action Buttons -->
      <div class="button-group">
        <button @click="goToDashboard" class="dashboard-btn">Go to Dashboard</button>
        <button @click="exploreServices" class="explore-btn">Explore Services</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fullscreen Background */
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff6a00, #ee0979);
  animation: fadeIn 1s ease-in-out;
}

/* Success Card */
.success-card {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  animation: popIn 0.8s ease-in-out;
}

/* Title */
h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 15px;
}

/* Subtitle */
p {
  font-size: 18px;
  color: #555;
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
  justify-content: center;
  gap: 15px;
}

/* Buttons */
.dashboard-btn, .explore-btn {
  padding: 12px 20px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s;
}

.dashboard-btn {
  background: #4e73df;
  color: white;
}

.dashboard-btn:hover {
  background: #3758a0;
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
    transform: translateY(-10px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
