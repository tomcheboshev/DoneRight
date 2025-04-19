<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="settings-page">
    <!-- Header -->
    <div class="settings-header">
      <h2 class="text-yellow text-h4 font-weight-bold">⚙️ Поставки</h2>
      <p class="text-grey-lighten-1">Персонализирај го твоето искуство</p>
    </div>

    <!-- Profile Card -->
    <v-card class="settings-card glass-card mb-6 fade-in">
      <v-card-title class="card-title">👤 Профил</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              label="Име"
              v-model="profile.name"
              color="yellow-darken-2"
              variant="outlined"
              class="glow-input"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Е-пошта"
              v-model="profile.email"
              color="yellow-darken-2"
              variant="outlined"
              class="glow-input"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Нова лозинка"
              v-model="profile.password"
              type="password"
              color="yellow-darken-2"
              variant="outlined"
              class="glow-input"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Notifications -->
    <v-card class="settings-card glass-card mb-6 fade-in">
      <v-card-title class="card-title">🔔 Известувања</v-card-title>
      <v-card-text>
        <v-switch
          v-model="notifications.email"
          label="Email Известувања"
          color="yellow-darken-2"
          inset
          class="fancy-switch"
        />
        <v-switch
          v-model="notifications.sms"
          label="SMS Известувања"
          color="yellow-darken-2"
          inset
          class="fancy-switch"
        />
      </v-card-text>
    </v-card>

    <!-- Language -->
    <v-card class="settings-card glass-card mb-6 fade-in">
      <v-card-title class="card-title">🌐 Јазик</v-card-title>
      <v-card-text>
        <v-select
          v-model="language"
          :items="['Македонски', 'English']"
          label="Одбери јазик"
          color="yellow-darken-2"
          variant="outlined"
          class="glow-input"
        />
      </v-card-text>
    </v-card>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <v-btn
        color="yellow-darken-2"
        class="text-black font-weight-bold px-6 save-btn"
        rounded
        size="large"
        @click="saveSettings"
      >
        💾 Зачувај
      </v-btn>

      <v-btn
        color="grey-darken-3"
        class="text-white px-6 reset-btn"
        rounded
        size="large"
        @click="resetSettings"
      >
        ♻️ Ресетирај
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const profile = ref({
  name: 'Име и презиме',
  email: 'email@example.com',
  password: ''
})

const notifications = ref({
  email: true,
  sms: false
})

const language = ref('Македонски')

const saveSettings = () => {
  console.log('Saved:', {
    profile: profile.value,
    notifications: notifications.value,
    language: language.value
  })
}

const resetSettings = () => {
  profile.value = {
    name: '',
    email: '',
    password: ''
  }
  notifications.value = {
    email: true,
    sms: false
  }
  language.value = 'Македонски'
}
</script>

<style scoped>
.settings-page {
  padding-top: 40px;
  padding-bottom: 60px;
  min-height: 100vh;
  background: #121212;
  animation: fadeInPage 0.6s ease-in;
}

.settings-header {
  text-align: center;
  margin-bottom: 40px;
}

.settings-card {
  border-radius: 16px;
  padding-bottom: 16px;
  color: white;
  animation: fadeUp 0.6s ease-in-out;
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(14px);
  box-shadow: 0 10px 24px rgba(255, 193, 7, 0.1);
}

.card-title {
  font-weight: bold;
  color: #ffc107;
  font-size: 1.2rem;
  padding-left: 6px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
}

.save-btn,
.reset-btn {
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.save-btn:hover {
  background: linear-gradient(to right, #ffdd33, #e3a600);
  transform: scale(1.05);
}

.reset-btn:hover {
  transform: scale(1.05);
  background-color: #2e2e2e !important;
}

.glow-input :deep(input),
.glow-input :deep(.v-input__control) {
  color: white;
  transition: all 0.3s ease;
}

.glow-input :deep(.v-input--focused .v-field) {
  box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.5);
  border-radius: 12px;
}

.fancy-switch {
  margin-bottom: 8px;
  transition: all 0.3s ease;
}
.fancy-switch:hover {
  transform: scale(1.03);
}

/* Animations */
@keyframes fadeInPage {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in {
  animation: fadeUp 0.7s ease-in-out;
}
</style>
