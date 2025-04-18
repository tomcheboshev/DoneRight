<template>
  <v-app>
    <div class="background">
      <div class="overlay"></div>
      <v-container class="form-container" fluid>
        <v-card class="form-card" elevation="10">
          <v-card-title class="text-center text-yellow-darken-2 text-h5 font-weight-bold">
            Најава
          </v-card-title>

          <v-form @submit.prevent="handleLogin" class="px-4">
            <v-text-field
              v-model="form.email"
              label="Емајл адреса"
              type="email"
              variant="outlined"
              density="comfortable"
              color="warning"
              hide-details
              class="mb-4"
              required
            />

            <v-text-field
              v-model="form.password"
              label="Лозинка"
              type="password"
              variant="outlined"
              density="comfortable"
              color="warning"
              hide-details
              class="mb-4"
              required
            />

            <div class="account-link text-white text-caption mb-5">
              Немате профил?
              <span class="link" @click="redirectToRegister">Регистрирај се</span>
            </div>

            <v-btn
              type="submit"
              color="warning"
              block
              size="large"
              class="text-white font-weight-bold"
            >
              Најави се
            </v-btn>
          </v-form>
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  const auth = getAuth()
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      form.value.email,
      form.value.password
    )
    alert('Најавата беше успешна!')
    router.push('/')
  } catch (error) {
    console.error('Login error:', error)
    alert('Грешка при најава: ' + error.message)
  }
}

const redirectToRegister = () => {
  router.push('/apply')
}
</script>

<style scoped>
.background {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #212529;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
}
.form-container {
  z-index: 1;
  display: flex;
  justify-content: center;
}
.form-card {
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 30px 20px;
  max-width: 420px;
  width: 100%;
  color: white;
}

/* Link styling */
.account-link {
  text-align: center;
  color: #ddd;
}

.account-link .link {
  color: #ffc107;
  cursor: pointer;
  font-weight: 600;
}
.account-link .link:hover {
  text-decoration: underline;
}
</style>
