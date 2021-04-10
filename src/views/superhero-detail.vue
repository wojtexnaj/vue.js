<template>
  <div>
    <transition name="fade" v-if="sueprhero">
      <div class="superhero-detail-container">
        <Breadcrumbs />
        <h3
          :tabindex="isShowMenu || isShowPopup ? -1 : 0"
          class="main-header"
          id="hero-name"
          >{{ sueprhero.name }}</h3>
        <div class="superhero-detail-content">
            <div class="superhero-detail-content__info" v-if="superheroDisplayInfo">
                <div
                  v-for="(propertyValue, propertyKey) in superheroDisplayInfo"
                  :key="propertyKey"
                  class="elem-box">
                    <h3 :tabindex="isShowMenu || isShowPopup ? -1 : 0" class="subtitle">{{ capitalizeFirstLetter(propertyKey) }}</h3>
                    <div
                      v-for="(value, key) in propertyValue"
                      :key="key"
                      class="elem-box__elem"
                      :tabindex="isShowMenu || isShowPopup ? -1 : 0">
                        <span class="elem-box__elem--key">{{ capitalizeFirstLetter(key) }}:</span>
                        <span
                        :aria-label="value === null || value === 'null' || value === '-' || value.toString() === '-' ?  'no information' : value"
                        class="elem-box__elem--value">{{ value === null || value === 'null' ? "-" : value.toString() }}</span>
                    </div>
                </div>
            </div>
            <div class="superhero-detail-content__image">
                <img
                  :src="loadedImage ? sueprhero.image.url : defaultHeroImage"
                  :alt="`${sueprhero.name} image`"
                  :tabindex="isShowMenu || isShowPopup ? -1 : 0"
                  @error="isErrorImage">
            </div>
        </div>
      </div>
    </transition>
    <Spinner v-if="loading"/>
  </div>
</template>

<script>
import Breadcrumbs from '../components/breadcrumbs';
import Spinner from '../components/spinner';
import { superheroesService } from '../services';
import { helpersMethodsMixin } from '../mixins/helpers-methods';
import { mapGettersForiSShowMenuAndIsShowPopup } from '../mixins/initial-computed';
import defaultHeroImage from "../assets/user.png"

export default {
  name: 'SuperHeroDetail',
  mixins: [helpersMethodsMixin, mapGettersForiSShowMenuAndIsShowPopup],
  components: {
    Breadcrumbs,
    Spinner
  },
  data() {
    return {
      sueprhero: null,
      superheroDisplayInfo: {},
      loading: true,
      defaultHeroImage: defaultHeroImage,
      loadedImage: true
    }
  },
  methods: {
      async getSuperHero() {
        this.sueprhero = await superheroesService.getSuperHero(this.$route.params.id);
        this.mapSuperHeroToObjectToDisplayInfo();
        setTimeout(() => {
          this.loading = false
          const heroName = document.getElementById('hero-name');
          if (heroName) heroName.focus();
        });
      },
      mapSuperHeroToObjectToDisplayInfo() {
        if (!this.sueprhero) return;
        const properties = ['appearance', 'powerstats', 'work', 'biography', 'connections'];
        for (const property in this.sueprhero) {
          if (properties.includes(property)) {
            this.superheroDisplayInfo[property] = this.sueprhero[property];
          }
        }
      },
      isErrorImage() {
          this.loadedImage = false;
      }
  },
  created() {
    this.getSuperHero();
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.superhero-detail-container {
  @include container;
  .superhero-detail-content {
    display: flex;
    justify-content: center;
    flex-direction: column-reverse;
    &__info {
      margin-right: 20px;
      font-size: 20px;
      width: 100%;
      .subtitle {
        margin: 10px;
        font-size: 24px;
        font-weight: bold;
        color: $royal-purpure-color;
        text-align: center;
      }
      .elem-box {
        &__elem {
          display: flex;
          justify-content: space-between;
          margin: 5px;
          width: 100%;
          &--key {
            color: $morning-blue-color;
            margin-right: 5px;
          }
          &--value {
            word-break: break-word;
            font-weight: bold;
            text-align: right;
          }
        }
      }
    }
    &__image {
      min-width: 25%;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  @include respond-to(sm) {
    .superhero-detail-content {
      display: flex;
      justify-content: center;
      align-items: start;
      flex-direction: row;
      &__info {
        width: 50%;
        .elem-box {
          min-width: 400px;
          &__elem {
            padding-left: 7%;
            padding-right: 7%;
          }
        }
      }
    }
  }
  @include respond-to(lg) {
  .superhero-detail-content {
      &__info {
        width: 40%;
      }
    }
  }
  @include respond-to(xl) {
    .superhero-detail-content {
      &__info {
        width: 30%;
      }
    }
  }
}
</style>