<script setup>
import QrCodeImage from '@/assets/QR.png'

</script>
<template>
  <section id="mobile-app" class="mobile-app-section">
        <div class="content">
            <div class="text-content">
                <h1>Download Our Mobile App</h1>
                <p>Experience convenience on the go! Find the best professionals anytime, anywhere, with our mobile app. Available on both iOS and Android.</p>
                <div class="app-buttons">
                    <a href="#" class="app-store"><font-awesome-icon :icon="['fab', 'apple']" class="app-icon"/> App Store</a>
                    <a href="#" class="play-store"><font-awesome-icon :icon="['fab', 'google-play']" class="app-icon"/> Google Play</a>
                </div>
            </div>
            <div class="qr-code-content">
                <img :src="QrCodeImage" alt="Download QR Code" class="qr-code-img">
            </div>
        </div>
    </section>
</template>

<style scoped>
.mobile-app-section {
  background: linear-gradient(to right, #212529, #343a40);
  color: white;
  padding: 70px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 20px; /* Adjusted margin for better responsiveness */
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  flex-wrap: nowrap;
}

/* Animated Background Elements */
.mobile-app-section::before,
.mobile-app-section::after {
  content: "";
  position: absolute;
  width: 250px;
  height: 250px;
  background: rgba(255, 193, 7, 0.2);
  border-radius: 50%;
  filter: blur(80px);
  animation: float 6s ease-in-out infinite;
}

.mobile-app-section::before {
  top: -30px;
  left: -30px;
}

.mobile-app-section::after {
  bottom: -30px;
  right: -30px;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(20px);
  }
}

/* Stripes Animation */
.mobile-app-section::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.05) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.05) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
  z-index: 0;
  animation: stripesMove 4s linear infinite;
}

@keyframes stripesMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}

/* Content Styles */
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
  text-align: left;
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button Styles */
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
  animation: pulse 2s infinite;
}

.mobile-app-section .app-buttons a:hover {
  transform: translateY(-5px) scale(1.1);
  background: #e6a700;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
}

/* QR Code Styles */
.mobile-app-section .qr-code-content {
  flex: 1;
  max-width: 50%;
  text-align: center;
  padding: 10px;
}

.mobile-app-section .qr-code-img {
  max-width: 80%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  animation: bounce 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .mobile-app-section {
    flex-direction: column; /* Stack elements vertically */
  }

  /* Ensure QR Code Goes Below */
  .mobile-app-section .qr-code-content {
    max-width: 100%; /* Full width for QR code */
    margin-top: 20px; /* Space above QR code */
  }

  .mobile-app-section .text-content {
    max-width: 100%; /* Full width for text */
    text-align: center; /* Center align text */
  }

  /* Adjust QR Code Size */
  .mobile-app-section .qr-code-img {
    max-width: 50%; /* Smaller QR code for mobile */
  }
}

</style>