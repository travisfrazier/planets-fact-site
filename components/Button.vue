<template>
  <button :class="{ active: isActive }">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    isActive: Boolean,
    color: String,
  },
};
</script>

<style lang="scss">
button {
  cursor: pointer;
  padding: 16px 0px 16px 28px;
  background: none;
  color: $color-white;
  border: 1px solid $color-white;
  text-align: left;
  transition: all 0.4s ease-in-out;
  &:hover {
    background-color: $color-dark-grey;
    border-color: $color-dark-grey;
  }
  &.active {
    background-color: v-bind(color);
    border-color: v-bind(color);
  }
}
</style>
