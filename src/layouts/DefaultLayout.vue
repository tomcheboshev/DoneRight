<template>
  <div>
    <HeaderSection /> <!-- Common Header -->

    <!-- Dynamic Content -->
    <main>
      <slot /> <!-- Default slot for page content -->
    </main>

    <FooterSection /> <!-- Common Footer -->
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';

export default {
  components: {
    HeaderSection,
    FooterSection,
  },
};
</script>

<style scoped>
main {
  padding: 20px;
}
</style>
