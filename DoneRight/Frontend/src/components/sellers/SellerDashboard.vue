<template>
  <v-app>
    <div class="layout-wrapper" :class="{ 'is-rail': isRail }">
      <!-- Sidebar -->
      <v-navigation-drawer
        v-model="drawer"
        :rail="isRail"
        :temporary="$vuetify.display.smAndDown"
        width="260"
        rail-width="72"
        class="frosted-sidebar"
        app
      >
        <div class="sidebar-header" :class="{ 'rail-mode': isRail }">
          <v-avatar size="48">
            <v-img :src="logo" alt="Logo" cover />
          </v-avatar>
          <span v-if="!isRail" class="ml-3 logo-text">DoneRight</span>
        </div>

        <v-divider class="mb-2" />

        <!-- Navigation -->
        <v-list nav dense>
          <v-tooltip
            v-for="item in navItems"
            :key="item.title"
            location="right"
            :disabled="!isRail"
          >
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :to="item.route"
                link
                class="sidebar-link"
              >
                <div class="sidebar-content">
                  <v-icon class="sidebar-icon" size="24">{{ item.icon }}</v-icon>
                  <span v-if="!isRail" class="sidebar-text">{{ item.title }}</span>
                </div>
              </v-list-item>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
        </v-list>
      </v-navigation-drawer>

      <!-- App Bar -->
      <v-app-bar flat color="#121212" class="elevation-1 topbar">
        <v-app-bar-nav-icon class="d-sm-none text-yellow-darken-2" @click="drawer = !drawer" />
        <v-toolbar-title class="text-yellow font-weight-bold">🔥 DoneRight Табла</v-toolbar-title>
        <v-spacer />
        <v-btn icon class="text-yellow-darken-2"><v-icon>mdi-bell-outline</v-icon></v-btn>
        <v-btn icon class="text-yellow-darken-2"><v-icon>mdi-account-circle</v-icon></v-btn>
      </v-app-bar>

      <!-- Main Content -->
      <v-main class="main-area">
        <v-container>
          <transition name="fade-slide">
            <v-card class="welcome-card" elevation="2">
              <v-card-title class="text-white">👋 Добредојде назад, Мајсторе!</v-card-title>
              <v-card-subtitle class="text-white">Продолжи со одличната работа!</v-card-subtitle>
            </v-card>
          </transition>

          <v-row class="mt-4">
            <v-col cols="12" sm="6" md="4" v-for="stat in stats" :key="stat.title">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  :elevation="isHovering ? 12 : 3"
                  class="stat-card"
                >
                  <v-card-title>
                    <v-icon class="mr-2 text-yellow" size="28">{{ stat.icon }}</v-icon>
                    <strong class="text-white">{{ stat.title }}</strong>
                  </v-card-title>
                  <v-card-subtitle class="text-grey-lighten-1">{{ stat.subtitle }}</v-card-subtitle>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import logo from '@/assets/logo.png'

const drawer = ref(true)
const isRail = ref(false)

const navItems = [
  { title: 'Табла', icon: 'mdi-view-dashboard', route: '/' },
  { title: 'Корисници', icon: 'mdi-account-group-outline', route: '/users' },
  { title: 'Извештаи', icon: 'mdi-chart-box-outline', route: '/reports' },
  { title: 'Поставки', icon: 'mdi-cog-outline', route: '/settings' }
]

const stats = [
  { title: 'Активни корисници', subtitle: '1,482 онлајн во моментот', icon: 'mdi-account' },
  { title: 'Приходи', subtitle: '$42,300 овој месец', icon: 'mdi-currency-usd' },
  { title: 'Завршени задачи', subtitle: '86% комплетирани', icon: 'mdi-check-circle-outline' }
]
</script>

<style scoped>
.layout-wrapper {
  transition: all 0.3s ease;
  margin-left: 260px;
}
.layout-wrapper.is-rail {
  margin-left: 72px;
}
@media (max-width: 960px) {
  .layout-wrapper,
  .layout-wrapper.is-rail {
    margin-left: 0;
  }
}

.main-area {
  background: #121212;
  min-height: 100vh;
  padding: 20px;
}

/* Sidebar */
.frosted-sidebar {
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  color: white;
}

/* Sidebar Header */
.sidebar-header {
  display: flex;
  align-items: center;
  padding: 16px;
}
.sidebar-header.rail-mode {
  flex-direction: column;
}
.logo-text {
  font-weight: bold;
  font-size: 20px;
  color: #ffc107;
}

/* Nav Items */
.sidebar-link {
  padding: 6px 10px;
  border-radius: 8px;
  margin: 4px 10px;
  transition: 0.2s;
}
.sidebar-link:hover {
  background-color: rgba(255, 255, 255, 0.08);
}
.sidebar-content {
  display: flex;
  align-items: center;
  gap: 12px;
}
.sidebar-icon {
  color: #ffc107;
}
.sidebar-text {
  font-size: 15px;
  font-weight: 500;
  color: white;
}
.frosted-sidebar.v-navigation-drawer--rail .sidebar-content {
  flex-direction: column;
}
.frosted-sidebar.v-navigation-drawer--rail .sidebar-text {
  display: none;
}

/* Welcome card */
.welcome-card {
  background: linear-gradient(90deg, #ffc107, #e3a600);
  border-radius: 12px;
  padding: 20px;
  animation: fadeIn 0.5s ease-out;
}

/* Stat Cards */
.stat-card {
  border-radius: 12px;
  padding: 18px;
  background-color: #1f1f1f;
  transition: 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(255, 193, 7, 0.1);
}

/* Transitions */
.fade-slide-enter-active {
  animation: fadeSlideIn 0.4s ease;
}
@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
