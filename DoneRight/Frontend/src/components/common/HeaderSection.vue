<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import LogoImg from "@/assets/logo.png";

// 👇 NEW import
import { getAuth, onAuthStateChanged } from "firebase/auth";

const isLoggedIn = ref(false);
const menuOpen = ref(false);
const isDarkMode = ref(false);
const isShrunk = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle("dark-mode", isDarkMode.value);
};

const handleScroll = () => {
  isShrunk.value = window.scrollY > 50;
};

onMounted(() => {
  // 👇 Listen for auth state changes
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });

  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>


<template>
  <header :class="['header', { shrunk: isShrunk, dark: isDarkMode }]">
    <!-- Лого -->
    <div class="logo">
      <RouterLink to="/">
        <img :src="LogoImg" alt="Лого" />
      </RouterLink>
    </div>

    <!-- Навигација за десктоп -->
    <nav class="nav-links">
      <RouterLink to="/">Почетна</RouterLink>
      <RouterLink to="/services">Услуги</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/favourite">Омилени</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/apply">Стани мајстор</RouterLink>
      <RouterLink v-else to="/seller-dashboard">Табла</RouterLink>
    </nav>

    <!-- Логирање & Мод за темна/светла тема -->
    <div class="auth">
      <RouterLink v-if="isLoggedIn" to="/user-profile" class="user-icon">
        <font-awesome-icon :icon="['fas', 'user']" />
      </RouterLink>
      <RouterLink v-else to="/login" class="login-btn">Најави се</RouterLink>
      <button @click="toggleDarkMode" class="theme-toggle">
        <font-awesome-icon :icon="isDarkMode ? ['fas', 'sun'] : ['fas', 'moon']" />
      </button>
    </div>

    <!-- Мобилно мени - отворање/затворање -->
    <div class="menu-toggle" @click="toggleMenu">
      <font-awesome-icon :icon="menuOpen ? faTimes : faBars" />
    </div>

    <!-- Мени за мобилни уреди -->
    <transition name="slide">
      <nav v-if="menuOpen" class="mobile-menu">
        <RouterLink to="/" @click="toggleMenu">Почетна</RouterLink>
        <RouterLink to="/services" @click="toggleMenu">Услуги</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/favourite" @click="toggleMenu">Омилени</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/apply" @click="toggleMenu">Стани мајстор</RouterLink>
        <RouterLink v-else to="/seller-dashboard" @click="toggleMenu">Табла</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/user-profile" @click="toggleMenu">Профил</RouterLink>
        <RouterLink v-else to="/login" @click="toggleMenu">Најави се</RouterLink>
        <button @click="toggleDarkMode" class="theme-toggle-mobile">
          <font-awesome-icon :icon="isDarkMode ? ['fas', 'sun'] : ['fas', 'moon']" />
          Промени тема
        </button>
      </nav>
    </transition>
  </header>
</template>


  <style scoped>
  /* Header Styles */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 40px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    color: white;
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: all 0.3s ease-in-out;
  }

  /* Shrunk Header */
  .header.shrunk {
    padding: 10px 30px;
    background: rgba(0, 0, 0, 0.9);
  }

  /* Dark Mode */
  .header.dark {
    background: rgba(20, 20, 20, 0.9);
  }

  /* Logo */
  .logo img {
    height: 50px;
    transition: transform 0.3s ease;
  }

  .logo img:hover {
    transform: scale(1.1);
  }

  /* Desktop Navigation */
  .nav-links {
    display: flex;
    gap: 25px;
  }

  .nav-links a {
    color: white;
    font-size: 1.1rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .nav-links a:hover {
    color: #ffc107;
    text-shadow: 0 0 8px #ffc107;
    transform: translateY(-2px);
  }

  /* Authentication & Dark/Light Mode */
  .auth {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  /* User Icon */
  .user-icon {
    font-size: 22px;
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease, color 0.3s ease;
  }

  .user-icon:hover {
    color: #ffc107;
  }

  /* Login Button */
  .login-btn {
    background: #ffc107;
    color: black;
    padding: 8px 15px;
    border-radius: 8px;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .login-btn:hover {
    background: white;
    color: #000;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }

  /* Dark/Light Mode Button */
  .theme-toggle {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .theme-toggle:hover {
    color: #ffc107;
    text-shadow: 0 0 10px #ffc107;
  }

  /* Mobile Menu Icon */
  .menu-toggle {
    display: none;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .menu-toggle:hover {
    color: #ffc107;
  }

  /* Mobile Menu */
  .mobile-menu {
    position: absolute;
    top: 70px;
    right: 10px;
    width: 220px;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    padding: 15px;
  }

  .mobile-menu a {
    color: white;
    padding: 12px;
    font-size: 1rem;
    text-decoration: none;
    transition: background 0.3s ease;
  }

  .mobile-menu a:hover {
    background: rgba(255, 204, 0, 0.3);
    border-radius: 5px;
  }

  /* Dark/Light Mode for Mobile */
  .theme-toggle-mobile {
    background: none;
    border: none;
    color: white;
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .theme-toggle-mobile:hover {
    color: #ffc107;
    text-shadow: 0 0 10px #ffc107;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .nav-links {
      display: none;
      text-align: center;
    }

    .menu-toggle {
      display: block;
    }
  }

  @media (max-width: 768px) {
    .header {
      padding: 20px 20px;
    }

    .logo img {
      height: 40px;
    }

    .nav-links {
      display: none;
    }

    .menu-toggle {
      display: block;
    }

    .mobile-menu {
      width: 100%;
      top: 60px;
      left: 0;
      right: 0;
      text-align: center;
    }

    .mobile-menu a {
      padding: 15px;
    }

    /* Responsive Auth Section (when not logged in) */
    .auth {
      gap: 8px;
      flex-direction: column;
    }

    .login-btn {
      padding: 10px 20px;
      font-size: 1rem;
      width: 100%;
      text-align: center;
    }

    .user-icon {
      font-size: 30px;
    }

    .theme-toggle {
      font-size: 24px;
    }

    .theme-toggle-mobile {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    .mobile-menu {
      top: 50px;
      text-align: center;
    }

    .logo img {
      height: 35px;
    }

    .theme-toggle {
      font-size: 18px;
    }

    .theme-toggle-mobile {
      font-size: 0.9rem;
    }
  }
  </style>
