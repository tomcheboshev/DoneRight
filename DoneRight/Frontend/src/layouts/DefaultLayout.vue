<template>
  <div>
    <HeaderSection />
    
    <main>
      <!-- <PreloaderSection /> -->
      <slot></slot> 
    </main>

    <FooterSection />
  </div>
</template>

<script>
// import PreloaderSection from '@/components/common/PreloaderSection.vue';
import HeaderSection from '@/components/common/HeaderSection.vue';
import FooterSection from '@/components/common/FooterSection.vue';

export default {
  components: {
    HeaderSection,
    FooterSection,
    // PreloaderSection,
  },
};
</script>

<style scoped></style>
