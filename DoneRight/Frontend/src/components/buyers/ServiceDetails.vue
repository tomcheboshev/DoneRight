<script setup>
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.push("/services");
};
</script>

<template>
  <DefaultLayout>
    <v-container class="py-12 details-container" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="details-card" elevation="12" rounded="xl">
            <v-img
              :src="route.query.image"
              height="220"
              cover
              class="rounded-t-xl"
            />

            <v-card-title class="text-center">
              <h2 class="name">{{ route.query.name }} {{ route.query.lastName }}</h2>
            </v-card-title>

            <v-card-subtitle class="text-center job-title mb-4">
              {{ route.query.job }}
            </v-card-subtitle>

            <v-card-text class="description text-center">
              {{ route.query.description || 'Описот не е достапен.' }}
            </v-card-text>

            <v-card-actions class="justify-center mt-4">
              <v-btn
                color="primary"
                class="contact-btn"
                rounded
                size="large"
              >
                <v-icon start>mdi-handshake</v-icon>
                Hire Now
              </v-btn>
              <v-btn
                color="grey lighten-2"
                class="back-btn"
                rounded
                size="large"
                @click="goBack"
              >
                <v-icon start>mdi-arrow-left</v-icon>
                Go Back
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<style scoped>
.details-container {
  background: linear-gradient(135deg, #f4f7f9, #e0e5eb);
  min-height: 100vh;
}

.details-card {
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.details-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.name {
  font-weight: 700;
  font-size: 1.7rem;
  color: #2c3e50;
}

.job-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #616161;
}

.description {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  padding: 0 10px;
}

.contact-btn {
  background: linear-gradient(135deg, #42a5f5, #1e88e5);
  color: white !important;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(33, 150, 243, 0.3);
  transition: transform 0.2s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
}

.back-btn {
  background-color: #eeeeee !important;
  color: #333 !important;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.back-btn:hover {
  background-color: #e0e0e0 !important;
  transform: translateY(-2px);
}
</style>
