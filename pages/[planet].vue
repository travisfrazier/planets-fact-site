<script setup>
const route = useRoute();
const planetName = route.params.planet;

const { data: planets } = await useFetch("/api/planets");
const planet = planets.value?.find((p) => p.name.toLowerCase() === planetName);
</script>

<template>
  <Planet v-if="planet" :planet="planet" />
</template>
