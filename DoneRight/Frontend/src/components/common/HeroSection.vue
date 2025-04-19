<script setup>
const scrollToNext = () => {
  const next = document.getElementById('next-section')
  if (next) {
    next.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="hero-banner">
    <div class="overlay"></div>
    <div class="hero-content animate-fade">
      <p class="tagline"># Поврзи се лесно</p>
      <h1 class="hero-title">
        Најди го <span class="highlight">најдобриот мајстор</span><br />
        за било што, било кога.
      </h1>
      <p class="hero-subtitle">
        Поврзуваме професионалци со муштерии со само неколку клика.
      </p>
      <v-btn
        color="warning"
        size="large"
        rounded
        class="hero-cta text-black text-capitalize"
        @click="scrollToNext"
      >
        Побарај
        <v-icon end>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </div>

  <div id="next-section"></div>
</template>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/SOS.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.82);
  z-index: 1;
  backdrop-filter: blur(2px);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 880px;
  padding: 30px;
  color: white;
  animation: fadeInUp 1.3s ease-out;
}

.tagline {
  font-size: 1rem;
  color: #ffc107;
  font-weight: 600;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  margin-bottom: 16px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.hero-title {
  font-size: 3.8rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 22px;
  letter-spacing: -0.5px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

.highlight {
  background: linear-gradient(to right, #ffc107, #ff9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 16px rgba(255, 193, 7, 0.4);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #dddddd;
  margin-bottom: 36px;
  line-height: 1.7;
  max-width: 720px;
  margin-inline: auto;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.hero-cta {
  font-weight: 700;
  font-size: 1.1rem;
  padding: 14px 36px;
  box-shadow: 0 8px 20px rgba(255, 193, 7, 0.35);
  transition: all 0.3s ease;
}

.hero-cta:hover {
  background: linear-gradient(135deg, #ffdd33, #e3a600);
  transform: scale(1.07);
  box-shadow: 0 14px 30px rgba(255, 193, 7, 0.45);
}

/* Fade animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.6rem;
  }

  .hero-subtitle {
    font-size: 1.05rem;
  }

  .tagline {
    font-size: 0.9rem;
  }

  .hero-cta {
    font-size: 1rem;
    padding: 12px 24px;
  }
}

@media (max-width: 500px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    margin-bottom: 24px;
  }

  .hero-cta {
    font-size: 0.95rem;
    padding: 10px 20px;
  }
}
</style>
