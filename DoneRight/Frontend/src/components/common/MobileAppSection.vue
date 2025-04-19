<script setup>
import QrCodeImage from '@/assets/QR.png'
</script>

<template>
  <section id="mobile-app" class="mobile-app-section">
    <div class="content">
      <div class="text-content">
        <h1>📱 Преземете ја нашата мобилна апликација</h1>
        <p>
          Најдете ги најдобрите професионалци во секое време и насекаде со нашата мобилна апликација.<br>
          Достапна за iOS и Android уреди.
        </p>

        <div class="app-buttons">
          <a href="#" class="app-store">
            <font-awesome-icon :icon="['fab', 'apple']" class="app-icon" />
            App Store
          </a>
          <a href="#" class="play-store">
            <font-awesome-icon :icon="['fab', 'google-play']" class="app-icon" />
            Google Play
          </a>
        </div>
      </div>

      <div class="qr-code-content">
        <img :src="QrCodeImage" alt="Преземи QR Код" class="qr-code-img" />
      </div>
    </div>
  </section>
</template>

<style scoped>

  .mobile-app-section {
  background: linear-gradient(135deg, #1f1f1f, #121212);
  padding: 50px 30px;
  color: #fff;
  border-radius: 24px;
  margin: 40px auto;
  max-width: 1200px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
}

.text-content {
  flex: 1;
  min-width: 300px;
  padding: 10px;
  animation: fadeInLeft 1s ease;
}

.text-content h1 {
  font-size: 2.8rem;
  color: #ffc107;
  font-weight: 800;
  margin-bottom: 18px;
  text-shadow: 0 0 6px rgba(255, 193, 7, 0.4);
}

.text-content p {
  font-size: 1.2rem;
  line-height: 1.7;
  color: #dddddd;
  margin-bottom: 32px;
  max-width: 620px;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}

.app-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.app-buttons a {
  background: #ffc107;
  color: #121212;
  padding: 14px 26px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(255, 193, 7, 0.3);
  border: 2px solid transparent;
}

.app-buttons a:hover {
  background: #e3a300;
  transform: translateY(-4px) scale(1.04);
  box-shadow: 0 12px 28px rgba(255, 193, 7, 0.45);
  border-color: rgba(255, 193, 7, 0.3);
}

.qr-code-content {
  flex: 1;
  text-align: center;
  animation: fadeInRight 1s ease;
}

.qr-code-img {
  max-width: 280px;
  width: 100%;
  border-radius: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qr-code-img:hover {
  transform: scale(1.06);
  box-shadow: 0 14px 32px rgba(255, 193, 7, 0.25);
}

/* Animations */
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .qr-code-content {
    margin-top: 30px;
  }

  .text-content h1 {
    font-size: 2.3rem;
  }

  .app-buttons {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .text-content p {
    font-size: 1.05rem;
  }

  .text-content h1 {
    font-size: 1.9rem;
  }

  .qr-code-img {
    max-width: 180px;
  }

  .app-buttons a {
    font-size: 1rem;
    padding: 12px 20px;
  }
}
</style>

