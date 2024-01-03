<template>
	<div class="container">
		<div class="nav-wrapper">
			<transition>
				<nav class="mobile-nav" v-show="navOpen">
					<NuxtLink to="/">Mercury</NuxtLink>
					<NuxtLink to="venus">Venus</NuxtLink>
					<NuxtLink to="earth">Earth</NuxtLink>
					<NuxtLink to="mars">Mars</NuxtLink>
					<NuxtLink to="jupiter">Jupiter</NuxtLink>
					<NuxtLink to="saturn">Saturn</NuxtLink>
					<NuxtLink to="uranus">Uranus</NuxtLink>
					<NuxtLink to="neptune">Neptune</NuxtLink>
				</nav>
			</transition>
			<h5>The Planets</h5>
			<img
				:style="[navOpen ? { opacity: 0.5 } : { opacity: 1 }]"
				@click="toggleNav"
				src="/images/icon-hamburger.svg"
			/>
			<nav class="desktop-nav">
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
export default {
	data() {
		return {
			navOpen: false,
			windowWidth: null,
		};
	},
	methods: {
		toggleNav() {
			this.navOpen = !this.navOpen;
		},
		reshowNav() {
			if (window.innerWidth > 630) {
				this.navOpen = false;
			}
		},
	},
	watch: {
		$route() {
			this.navOpen = false;
		},
	},
	mounted() {
		window.addEventListener('resize', this.reshowNav);
	},
	destroyed() {
		window.removeEventListener('resize', this.reshowNav);
	},
};
</script>

<style lang="scss">
.nav-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 14px 0px;
	border-bottom: 1px solid #ffffff25;
	img {
		display: none;
	}
	@media only screen and (max-width: 850px) {
		flex-direction: column;
		h5 {
			margin-bottom: 30px;
			@media only screen and (max-width: 630px) {
				margin-bottom: 0px;
			}
		}
		@media only screen and (max-width: 630px) {
			flex-direction: row;
			img {
				display: block;
				cursor: pointer;
			}
		}
	}
	nav {
		display: flex;
		gap: 24px;
		a {
			transition: opacity 0.5s ease-in-out;
			&:hover {
				opacity: 0.5;
			}
		}
		@media only screen and (max-width: 850px) {
			margin-bottom: 10px;
		}
	}

	.desktop-nav {
		@media only screen and (max-width: 630px) {
			display: none;
		}
	}

	.mobile-nav {
		display: none;
		@media only screen and (max-width: 630px) {
			display: flex;
		}
		margin-bottom: 0px;
		position: absolute;
		height: 100%;
		background: black;
		z-index: 9999;
		width: 100%;
		top: 71px;
		display: flex;
		flex-direction: column;
		left: 0;
		padding: 15px;
		a {
			font-size: 15px;
		}
	}
}
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
