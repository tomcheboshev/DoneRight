<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer
  v-model="drawer"
  :mini-variant.sync="mini"
  app
  permanent
  class="custom-drawer"
  :class="{ 'v-navigation-drawer--mini': mini }"
>
      <!-- User Info -->
      <v-list-item class="drawer-header">
        <v-list-item-avatar>
          <v-img :src="user.profilePicture" />
        </v-list-item-avatar>
        <v-list-item-content v-if="!mini && $vuetify.display.mdAndUp">
          <v-list-item-title class="white--text">{{ user.firstName }}</v-list-item-title>
          <v-list-item-subtitle class="white--text text-caption">{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-2" />

      <!-- Navigation Links -->
      <v-list nav dense>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          link
          :to="item.route"
          class="custom-list-item"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!mini">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Floating Toggle Button -->
    <div class="sidebar-toggle-btn" :class="{ collapsed: mini }" @click="toggleDrawer">
      <v-icon color="white">
        {{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
      </v-icon>
    </div>

    <!-- Top App Bar -->
    <v-app-bar app color="deep-orange accent-4" dark elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />
      <v-toolbar-title>🔥 Seller Dashboard</v-toolbar-title>
      <v-spacer />
      <v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-account-circle</v-icon></v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="main-content">
      <v-container fluid>
        <v-card elevation="2" class="pa-6 mb-6 welcome-card">
          <v-card-title class="text-h5">Welcome, {{ user.firstName }} 👋</v-card-title>
        </v-card>

        <!-- Stat Cards -->
        <v-row class="mb-6">
          <v-col cols="12" sm="6" md="4" v-for="card in cards" :key="card.title">
            <v-hover v-slot:default="{ isHovering, props }">
              <v-card
                v-bind="props"
                class="pa-4 stat-card"
                :elevation="isHovering ? 10 : 3"
                :class="{ 'hovered-card': isHovering }"
              >
                <v-card-title class="text-h6">{{ card.title }}</v-card-title>
                <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
                <v-card-actions v-if="card.action">
                  <v-btn color="deep-orange" @click="card.action">
                    {{ card.actionLabel }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <!-- Orders -->
        <v-card elevation="2" class="pa-4">
          <v-card-title>Recent Orders</v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-list>
            <v-list-item
              v-for="order in orders"
              :key="order.id"
              class="order-item"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <strong>{{ order.customerName }}</strong> ordered <strong>{{ order.serviceTitle }}</strong>
                </v-list-item-title>
                <v-list-item-subtitle>
                  Status:
                  <v-chip :color="statusColor(order.status)" small>
                    {{ order.status }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon color="green" @click="acceptOrder(order.id)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="rejectOrder(order.id)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(true)
const mini = ref(false)

const toggleDrawer = () => {
  mini.value = !mini.value
}

const user = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  profilePicture: '/profile.jpg'
})

const navItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/seller-dashboard' },
  { title: 'Services', icon: 'mdi-hammer-wrench', route: '/seller-dashboard/services' },
  { title: 'Orders', icon: 'mdi-package-variant', route: '/seller-dashboard/orders' },
  { title: 'Reviews', icon: 'mdi-star-outline', route: '/seller-dashboard/reviews' },
  { title: 'Earnings', icon: 'mdi-cash-multiple', route: '/seller-dashboard/earnings' },
  { title: 'Settings', icon: 'mdi-cog-outline', route: '/seller-dashboard/settings' },
]

const cards = [
  {
    title: 'Your Services',
    subtitle: '2 Active Services',
    actionLabel: 'Add New',
    action: () => router.push('/add-service')
  },
  {
    title: 'Orders',
    subtitle: '2 Pending Orders'
  },
  {
    title: 'Earnings',
    subtitle: '$250',
    actionLabel: 'Withdraw',
    action: () => alert('Withdrawal requested!')
  }
]

const orders = ref([
  { id: 1, customerName: 'Alice', serviceTitle: 'Web Development', status: 'Pending' },
  { id: 2, customerName: 'Bob', serviceTitle: 'Graphic Design', status: 'In-progress' }
])

const acceptOrder = (id) => {
  const order = orders.value.find(o => o.id === id)
  if (order) order.status = 'Accepted'
}

const rejectOrder = (id) => {
  const order = orders.value.find(o => o.id === id)
  if (order) order.status = 'Rejected'
}

const statusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'yellow darken-3'
    case 'in-progress': return 'blue lighten-2'
    case 'accepted': return 'green'
    case 'rejected': return 'red'
    default: return 'grey'
  }
}
</script>

<style scoped>
/* Sidebar styles */
.custom-drawer {
  background: linear-gradient(135deg, #ff9800, #ffb300);
  color: white;
  transition: all 0.3s ease;
  z-index: 1000;
}

.drawer-header {
  padding-top: 20px;
  padding-bottom: 20px;
}

.custom-list-item {
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: 4px 8px;
}

.custom-list-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Floating toggle button */
.sidebar-toggle-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: calc(260px - 20px); /* when open */
  width: 40px;
  height: 40px;
  background: #ff9800;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 1100;
  transition: left 0.3s ease;
}

.sidebar-toggle-btn.collapsed {
  left: calc(80px - 20px); /* when collapsed */
}

.main-content {
  background: #f4f4f4;
  min-height: 100vh;
}

.welcome-card {
  background: linear-gradient(to right, #ff9800, #ffc107);
  color: white;
  border-radius: 12px;
}

.stat-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  background-color: white;
}

.hovered-card {
  transform: translateY(-4px);
}

.order-item {
  background-color: white;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.order-item:hover {
  background-color: #f1f1f1;
}
</style>
