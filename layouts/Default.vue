<template>
    <div class="container">
        <div class="nav-wrapper">
            <h5>The Planets</h5>
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
.nav-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0px;
    nav {
        display: flex;
        gap: 24px;
        a {
            transition: opacity .5s ease-in-out;
            &:hover {
                opacity: .5;
            }
        }
    }
}
</style>