<template>
    <Planet :planet="planet" />
</template>

<script>
import planetData from '../data.json';

export default {
    data() {
        return { planet: planetData[7] }
    }
}
</script>