<template>
    <div>
        <h2>{{ planet.name }}</h2>
    </div>
</template>

<script>
    export default {
        props: {
            planet: Object,
        }
    }
</script>

<style lang="scss" scoped>
h2 {
    color: red;
}
</style>