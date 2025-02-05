<template>
  <div class="seller-seller-dashboard">
    <!-- Sidebar or Navigation -->
    <nav class="seller-dashboard-nav">
      <ul>
        <li><RouterLink to="/seller-dashboard">Dashboard Overview</RouterLink></li>
        <li><RouterLink to="/seller-dashboard/services">Manage Services</RouterLink></li>
        <li><RouterLink to="/seller-dashboard/orders">Orders</RouterLink></li>
        <li><RouterLink to="/seller-dashboard/reviews">Reviews</RouterLink></li>
        <li><RouterLink to="/seller-dashboard/earnings">Earnings</RouterLink></li>
        <li><RouterLink to="/seller-dashboard/settings">Settings</RouterLink></li>
      </ul>
    </nav>

    <!-- Main Content -->
    <div class="main-content">
      <h1>Welcome to Your Dashboard</h1>
      
      <!-- Profile Section -->
      <section class="profile-overview">
        <img :src="user.profilePicture" alt="Profile Picture" class="profile-img" />
        <div class="profile-info">
          <h2>{{ user.firstName }} {{ user.lastName }}</h2>
          <p>{{ user.email }}</p>
          <p>{{ user.city }}</p>
          <button @click="router.push('/edit')">Edit Profile</button>
        </div>
      </section>

      <!-- Service Management -->
      <section class="services">
        <h2>Your Services</h2>
        <button @click="addService">Add New Service</button>
        <div class="service-list">
          <div v-for="service in services" :key="service.id" class="service-item">
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <button @click="editService(service.id)">Edit</button>
            <button @click="deleteService(service.id)">Delete</button>
          </div>
        </div>
      </section>

      <!-- Orders -->
      <section class="orders">
        <h2>Incoming Orders</h2>
        <div v-for="order in orders" :key="order.id" class="order-item">
          <p>{{ order.customerName }} requested {{ order.serviceTitle }}</p>
          <p>Status: {{ order.status }}</p>
          <button @click="acceptOrder(order.id)">Accept</button>
          <button @click="rejectOrder(order.id)">Reject</button>
        </div>
      </section>

      <!-- Earnings -->
      <section class="earnings">
        <h2>Your Earnings</h2>
        <p>Total Earnings: {{ totalEarnings }}</p>
        <button @click="withdrawEarnings">Withdraw Funds</button>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// Simulated data (replace with actual data from backend)
const user = ref({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  city: "New York",
  profilePicture: "/path/to/profile.jpg",
});

const services = ref([
  { id: 1, title: "Web Development", description: "Build modern websites" },
  { id: 2, title: "Graphic Design", description: "Design logos and visuals" },
]);

const orders = ref([
  { id: 1, customerName: "Alice", serviceTitle: "Web Development", status: "Pending" },
  { id: 2, customerName: "Bob", serviceTitle: "Graphic Design", status: "In-progress" },
]);

const totalEarnings = ref(250);


const addService = () => {
  // Logic to add new service (navigate to service creation page)
  router.push("/add-service");
};

const editService = (serviceId) => {
  // Navigate to service edit page
  router.push(`/edit-service/${serviceId}`);
};

const deleteService = (serviceId) => {
  // Logic to delete service
  services.value = services.value.filter(service => service.id !== serviceId);
};

const acceptOrder = (orderId) => {
  // Update order status to accepted
  const order = orders.value.find(order => order.id === orderId);
  order.status = "Accepted";
};

const rejectOrder = (orderId) => {
  // Update order status to rejected
  const order = orders.value.find(order => order.id === orderId);
  order.status = "Rejected";
};

const withdrawEarnings = () => {
  // Logic to handle earnings withdrawal
  alert("Your withdrawal request has been received!");
};
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #1f1f1f;
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* Dashboard Container */
.seller-seller-dashboard {
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin-top: 50px;
}

/* Sidebar */
.seller-dashboard-nav {
  width: 250px;
  background: #2a2a2a;
  padding: 30px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.seller-dashboard-nav ul {
  list-style-type: none;
}

.seller-dashboard-nav li {
  margin-bottom: 20px;
}

.seller-dashboard-nav a {
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  display: block;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.seller-dashboard-nav a:hover {
  background-color: #4e73df;
}

/* Main Content */
.main-content {
  flex-grow: 1;
  background: linear-gradient(135deg, #2a2a2a, #4e73df);
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-left: 30px;
}

h1 {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}

section {
  margin-bottom: 40px;
}

/* Profile Overview */
.profile-overview {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4e73df;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.profile-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.profile-info h2 {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
}

.profile-info p {
  font-size: 16px;
  color: #bbb;
}

button {
  background-color: #4e73df;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #365a8a;
  transform: scale(1.05);
}

/* Services Section */
.services {
  background: #3a3a3a;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.services h2 {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
}

.services .service-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.service-item {
  background: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.service-item:hover {
  transform: translateY(-5px);
  background-color: #4e73df;
}

.service-item h3 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
}

.service-item p {
  color: #bbb;
  margin-bottom: 20px;
}

.service-item button {
  background-color: #365a8a;
  padding: 8px 18px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.service-item button:hover {
  background-color: #2a4a72;
  transform: scale(1.1);
}

/* Orders Section */
.orders {
  background: #3a3a3a;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.orders h2 {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
}

.order-item {
  background: #333;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-item p {
  color: #bbb;
}

.order-item button {
  background-color: #4e73df;
  padding: 6px 15px;
  border-radius: 25px;
  font-size: 14px;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.order-item button:hover {
  background-color: #365a8a;
}

/* Earnings Section */
.earnings {
  background: #3a3a3a;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.earnings h2 {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
}

.earnings p {
  font-size: 18px;
  font-weight: 500;
  color: #bbb;
  margin-bottom: 20px;
}

.earnings button {
  background-color: #4e73df;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.earnings button:hover {
  background-color: #365a8a;
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .seller-seller-dashboard {
    flex-direction: column;
    gap: 30px;
  }

  .seller-dashboard-nav {
    width: 100%;
    margin-bottom: 30px;
  }

  .main-content {
    width: 100%;
    margin-left: 0;
  }

  .service-list {
    grid-template-columns: 1fr 1fr;
  }
}

</style>
