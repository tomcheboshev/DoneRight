<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HeroSection from '@/components/common/HeroSection.vue';
import CategoriesSection from '@/components/common/CategoriesSection.vue';
import ApplySection from '@/components/common/ApplySection.vue';
import MobileAppSection from '@/components/common/MobileAppSection.vue';
import Why from '@/components/common/WhyChooseUsSection.vue';
</script>

<template>
    <DefaultLayout>
      <HeroSection />
      <CategoriesSection />
      <ApplySection />
      <MobileAppSection />
      <Why />
    </DefaultLayout>
</template>
