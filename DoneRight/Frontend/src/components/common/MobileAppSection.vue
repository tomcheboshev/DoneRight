<script setup>
import QrCodeImage from '@/assets/QR.png'
</script>

<template>
  <section id="mobile-app" class="mobile-app-section">
        <div class="content">
            <div class="text-content">
                <h1>Преземете ја нашата мобилна апликација</h1>
                <p>Најдете ги најдобрите професионалци во секое време и насекаде со нашата мобилна апликација. Достапно за iOS и Android.</p>
                <div class="app-buttons">
                    <a href="#" class="app-store"><font-awesome-icon :icon="['fab', 'apple']" class="app-icon"/> App Store</a>
                    <a href="#" class="play-store"><font-awesome-icon :icon="['fab', 'google-play']" class="app-icon"/> Google Play</a>
                </div>
            </div>
            <div class="qr-code-content">
                <img :src="QrCodeImage" alt="Преземи QR Код" class="qr-code-img">
            </div>
        </div>
    </section>
</template>

<style scoped>
.mobile-app-section {
  background-color: #212529;
  color: white;
  padding: 70px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 15px;
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  flex-wrap: wrap;
}

/* Стилови за содржината */
.mobile-app-section .content {
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 2;
}

.mobile-app-section .text-content {
  flex: 1;
  max-width: 50%;
  text-align: center;
  padding: 10px;
}

.mobile-app-section .text-content h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #ffc107;
  animation: fadeIn 1.5s ease-in-out;
}

.mobile-app-section .text-content p {
  font-size: 1.2rem;
  margin-bottom: 25px;
  line-height: 1.5;
  animation: fadeIn 1.5s ease-in-out 0.5s;
}

/* Стилови за копчињата */
.mobile-app-section .app-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.mobile-app-section .app-buttons a {
  text-decoration: none;
  background: #ffc107;
  color: #212529;
  padding: 18px 28px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.4s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.mobile-app-section .app-buttons a:hover {
  transform: translateY(-5px) scale(1.1);
  background: #e6a700;
}

/* Стилови за QR кодот */
.mobile-app-section .qr-code-content {
  flex: 1;
  max-width: 50%;
  text-align: center;
  padding: 10px;
}

.mobile-app-section .qr-code-img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

/* Респонзивен дизајн */
@media (max-width: 1200px) {
  .mobile-app-section {
    margin: 50px 20px;
  }
}

@media (max-width: 1024px){
  .mobile-app-section .qr-code-content {
    display: none;
  }
  .mobile-app-section .text-content {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .mobile-app-section {
    flex-direction: column;
    padding: 50px 15px;
  }

  .mobile-app-section .text-content {
    max-width: 100%;
    text-align: center;
  }

  .mobile-app-section .qr-code-content {
    margin-top: 20px;
    text-align: center;
  }
  
  .mobile-app-section .qr-code-img {
    max-width: 60%;
  }
}
</style>
