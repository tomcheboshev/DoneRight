<template>
  <div class="buyer-dashboard">
    <h2 class="dashboard-title">Your Job Requests</h2>

    <div class="request-list">
      <div v-for="request in jobRequests" :key="request.id" class="request-card">
        <div class="request-details">
          <h3>{{ request.service }}</h3>
          <p>Status: <span :class="statusClass(request.status)">{{ request.status }}</span></p>
        </div>
        <button class="details-button" @click="viewDetails(request.id)">View Details</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobRequests: [
        { id: 1, service: 'Plumbing Fix', status: 'Completed' },
        { id: 2, service: 'Electrical Repair', status: 'In Progress' },
        { id: 3, service: 'Painting Job', status: 'Pending' },
        { id: 4, service: 'Carpentry Repair', status: 'Completed' },
      ],
    };
  },
  methods: {
    statusClass(status) {
      return {
        'status-completed': status === 'Completed',
        'status-in-progress': status === 'In Progress',
        'status-pending': status === 'Pending',
      };
    },
    viewDetails(id) {
      alert(`View details for job request #${id}`);
    },
  },
};
</script>

<style scoped>
.buyer-dashboard {
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.dashboard-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.request-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1.5rem;
}

.request-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  transition: transform 0.2s;
}

.request-card:hover {
  transform: translateY(-5px);
}

.request-details h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.request-details p {
  font-size: 1rem;
  color: #555;
}

.status-completed {
  color: #28a745;
  font-weight: bold;
}

.status-in-progress {
  color: #ffc107;
  font-weight: bold;
}

.status-pending {
  color: #dc3545;
  font-weight: bold;
}

.details-button {
  margin-top: 1rem;
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.details-button:hover {
  background-color: #0056b3;
}
</style>
