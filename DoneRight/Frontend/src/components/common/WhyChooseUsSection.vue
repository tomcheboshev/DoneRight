<script setup>
const benefits = [
  {
    icon: 'mdi-shield-check',
    title: 'Доверливи професионалци',
    description: 'Секој мајстор е проверен, интервјуиран и оценет од нашата заедница.',
  },
  {
    icon: 'mdi-rocket-launch',
    title: 'Брз процес',
    description: 'Пронајди и контактирај мајстор за помалку од 2 минути.',
  },
  {
    icon: 'mdi-account-group',
    title: 'Голема заедница',
    description: 'Поврзуваме илјадници клиенти со локални професионалци секојдневно.',
  },
]
</script>

<template>
  <section class="why-choose-section py-16 px-4">
    <v-container>
      <v-row justify="center" class="mb-10">
        <v-col cols="12" md="8" class="text-center">
          <h2 class="section-title">Зошто токму ние?</h2>
          <p class="section-subtitle">
            Ние не сме само уште една платформа – туку твојот партнер во пронаоѓање доверливи мајстори.
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col
          v-for="(item, index) in benefits"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="benefit-card text-center pa-6"
              elevation="12"
            >
              <v-icon
                :class="['benefit-icon', { bounce: isHovering }]"
                size="52"
                color="#ffc107"
              >
                {{ item.icon }}
              </v-icon>
              <h3 class="card-title mt-4">
                {{ item.title }}
              </h3>
              <p class="card-description mt-2">
                {{ item.description }}
              </p>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.why-choose-section {
  background: linear-gradient(135deg, #1f1f1f, #121212); /* updated */
  color: #fff;
  padding-top: 100px;
  padding-bottom: 100px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffc107; /* updated */
  margin-bottom: 12px;
  text-shadow: 0 0 6px rgba(255, 193, 7, 0.4); /* updated */
}

.section-subtitle {
  font-size: 1.1rem;
  color: #dddddd; /* updated */
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.3); /* updated */
}

.benefit-card {
  background: rgba(255, 255, 255, 0.04); /* updated */
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08); /* updated */
  border-radius: 16px;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  height: 100%;
}

.benefit-icon {
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 6px rgba(255, 193, 7, 0.3)); /* updated */
}

.bounce {
  transform: scale(1.15) rotate(-5deg);
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
}

.card-description {
  font-size: 0.98rem;
  color: #ccc; /* updated */
  line-height: 1.6;
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(255, 193, 7, 0.25); /* updated */
}

/* Responsive text adjustments */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-description {
    font-size: 0.95rem;
  }
}
</style>
