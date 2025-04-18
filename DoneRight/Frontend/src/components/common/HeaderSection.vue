<template>
  <v-app-bar
    app
    flat
    height="80"
    class="custom-app-bar"
  >
    <!-- Logo -->
    <v-toolbar-title class="font-weight-bold text-white text-h5">
      <RouterLink to="/" class="text-decoration-none text-yellow-darken-2">
        Најди Мајстор
      </RouterLink>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Desktop links -->
    <div class="d-none d-md-flex align-center gap-5">
      <v-btn to="/" variant="text" class="nav-btn">Почетна</v-btn>
      <v-btn to="/services" variant="text" class="nav-btn">Услуги</v-btn>
      <v-btn v-if="isLoggedIn" to="/favourite" variant="text" class="nav-btn">Омилени</v-btn>
      <v-btn v-if="!isLoggedIn" to="/apply" variant="text" class="nav-btn">Стани мајстор</v-btn>
      <v-btn v-else to="/seller-dashboard" variant="text" class="nav-btn">Табла</v-btn>

      <v-btn
        v-if="!isLoggedIn"
        to="/login"
        color="yellow-darken-2"
        class="text-black font-weight-bold px-4"
        rounded
      >
        Најави се
      </v-btn>

      <v-btn
        v-else
        to="/user-profile"
        icon
        class="text-yellow-darken-2"
      >
        <v-icon size="28">mdi-account</v-icon>
      </v-btn>
    </div>

    <!-- Mobile drawer toggle -->
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
      class="d-md-none text-yellow-darken-2"
    />
  </v-app-bar>

  <!-- Mobile Drawer -->
  <v-navigation-drawer v-model="drawer" app temporary color="#212529">
    <v-list nav dense class="text-white">
      <v-list-item to="/" @click="drawer = false">
        <v-list-item-title>Почетна</v-list-item-title>
      </v-list-item>
      <v-list-item to="/services" @click="drawer = false">
        <v-list-item-title>Услуги</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isLoggedIn" to="/favourite" @click="drawer = false">
        <v-list-item-title>Омилени</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!isLoggedIn" to="/apply" @click="drawer = false">
        <v-list-item-title>Стани мајстор</v-list-item-title>
      </v-list-item>
      <v-list-item v-else to="/seller-dashboard" @click="drawer = false">
        <v-list-item-title>Табла</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!isLoggedIn" to="/login" @click="drawer = false">
        <v-list-item-title>Најави се</v-list-item-title>
      </v-list-item>
      <v-list-item v-else to="/user-profile" @click="drawer = false">
        <v-list-item-title>Профил</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const drawer = ref(false)
const isLoggedIn = ref(false)

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user
  })
})
</script>

<style scoped>
.custom-app-bar {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-btn {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: none;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  color: #ffc107;
  text-shadow: 0 0 10px #ffc107;
}

.v-list-item-title {
  font-weight: 600;
  font-size: 1rem;
}
</style>
