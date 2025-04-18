<script setup>
</script>

<template>
  <section class="hero" id="hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>Најди го најдобриот мајстор за било што, било кога.</h1>
      <p class="subtitle">Поврзуваме професионалци со муштерии со само неколку клика.</p>
      <button class="explore-btn">Побарај</button>
    </div>
  </section>
</template>

<style scoped>
/* HERO SECTION */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 200px 20px;
  background: #212529;
  color: white;
  position: relative;
  overflow: hidden;
}

/* Позадински ефект */
.hero-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);

}

/* КОНТЕНТ - ТЕКСТ И КОПЧЕ */
.hero-content {
  max-width: 800px;
  z-index: 2;
  animation: zoomFadeIn 1.5s ease-in-out;
}

.hero h1 {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 3px 3px 15px rgba(255, 193, 7, 0.5);
  animation: textGlow 2s infinite alternate;
}

.subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
  margin-bottom: 40px;
  animation: fadeIn 1.5s ease-in-out;
}

/* Копче */
.explore-btn {
  background: linear-gradient(135deg, #ffc107, #ad8409);
  color: white;
  font-size: 1.5rem;
  padding: 15px 40px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s, background 0.3s;
  animation: pulseGlow 1.5s infinite alternate;
}

.explore-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 15px 30px rgba(255, 193, 7, 0.4);
  background: linear-gradient(135deg, #ffdd33, #c8950a);
}



/* --- Анимации --- */
@keyframes zoomFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes textGlow {
  from {
    text-shadow: 3px 3px 15px rgba(255, 193, 7, 0.4);
  }
  to {
    text-shadow: 5px 5px 25px rgba(255, 193, 7, 0.6);
  }
}

@keyframes pulseGlow {
  from {
    box-shadow: 0 10px 20px rgba(255, 193, 7, 0.3);
  }
  to {
    box-shadow: 0 15px 30px rgba(255, 193, 7, 0.5);
  }
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero {
    padding: 150px 10px;
  }

  .hero h1 {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .explore-btn {
    font-size: 1.2rem;
    padding: 12px 30px;
  }
}
</style>
