<script setup>
setTimeout(function () {
      // Add transition to preloader to fade out
      document.getElementById('preloader').style.opacity = '0'; // Make preloader fade out
      document.getElementById('preloader').style.visibility = 'hidden'; // Hide it completely after fading
      document.body.style.overflow = 'auto'; // Allow scrolling after loading
      
      // Trigger the page content to smoothly fade in
      document.querySelector('.hero').classList.add('visible'); // Add class to trigger smooth transition
  }, 1500);
</script>

<template>
    <section id="preloader">
        <div class="dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    </section>
</template>

<style scoped>
#preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #212529; /* Slight transparency */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensures it's on top of all other elements */
  opacity: 1;
  visibility: visible;
  transition: opacity 1s ease, visibility 0s 1s; /* Fade-out with delay */
}

.dots {
  display: flex;
  gap: 10px;
  align-items: center;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffc107; /* Blue color */
  animation: bounce 1.5s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

/* Bounce animation for dots */
@keyframes bounce {
  0%, 100% {
      transform: translateY(0);
  }
  50% {
      transform: translateY(-20px);
  }
}

</style>