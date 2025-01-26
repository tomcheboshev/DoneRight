<script setup>
import { RouterLink} from 'vue-router';
</script>

<template>
      <header>
        <div class="logo">
            
        </div>
        <nav class="desktop-nav">
            <a href="#hero">Home</a>
            <a href="#categories">Services</a>
            <RouterLink to="#ourvision">Our Vision</RouterLink>
            <a href="#apply">Become a Master</a>
        </nav>
        <div class="auth">
          <font-awesome-icon :icon="['fas', 'user']" id="loginIcon" />
        </div>
        <div class="menu-icon">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </div>
    </header>

</template>

<style scoped>
  header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #212529;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  font-size: 1.5rem; /* Increased font size */
  
}
header .logo {
  display: flex;
  align-items: center;
}
header .logo img {
  height: 50px;
  transition: transform 0.3s ease;
}

header .logo img:hover {
transform: scale(1.1);
}
header nav {
  display: flex;
  gap: 20px;
}
header nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}
header nav a:hover {
color: #ffc107;
transform: translateY(-3px);
}


header .auth {
font-size: 24px;
cursor: pointer;
transition: color 0.3s ease, transform 0.3s ease;
}

header .auth:hover {
color: #ffc107;
transform: rotate(20deg);
}


.menu-icon {
display: none;
font-size: 28px;
cursor: pointer;
color: white;
transition: color 0.3s ease, transform 0.3s ease;
}

.menu-icon:hover {
color: #ffc107;
transform: rotate(20deg);
}

@media (max-width: 768px) {
header nav {
display: none; /* Hide navigation for small screens */
}

.menu-icon {
display: block;
}
}

header nav.active {
display: flex;
flex-direction: column;
background: rgba(0, 0, 0, 0.8); /* Semi-transparent background for mobile menu */
padding: 10px;
position: absolute;
top: 60px;
left: 0;
width: 100%;
}

header nav.active a {
color: white;
padding: 10px 20px;
text-align: center;
font-size: 1.2rem;

}

header nav.active a:hover {
color: #ffc107;
}
</style>