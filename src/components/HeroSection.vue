<script setup>

</script>

<template>
    <section class="hero" id="hero">
        <div class="hero-content">
            <h1>Find the Perfect Master <br> for any Job, Anytime.</h1>
            <div class="search-bar">
                <input type="text" placeholder="What service do you need?" id="searchInput">
                <button>
                  <font-awesome-icon :icon="['fas', 'search']" class="button-icon"/>
                </button>
            </div>
        </div>
        <div class="hero-image"></div>
        <div class="wave">
            <svg viewBox="0 0 1200 160" preserveAspectRatio="none">
                <path d="M0,120 C320,200 800,40 1200,160 L1200,200 L0,200 Z" fill="#565b61"></path>
            </svg>
        </div>
    </section>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 200px 20px;
  background-color: #212529;
  color: white;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.5s ease-out, transform 1.5s ease-out; /* Smooth opacity and translation */
  background: 
    linear-gradient(to left, rgba(33, 37, 41, 0.8), rgba(33, 37, 41, 0.8)), 
    url('majstor-01.png') no-repeat left center, /* Add image on the left */
    url('majstor-02.png') no-repeat right center; /* Add image on the right */
  background-size: contain, contain, contain; /* Ensure images fit nicely */
  background-blend-mode: overlay; /* Apply transparency to both images */
}

.hero.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 100px;
  margin-top: -20px;
}

.hero .search-bar {
  display: flex;
  max-width: 800px;
  margin: 50px auto 0;
  background: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out; /* Added animation */
}

.hero .search-bar:hover {
  transform: scale(1.05); /* Zooms on hover */
}

.hero .search-bar input {
  flex: 1;
  padding: 15px 20px;
  border: none;
  outline: none;
  font-size: 1.2rem;
}

.hero .search-bar button {
  background: #ffc107;
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 1.2rem;
  cursor: pointer; /* Ensures pointer cursor */
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero .search-bar button:hover {
  background: #ad8409;
}

.button-icon {
  font-size: 1.5rem; /* Larger icon */
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  height: 200px; /* Adjust height as needed */
}

.wave svg {
  display: block;
  width: 100%;
  height: 100%; /* Ensures it fills the container */
}

@media (max-width: 768px) {
  .hero {
    background: 
      linear-gradient(to left, rgba(33, 37, 41, 0.8), rgba(33, 37, 41, 0.8)), 
      url('majstor-03.png') no-repeat center center; /* Show only one image */
    background-size: auto 90%, cover; /* Scale the single image nicely */
    padding: 150px 10px; /* Adjust padding */
  }

  .hero h1 {
    font-size: 2.5rem; /* Reduce text size for smaller screens */
    margin-bottom: 50px;
  }

  .hero .search-bar {
    max-width: 90%; /* Ensure the search bar fits smaller screens */
  }
}
</style>