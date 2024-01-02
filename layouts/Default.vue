<template>
    <div>
        <div>
            <h1>The Planets</h1>
            <nav>
                <NuxtLink to="/">Mercury</NuxtLink>
                <NuxtLink to="venus">Venus</NuxtLink>
                <NuxtLink to="earth">Earth</NuxtLink>
                <NuxtLink to="mars">Mars</NuxtLink>
                <NuxtLink to="jupiter">Jupiter</NuxtLink>
                <NuxtLink to="saturn">Saturn</NuxtLink>
                <NuxtLink to="uranus">Uranus</NuxtLink>
                <NuxtLink to="neptune">Neptune</NuxtLink>
            </nav>
        </div>
        <main>
            <slot />
        </main>
    </div>
</template>

<script>
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    background: url('/images/background-stars.svg') center no-repeat, #000;
    background-size: cover;
}
</style>