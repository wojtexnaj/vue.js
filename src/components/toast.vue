<template>
  <div class="toast-container" @click="destroyToast">
      {{ data.message }}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
      data: {
          type: Object,
          default: () => {}
      }
  },
  created () {
    setTimeout(() => this.destroyToast(), this.data.duration);
  },
  methods: {
    destroyToast() {
      this.$emit('destroyToast');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.toast-container {
    z-index: $z-index-toast;
    background-color: $royal-purpure-color;
    color: $white-color;
    font-weight: bold;
    padding: 20px;
    position: fixed;
    left: 20px;
    top: 20px;
    right: 20px;
    border-radius: 3px;
    text-align: center;
    line-height: 2rem;
    word-break: break-word;
    opacity: 0.5;
    cursor: pointer;
    @include respond-to (xs) {
      left: unset;
      width: 200px;
    }
}
</style>