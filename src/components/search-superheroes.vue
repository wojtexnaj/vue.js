<template>
  <div class="search-superhero-container">
    <input
      :tabindex="isShowPopup || isShowMenu ? -1 : 0"
      class="search-superhero-input"
      type="text"
      name="hero"
      placeholder="Search by name"
      v-model="searchValue"
      @input="searchSuperHero">
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { mapGettersForiSShowMenuAndIsShowPopup } from '../mixins/initial-computed';

export default {
  name: 'SearchSuperHeroes',
  mixins: [mapGettersForiSShowMenuAndIsShowPopup],
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    searchSuperHero: debounce(function() {
      this.$emit('superheroName', this.searchValue);
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

@include input-container(search-superhero);
</style>