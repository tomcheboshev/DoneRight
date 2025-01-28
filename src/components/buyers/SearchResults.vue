<template>
  <div class="search-results">
    <h2>Search Results</h2>
    <div v-if="results.length">
      <ServiceCard
        v-for="result in results"
        :key="result.id"
        :service="result"
      />
    </div>
    <p v-else>No results found. Please try another search.</p>
  </div>
</template>

<script>
import ServiceCard from '@/components/buyers/ServiceCard.vue';

export default {
  components: { ServiceCard },
  data() {
    return {
      results: [
        { id: 1, name: 'John Doe - Electrician', icon: 'fas fa-plug', description: 'Expert in electrical repairs.' },
        { id: 2, name: 'Jane Smith - Plumber', icon: 'fas fa-wrench', description: 'Specialist in plumbing issues.' },
      ],
    };
  },
};
</script>

<style scoped>
.search-results {
  padding: 2rem;
}
</style>
