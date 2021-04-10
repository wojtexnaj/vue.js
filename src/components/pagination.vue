<template>
  <div
    class="pagination-container"
    :tabindex="isShowMenu || isShowPopup ? -1 : 0"
    aria-label="pagination">
    <div
      class="pagination-container__range-label">
        <span
          :tabindex="isShowMenu || isShowPopup ? -1 : 0"
          :aria-label="`current pagination range from ${data.currentRanges.start + 1} to ${data.currentRanges.end > data.length ? data.length : data.currentRanges.end}`"
          >{{ data.currentRanges.start + 1 }}-{{ data.currentRanges.end > data.length ? data.length : data.currentRanges.end }} /</span>
        <span
          :tabindex="isShowMenu || isShowPopup ? -1 : 0"
          :aria-label="`number of pagination elements: ${data.length}`"
          >{{ data.length }}</span>
    </div>
    <div class="pagination-container__navigation">
        <button
          @click="previousPage"
          :disabled="currentPaginationPage === 0"
          :tabindex="isShowMenu || isShowPopup ? -1 : 0"
          aria-label="go to previous range of pagination"
          ><font-awesome-icon icon="chevron-left" /></button>
        <button
          @click="nextPage"
          :disabled="data.length/data.mainRange <= currentPaginationPage + 1"
          :tabindex="isShowMenu || isShowPopup ? -1 : 0"
          aria-label="go to next range of pagination"
          ><font-awesome-icon icon="chevron-right" /></button>

    </div>
  </div>
</template>

<script>
import { mapGettersForiSShowMenuAndIsShowPopup } from '../mixins/initial-computed';

export default {
  name: 'Pagination',
  mixins: [mapGettersForiSShowMenuAndIsShowPopup],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    currentPaginationPage: {
      type: Number,
      default: () => 0
    }
  },
  methods: {
    previousPage() {
      this.$emit('previousPage');
    },
    nextPage() {
      this.$emit('nextPage');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.pagination-container {
    border-radius: 2px;
    box-shadow: 1px 2px 3px 0 $faded-black-box-shadow;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: $faded-black;
    background-color: $white-color;
    &__range-label {
        font-size: 14px;
        margin-right: 30px;
    }
    &__navigation {
        button {
            margin-right: 15px;
            min-width: 20px;
            background-color: transparent;
            color: $faded-black;
            &:disabled {
                opacity: .5;
                cursor: default;
            }
        }
    }
}
</style>