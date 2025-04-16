<script setup></script>

<template>
<section id="categories" class="categories">
        <div class="section-header">
            <h1>Нашите услуги</h1>
            <p>Истражете ги различните услуги што ги нудат искусни професионалци. Пронајдете го вистинскиот експерт за вашите потреби!</p>
        </div>

        <div class="cards-container">
    <div class="card">
      <font-awesome-icon :icon="['fas', 'plug']" class="card-icon"/>
      <h3>Електричар</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'wrench']" class="card-icon"/>
      <h3>Водоводџија</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'paint-roller']" class="card-icon"/>
      <h3>Молер</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'tools']" class="card-icon"/>
      <h3>Механичар</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'hammer']" class="card-icon"/>
      <h3>Дрводелец</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'bolt']" class="card-icon"/>
      <h3>Техничар</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'cogs']" class="card-icon"/>
      <h3>Инженер</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'door-open']" class="card-icon"/>
      <h3>Монтер</h3>
    </div>
    <div class="card">
      <font-awesome-icon :icon="['fas', 'water']" class="card-icon"/>
      <h3>Чистач</h3>
    </div>
  </div>
    </section>
</template>

<style scoped>
.categories {
  padding: 100px 20px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;  /* Подредување на текстот и картичките вертикално */
  align-items: center;     /* Центрирање на сите елементи хоризонтално */
  gap: 30px;               /* Простор помеѓу текстот и картичките */
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
  margin: 0 auto; /* Центрирање на параграфот */
  margin-bottom: 15px;
  line-height: 1.6;
}

.categories .cards-container {
  display: flex;
  justify-content: center; /* Центрирање на картичките хоризонтално */
  align-items: center;     /* Центрирање на картичките вертикално */
  flex-wrap: wrap;         /* Овозможување на редење на картичките ако екранот е мал */
  gap: 30px;               /* Простор помеѓу картичките */
}

.categories .card {
  background-color: #212529;
  color: white;
  height: 120px;  /* Малку повисоки картички за повеќе простор */
  width: 120px;   /* Фиксна ширина за секоја картичка */
  flex: 0 0 auto; /* Спречување на истегнување на картичките */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Поголема сенка за повеќе длабочина */
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.categories .card:hover {
  transform: scale(1.1);  /* Зголемување на картичката при лебдење */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);  /* Поголема сенка при лебдење */
}

.card-icon {
  font-size: 45px;   /* Поголеми икони */
  color: #ffc107;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .categories {
    padding: 60px 20px; /* Намалување на растојанието за помали екрани */
  }

  .categories .card {
    width: 100px; /* Прилагодување на ширината за мобилни уреди */
    height: 100px; /* Прилагодување на висината за мобилни уреди */
  }
}
</style>
