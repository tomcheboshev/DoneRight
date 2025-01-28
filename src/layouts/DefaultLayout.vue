<template>
  <div>
    <HeaderSection />
    
    <main>
      <PreloaderSection />
      <slot></slot> 
    </main>

    <FooterSection />
  </div>
</template>

<script>
import PreloaderSection from '@/components/PreloaderSection.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';

export default {
  components: {
    HeaderSection,
    FooterSection,
    PreloaderSection,
  },
};
</script>

<style scoped></style>
