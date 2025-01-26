<script setup>

</script>

<template>
<section id="categories" class="categories">
        <div class="section-header">
            <h1>Our Services</h1>
            <p>Explore the various services offered by skilled professionals. Find the right expert for your needs!</p>
        </div>

        <div class="cards-container">
    <div class="card">
      <font-awesome-icon :icon="['fas', 'plug']" class="card-icon"/>
      <h3>Electrician</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'wrench']" class="card-icon"/>
      <h3>Plumber</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'paint-roller']" class="card-icon"/>
      <h3>Painter</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'tools']" class="card-icon"/>
      <h3>Mechanic</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'hammer']" class="card-icon"/>
      <h3>Carpenter</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'bolt']" class="card-icon"/>
      <h3>Technician</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'cogs']" class="card-icon"/>
      <h3>Engineer</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'door-open']" class="card-icon"/>
      <h3>Installer</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'water']" class="card-icon"/>
      <h3>Cleaner</h3>
    </div>
  </div>
    </section>
</template>

<style scoped>
.categories {
  padding: 100px 20px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;  /* Stack text and cards vertically */
  align-items: center;     /* Center all items horizontally */
  gap: 30px;               /* Space between text and cards */
}

.categories .section-header {
  text-align: center;
}

.categories .section-header h1 {
  font-size: 3rem;
  color: #ffc107;
  margin-bottom: 20px;
}

.categories .section-header p {
  font-size: 1.5rem;
  color: white;
  max-width: 800px;
  margin: 0 auto; /* Center align the paragraph */
  margin-bottom: 15px;
  line-height: 1.6;
}

.categories .cards-container {
  display: flex;
  justify-content: center; /* Center the cards horizontally */
  align-items: center;     /* Center cards vertically */
  flex-wrap: wrap;         /* Allow wrapping of cards if screen is small */
  gap: 30px;               /* Space between cards */
}

.categories .card {
  background-color: #212529;
  color: white;
  height: 120px;  /* Slightly taller cards for more space */
  width: 120px;   /* Fixed width for each card */
  flex: 0 0 auto; /* Prevent cards from stretching */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Bigger shadow for more depth */
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.categories .card:hover {
  transform: scale(1.1);  /* Zoom in effect on hover */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);  /* More intense shadow on hover */
}

.card-icon {
  font-size: 45px;   /* Larger icons */
  color: #ffc107;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .categories {
    padding: 60px 20px; /* Reduce padding for smaller screens */
  }

  .categories .card {
    width: 100px; /* Adjust width for mobile */
    height: 100px; /* Adjust height for mobile */
  }
}
</style>