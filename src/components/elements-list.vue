<template>
    <div class="elements-container">
        <div v-if="type === 'todos' && elementsToDisplay.length" class="elements-container__box">
            <ListElem
                v-for="todo in elementsToDisplay"
                :key="todo.id"
                :elem="todo"
                :type="'todo'"
                @updateElem="handleUpdateElem"
                @removeElem="handleRemoveElem"/>
        </div>

        <div v-if="type === 'superheroes' && elementsToDisplay.length" class="elements-container__box">
            <ListElem
                v-for="hero in elementsToDisplay"
                :key="hero.id"
                :elem="hero"
                :type="'hero'"
                @navigateTo="handleNavigateTo"/>
        </div>

        <div v-if="!elementsToDisplay.length" class="elements-container__no-elements">
            List is empty!
        </div>

        <Pagination
            v-if="elementsToDisplay.length"
            :data="dataForPagination"
            :currentPaginationPage="currentPaginationPage"
            @previousPage="handlePreviousPage"
            @nextPage="handleNextPage"/>
    </div>
</template>

<script>
import ListElem from '../components/list-elem';
import Pagination from './pagination';

export default {
  name: 'ElementsList',
  components: {
      ListElem,
      Pagination
  },
  data: () => {
      return {
          elementsToDisplay: [],
          dataForPagination: {
              mainRange: 5,
              currentRanges: {
                  start: 0,
                  end: 0
              },
              length: 0
          },
          currentPaginationPage: 0,
      }
  },
  props: {
      elements: {
          type: Array,
          default: () => [],
      },
      type: {
          type: String,
          default: () => '',
      },
      initPaginationPage: {
          type: Number,
          default: () => 0
      }
  },
  computed: {
    elementsForWatcher() {
        return [...this.elements];
    }
  },
  watch: {
    elements: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.elements = newValue;
        this.dataForPagination.length = newValue.length;
        if (this.type !== 'todos') {
            this.dataForPagination.currentRanges.start = 0;
            this.currentPaginationPage = 0;
        }

        if (this.elements.length <= this.dataForPagination.mainRange) {
            this.dataForPagination.currentRanges.start = 0;
            this.dataForPagination.currentRanges.end = this.elements.length;
            this.currentPaginationPage = 0;
        }else if (this.dataForPagination.length <= this.dataForPagination.currentRanges.start) {
            this.dataForPagination.currentRanges.start = this.dataForPagination.length - this.dataForPagination.mainRange;
            this.dataForPagination.currentRanges.end = this.elements.length;
            this.currentPaginationPage--;
        }

        if (this.elements[this.dataForPagination.currentRanges.start]) {
            if(this.type === 'todos') {
                if(this.dataForPagination.currentRanges.end < this.dataForPagination.mainRange) {
                    this.dataForPagination.currentRanges.end = this.dataForPagination.mainRange;
                }
                this.elementsToDisplay = this.elements.slice(this.dataForPagination.currentRanges.start, this.dataForPagination.currentRanges.end);
            }else {
                this.dataForPagination.currentRanges.end = this.elements.length >= this.dataForPagination.mainRange ? this.dataForPagination.mainRange : this.elements.length;
                this.elementsToDisplay = this.elements.slice(this.dataForPagination.currentRanges.start, this.dataForPagination.currentRanges.end);
            }
        }else {
            this.elementsToDisplay = [];
        }
      },
    },
    initPaginationPage: {
      immediate: true,
      deep: true,
      handler(newValue) {
          for( let i = newValue; i--; ) {
              this.handleNextPage();
          }
      }
    }
  },
  methods: {
    handleUpdateElem(event) {
        this.$emit('updateElem', event);
    },
    handleRemoveElem(event) {
        this.$emit('removeElem', event);
    },
    handlePreviousPage() {
        this.elementsToDisplay = [];
        this.currentPaginationPage--;
        this.$emit('currentPaginationPage', this.currentPaginationPage);
        this.dataForPagination.currentRanges.start = this.dataForPagination.mainRange * this.currentPaginationPage;
        this.dataForPagination.currentRanges.end = this.dataForPagination.mainRange * this.currentPaginationPage * 2 <= 0? this.dataForPagination.mainRange : this.dataForPagination.mainRange * (this.currentPaginationPage + 1);
        this.elementsToDisplay = this.elements.slice(this.dataForPagination.currentRanges.start, this.dataForPagination.currentRanges.end);
    },
    handleNextPage() {
        this.elementsToDisplay = [];
        this.currentPaginationPage++;
        this.$emit('currentPaginationPage', this.currentPaginationPage);
        this.dataForPagination.currentRanges.start = this.dataForPagination.mainRange * this.currentPaginationPage;
        this.dataForPagination.currentRanges.end = this.dataForPagination.mainRange * (this.currentPaginationPage + 1);
        this.elementsToDisplay = this.elements.slice(this.dataForPagination.currentRanges.start, this.dataForPagination.currentRanges.end);
    },
    handleNavigateTo(event) {
        this.$emit('navigateTo', event);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.elements-container {
    min-height: calc(100vh - 182px);
    position: relative;
    padding-bottom: 35px;
    &__box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @include respond-to (xs) {
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
        }
    }
    &__no-elements {
        padding: 20px;
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        color: $royal-purpure-color;
    }
}
</style>