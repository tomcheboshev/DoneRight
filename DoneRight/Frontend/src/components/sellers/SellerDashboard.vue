<template>
  <v-app>
    <!-- Layout wrapper to shift content with sidebar -->
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
        <!-- Sidebar Header -->
        <div class="sidebar-header" :class="{ 'rail-mode': isRail }">
          <v-avatar size="48" color="black">
            <v-img :src="logo" alt="Logo" cover />
          </v-avatar>
          <span v-if="!isRail" class="ml-3 logo-text">DoneRight</span>
        </div>

        <v-divider class="mb-2" />

        <!-- Nav Links -->
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

      <!-- Top App Bar -->
      <v-app-bar flat color="white" class="elevation-1 topbar">
        <v-app-bar-nav-icon class="d-sm-none" @click="drawer = !drawer" />
        <v-toolbar-title class="text-primary font-weight-bold">🚀 Nova Dashboard</v-toolbar-title>
        <v-spacer />
        <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-bell-outline</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-account-circle</v-icon></v-btn>
      </v-app-bar>

      <!-- Main Content -->
      <v-main class="main-area">
        <v-container>
          <transition name="fade-slide">
            <v-card class="welcome-card" elevation="2">
              <v-card-title class="text-white">🔥 Welcome back, {{ userName }}!</v-card-title>
              <v-card-subtitle class="text-white">Let's build something awesome today.</v-card-subtitle>
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
                    <v-icon class="mr-2 text-primary" size="28">{{ stat.icon }}</v-icon>
                    <strong>{{ stat.title }}</strong>
                  </v-card-title>
                  <v-card-subtitle class="text-grey">{{ stat.subtitle }}</v-card-subtitle>
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
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import logo from '@/assets/logo.png'

const drawer = ref(true)
const isRail = ref(false)
const userName = ref('Rockstar') // default fallback

const navItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
  { title: 'Users', icon: 'mdi-account-group-outline', route: '/users' },
  { title: 'Reports', icon: 'mdi-chart-box-outline', route: '/reports' },
  { title: 'Settings', icon: 'mdi-cog-outline', route: '/settings' },
]

const stats = [
  { title: 'Active Users', subtitle: '1,482 online now', icon: 'mdi-account' },
  { title: 'Revenue', subtitle: '$42,300 this month', icon: 'mdi-currency-usd' },
  { title: 'Tasks Completed', subtitle: '86% done', icon: 'mdi-check-circle-outline' }
]

// Fetch user name from Firestore on mount
onMounted(async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const q = query(collection(db, 'users'), where('uid', '==', user.uid))
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data()
        userName.value = `${data.firstName} ${data.lastName}`
      } else {
        userName.value = user.displayName || 'Корисник'
      }
    }
  })
})
</script>

<style scoped>
/* Layout wrapper syncs everything with sidebar */
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
  background: #f5f7fa;
  min-height: 100vh;
  padding: 20px;
  transition: all 0.3s ease;
}

/* Sidebar */
.frosted-sidebar {
  background: rgba(33, 150, 243, 0.85);
  backdrop-filter: blur(12px);
  color: white;
  transition: width 0.3s ease;
  overflow: hidden;
}

/* Header */
.sidebar-header {
  display: flex;
  align-items: center;
  padding: 16px;
  transition: all 0.3s ease;
}
.sidebar-header.rail-mode {
  flex-direction: column;
  justify-content: center;
}
.logo-text {
  font-weight: 600;
  font-size: 20px;
  color: white;
}

/* Toggle Button */
.sidebar-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px auto;
  height: 38px;
  width: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: background 0.3s ease;
}
.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Nav Items */
.sidebar-link {
  padding: 6px 8px;
  border-radius: 8px;
  margin: 4px 10px;
  transition: all 0.2s ease;
}
.sidebar-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
.sidebar-content {
  display: flex;
  align-items: center;
  gap: 12px;
}
.sidebar-icon {
  color: white;
}
.sidebar-text {
  font-size: 15px;
  font-weight: 500;
  color: white;
}

/* Rail Mode */
.frosted-sidebar.v-navigation-drawer--rail .sidebar-content {
  flex-direction: column;
  align-items: center;
}
.frosted-sidebar.v-navigation-drawer--rail .sidebar-text {
  display: none;
}

/* Welcome Card */
.welcome-card {
  background: linear-gradient(90deg, #007cf0, #00dfd8);
  border-radius: 12px;
  padding: 20px;
  color: white;
  animation: fadeIn 0.5s ease-out;
}

/* Stat Cards */
.stat-card {
  border-radius: 12px;
  padding: 18px;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Fancy Toggle Wrapper */
.sidebar-toggle-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.sidebar-toggle-btn {
  background: white;
  color: #1976d2;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar-toggle-btn:hover {
  background: #f0f0f0;
  transform: scale(1.1);
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}


/* Transitions */
.fade-slide-enter-active {
  animation: fadeSlideIn 0.4s ease;
}
.fade-slide-leave-active {
  animation: fadeSlideOut 0.3s ease;
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
@keyframes fadeSlideOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
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