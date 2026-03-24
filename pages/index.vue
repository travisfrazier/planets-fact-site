<template>
  <Planet :planet="planet" />
</template>

<script setup>
const { data: planets } = await useFetch("/api/planets");
const planet = planets.value?.find((p) => p.slug === "mercury");
</script>
