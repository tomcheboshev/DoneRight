<template>
  <section id="categories" class="categories">
    <div class="section-header">
      <h1>Нашите услуги</h1>
      <p>
        Истражете ги различните услуги што ги нудат искусни професионалци.
        Пронајдете го вистинскиот експерт за вашите потреби!
      </p>
    </div>

    <div class="cards-container">
      <div class="card" v-for="(item, index) in services" :key="index">
        <font-awesome-icon :icon="item.icon" class="card-icon" />
        <h3>{{ item.label }}</h3>
      </div>
    </div>
  </section>
</template>


<script setup>
const services = [
  { label: 'Електричар', icon: ['fas', 'plug'] },
  { label: 'Водоводџија', icon: ['fas', 'wrench'] },
  { label: 'Молер', icon: ['fas', 'paint-roller'] },
  { label: 'Механичар', icon: ['fas', 'tools'] },
  { label: 'Дрводелец', icon: ['fas', 'hammer'] },
  { label: 'Техничар', icon: ['fas', 'bolt'] },
  { label: 'Инженер', icon: ['fas', 'cogs'] },
  { label: 'Монтер', icon: ['fas', 'door-open'] },
  { label: 'Чистач', icon: ['fas', 'water'] }
];

</script>

<style scoped>
.categories {
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  background: radial-gradient(ellipse at center, #1c1c1c 0%, #121212 100%);
}

.section-header {
  text-align: center;
  max-width: 800px;
  color: white;
}

.section-header h1 {
  font-size: 3rem;
  color: #ffc107;
  margin-bottom: 20px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}

.section-header p {
  font-size: 1.25rem;
  color: #ccc;
  line-height: 1.6;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1000px;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 25px 15px;
  text-align: center;
  color: white;
  transition: transform 0.4s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 12px 24px rgba(255, 193, 7, 0.2);
}

.card h3 {
  font-size: 1rem;
  margin-top: 10px;
  color: #f1f1f1;
  font-weight: 600;
}

.card-icon {
  font-size: 38px;
  color: #ffc107;
  transition: transform 0.4s ease;
}

.card:hover .card-icon {
  transform: rotate(10deg) scale(1.2);
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .section-header h1 {
    font-size: 2.4rem;
  }
  .section-header p {
    font-size: 1rem;
  }
  .card h3 {
    font-size: 0.95rem;
  }
}

</style>
