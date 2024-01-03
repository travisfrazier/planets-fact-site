<template>
    <main>
        <div class="planet-buttons mobile">
            <button v-bind:class="{ active: overview }" @click="viewOverview">Overview</button>
            <button v-bind:class="{ active: structure }" @click="viewStructure">Structure</button>
            <button v-bind:class="{ active: geology }" @click="viewGeology">Geology</button>
        </div>
        <section>
            <div class="planet-top">
                <div class="planet-image">
                    <img v-show="overview || geology" :src="planet.images.planet" />
                    <img v-show="structure" :src="planet.images.internal" />
                    <img class="geology-img" v-show="geology" :src="planet.images.geology" />
                </div>
                <div class="planet-info">
                    <div>
                        <h1>{{ planet.name }}</h1>
                        <p v-if="overview">{{ planet.overview.content }}</p>
                        <p v-if="structure">{{ planet.structure.content }}</p>
                        <p v-if="geology">{{ planet.geology.content }}</p>
                        <div class="planet-source-wrapper">
                            <span>Source : </span>
                            <a :href="planet.overview.source">Wikipedia</a>
                        </div>
                    </div>
                    <div class="planet-buttons desktop">
                        <button v-bind:class="{ active: overview }" @click="viewOverview">01 Overview</button>
                        <button v-bind:class="{ active: structure }" @click="viewStructure">02 Interal Structure</button>
                        <button v-bind:class="{ active: geology }" @click="viewGeology">03 Surface Geology</button>
                    </div>
                </div>
            </div>
            <div class="planet-bottom">
                <div class="planet-fact">
                    <h4>Rotation Time</h4>
                    <h2>{{ planet.rotation }}</h2>
                </div>
                <div class="planet-fact">
                    <h4>Revolution Time</h4>
                    <h2>{{ planet.revolution }}</h2>
                </div>
                <div class="planet-fact">
                    <h4>Radius</h4>
                    <h2>{{ planet.radius }}</h2>
                </div>
                <div class="planet-fact">
                    <h4>Average Temp.</h4>
                    <h2>{{ planet.temperature }}</h2>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                overview: true,
                structure: false,
                geology: false,
                color: this.planet.color          
            }
        },
        props: {
            planet: Object,
        },
        methods: {
            viewOverview() {
                this.overview = true;
                this.structure = false;
                this.geology = false;
            },
            viewStructure() {
                this.overview = false;
                this.structure = true;
                this.geology = false;
            },
            viewGeology() {
                this.overview = false;
                this.structure = false;
                this.geology = true;
            }
        }
    }
</script>

<style lang="scss">
section {
    padding: 126px 50px 56px;
    @media only screen and (max-width: 630px) {
        padding: 0px 25px 50px;
    }
}
.planet-top {
    margin-bottom: 87px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
    @media only screen and (max-width: 850px) {
        flex-direction: column;
    }
    @media only screen and (max-width: 630px) {
        margin-bottom: 0px;
        padding-top: 75px;
    }
    .planet-info {
        max-width: 350px;
        @media only screen and (max-width: 850px) {
            max-width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            align-items: center;
        }
        @media only screen and (max-width: 630px) {
            grid-template-columns: 1fr;
        }
        p {
            margin-bottom: 24px;
        }
        div {
            @media only screen and (max-width: 630px) {
                text-align: center;
            }
        }
    }
    .planet-image {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        .geology-img {
            position: absolute;
            width: 175px;
            top: 70%;
            @media only screen and (max-width: 630px) {
                width: 75px;
            }
        }
    }
}

.planet-source-wrapper {
    opacity: .5;
    margin-bottom: 40px;
    span {
        font-weight: 400;
    }
    a {
        text-transform: capitalize;
        text-decoration: underline;
        font-size: 14px;
        &:after {
            content: url('/images/icon-source.svg');
            width: 12px;
            height: 12px;
            margin-left: 5px;
            display: inline-block;
            vertical-align: middle;
            line-height: normal;
        }
        &:visited {
            color: $color-white;
        }
    }
}

.planet-buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
    @media only screen and (max-width: 630px) {
        order: 0;
    }
    button {
        cursor: pointer;
        padding: 16px 0px 16px 28px;
        background: none;
        color: $color-white;
        border: 1px solid $color-white;
        text-align: left;
        transition: all .4s ease-in-out;
        &:hover {
            background-color: $color-dark-grey;
            border-color: $color-dark-grey;
        }
        &.active {
            background-color: v-bind(color);
            border-color: v-bind(color);
        }
    }
    &.desktop {
        @media only screen and (max-width: 630px) {
            display: none;
        }
    }

    &.mobile {
        display: none;
        width: 100%;
        flex-direction: row;
        @media only screen and (max-width: 630px) {
            display: flex;
        }
        button {
            border: transparent;
            background: none;
            width: 100%;
            padding: 14px 0px;
            text-align: center;
            &.active {
                border-bottom: 3px solid v-bind(color);
            }
        }
    }
}

.planet-bottom {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    @media only screen and (max-width: 630px) {
        flex-direction: column;
        align-items: center;   
        justify-content: center;
    }
}
.planet-fact {
    width: 100%;
    border: 1px solid $color-white;
    padding: 12px;
    @media only screen and (max-width: 630px) {
        display: flex;
        align-items: center;
        justify-content: space-between; 
        padding: 0px;
    }
    h4 {
        opacity: .5;
        text-transform: uppercase;
        @media only screen and (max-width: 630px) {
            padding-left: 16px;
        }
    }
    h2 {
        @media only screen and (max-width: 630px) {
            padding-right: 16px;
        }
    }
}
</style>