<template>
  <div id="app">
    <router-view />
    <Navigation />
  </div>
</template>

<script>
import Navigation from './components/navigation';

export default {
  name: 'App',
  components: {
      Navigation
  }
}
</script>

<style lang="scss">
@import './design/index.scss';
</style>
