<template>
  <div class="breadcrumbs-container">
    <router-link
        v-for="(path, index) in crumbs"
        :key="path"
        :aria-label="`redirection to the page ${path}`"
        :tabindex="isShowMenu || isShowPopup ? -1 : 0"
        class="path"
        v-bind:class="{'path--not-first': index > 0, 'path--active' : index === crumbs.length - 1}"
        tag="button"
        :disabled="index === crumbs.length - 1"
        :to="`/${path}`">{{ capitalizeFirstLetter(path) }}</router-link>
  </div>
</template>

<script>
import { helpersMethodsMixin } from '../mixins/helpers-methods';
import { mapGettersForiSShowMenuAndIsShowPopup } from '../mixins/initial-computed';

export default {
  name: 'Breadcrumbs',
  mixins: [helpersMethodsMixin, mapGettersForiSShowMenuAndIsShowPopup],
  computed: {
      crumbs() {
        return this.$route.path.split("/").filter(path => path);
      }
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.breadcrumbs-container {
    padding: 10px;
    padding-left: 50px;
    .path {
        color: $white-color;
        padding: 3px 4px;
        text-decoration: none;
        background-color: $royal-purpure-color;
        border-radius: 2px;
        margin-right: 2px;
        @include hover-opacity;
        &--not-first {
            &:before {
                content: "\2022";
                color: $white-color;
                margin: 0 5px;
                padding: 2px 0 0;
            }
        }
        &--active {
            cursor: default;
            background-color: $morning-blue-color;
            &:hover {
                opacity: 1;
            }
        }

    }
}
</style>