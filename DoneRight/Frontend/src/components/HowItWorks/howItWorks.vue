<template>
  <div class="how-it-works">
    <div class="overlay" />
    <div class="container">
      <h1 class="main-title">Како да станеш мајстор?</h1>
      <p class="description">
        Никогаш не било поедноставно! Следи ги овие едноставни чекори и стани мајстор денес.
      </p>

      <v-row class="steps-grid" justify="center" align="stretch">
        <!-- Step 1 -->
        <v-col cols="12" sm="6" md="4">
          <v-card class="step-card" elevation="4">
            <v-card-title class="step-title">1. Регистрирај се</v-card-title>
            <v-card-text class="step-text">
              Немаш профил? Креирај нов за да започнеш со користење на платформата.
            </v-card-text>
            <v-card-actions>
              <v-btn color="warning" block @click="router.push('/apply')">Регистрирај се</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Step 2 -->
        <v-col cols="12" sm="6" md="4">
          <v-card class="step-card" elevation="4">
            <v-card-title class="step-title">2. Најави се</v-card-title>
            <v-card-text class="step-text">
              Веќе имаш профил? Најави се и продолжи со следниот чекор.
            </v-card-text>
            <v-card-actions>
              <v-btn color="warning" block @click="router.push('/login')">Најави се</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Step 3 -->
        <v-col cols="12" sm="6" md="4">
          <v-card class="step-card" elevation="4">
            <v-card-title class="step-title">3. Објави услуга</v-card-title>
            <v-card-text class="step-text">
              Ако си најавен, објави ја твојата прва услуга и започни да работиш.
            </v-card-text>
            <v-card-actions>
              <v-btn color="warning" block @click="handleNextStep">Објави услуга</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, onMounted } from 'vue'

const router = useRouter()
const isLoggedIn = ref(false)

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user
  })
})

const handleNextStep = () => {
  const auth = getAuth()
  const user = auth.currentUser

  if (!user) {
    router.push('/login')
  } else {
    router.push('/next-form')
  }
}
</script>

<style scoped>
.how-it-works {
  background-color: #212529;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 50px 20px;
  text-align: center;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
}

.main-title {
  font-size: 36px;
  color: #ffc107;
  font-weight: 700;
  margin-bottom: 10px;
}

.description {
  font-size: 18px;
  color: #ddd;
  margin-bottom: 30px;
}

.steps-grid {
  margin-top: 20px;
}

.step-card {
  background-color: rgba(255, 255, 255, 0.06);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 10px;
  transition: transform 0.3s ease;
}
.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.2);
}

.step-title {
  color: #ffc107;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}

.step-text {
  font-size: 16px;
  color: #ddd;
  padding: 10px 0;
}

.v-card-actions {
  padding: 16px;
}
</style>
