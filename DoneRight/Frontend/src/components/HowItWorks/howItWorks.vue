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
        <v-col cols="12" md="6" lg="4">
          <v-card class="step-card" elevation="4">
            <div class="step-icon">
              <i class="mdi mdi-account-plus" />
              <span class="step-number">1</span>
            </div>
            <v-card-title class="step-title">Регистрирај се</v-card-title>
            <v-card-text class="step-text">
              Немаш профил? Креирај нов за да започнеш со користење на платформата.
            </v-card-text>
            <v-card-actions>
              <v-btn color="warning" block @click="router.push('/apply')">Регистрирај се</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Step 2 -->
        <v-col cols="12" md="6" lg="4">
          <v-card class="step-card" elevation="4">
            <div class="step-icon">
              <i class="mdi mdi-login" />
              <span class="step-number">2</span>
            </div>
            <v-card-title class="step-title">Најави се</v-card-title>
            <v-card-text class="step-text">
              Веќе имаш профил? Најави се и продолжи со следниот чекор.
            </v-card-text>
            <v-card-actions>
              <v-btn color="warning" block @click="router.push('/login')">Најави се</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Step 3 -->
        <v-col cols="12" md="6" lg="4">
          <v-card class="step-card" elevation="4">
            <div class="step-icon">
              <i class="mdi mdi-briefcase-plus" />
              <span class="step-number">3</span>
            </div>
            <v-card-title class="step-title">Објави услуга</v-card-title>
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
@import '@mdi/font/css/materialdesignicons.min.css';

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
  position: relative;
  overflow: hidden;
}
.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.2);
}

.step-title {
  color: #ffc107;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
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

.step-icon {
  font-size: 48px;
  margin-top: 10px;
  color: #ffc107;
  position: relative;
}

.step-number {
  position: absolute;
  top: -12px;
  right: -12px;
  background: #ffc107;
  color: black;
  font-weight: 700;
  width: 34px;
  height: 34px;
  font-size: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>

