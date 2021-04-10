<template>
  <div class="superhero-container">
    <Breadcrumbs />

    <h3
      :tabindex="isShowMenu || isShowPopup ? -1 : 0"
      class="main-header">SUPER HERO</h3>

    <SearchSuperHeroes @superheroName="handleSuperheroName" />
      <transition name="fade">
        <div class="icon-user-plus" :class="{'icon-user-plus--next-to-trash-icon' : sueprheroes.length}">
        <router-link :to="`/add-own-hero`" :tabindex="isShowMenu || isShowPopup ? -1 : 0">
          <font-awesome-icon
            title="add own super hero"
            icon="user-plus"
            size="lg"/>
        </router-link>
        </div>
      </transition>

      <transition name="fade">
        <font-awesome-icon
          v-if="sueprheroes.length"
          @click="clearSearchResults"
          @keypress.enter="clearSearchResults"
          :tabindex="isShowMenu || isShowPopup ? -1 : 0"
          title="clear search results"
          class="icon-trash-alt"
          icon="trash-alt"
          size="lg"/>
    </transition>

    <ElementsList
      :elements="sueprheroes"
      :initPaginationPage="initPaginationPage"
      ref="sueprheroes"
      :type="'superheroes'"
      @navigateTo="handleNavigateToSuperHero"
      @currentPaginationPage="handleCurrentPaginationPage"/>

    <Spinner v-if="loading"/>

    <Toast
      v-if="isToast"
      :data="dataForToast"
       @destroyToast="hideToast"/>
  </div>
</template>

<script>
import Breadcrumbs from '../components/breadcrumbs';
import SearchSuperHeroes from '../components/search-superheroes';
import ElementsList from '../components/elements-list';
import Spinner from '../components/spinner';
import Toast from '../components/toast';
import { superheroesService } from '../services';
import { mapGettersForiSShowMenuAndIsShowPopup, toastMethodsMixin } from '../mixins';

export default {
  name: 'SuperHeroes',
  components: {
    Breadcrumbs,
    SearchSuperHeroes,
    ElementsList,
    Spinner,
    Toast
  },
  mixins: [mapGettersForiSShowMenuAndIsShowPopup, toastMethodsMixin],
  data() {
    return {
      sueprheroes: [],
      loading: false,
      currentPaginationPage: 0,
      initPaginationPage: 0,
      isToast: false,
      dataForToast: {
              message: '',
              duration: 2000 // milliseconds
          },
    }
  },
  methods: {
    async handleSuperheroName(event) {
      this.loading = true;
      this.currentPaginationPage = 0;
      this.sueprheroes = await superheroesService.getSuperHeroes(event);
      if(!this.sueprheroes.length) {
        this.showToast('Character with given name not found!');
      }
      this.setSearchingStateOnStorages();
      this.loading = false;
    },
    handleNavigateToSuperHero(event) {
      this.setSearchingStateOnStorages();
      this.$router.push({ path: `/super-heroes/${event}`});
    },
    handleCurrentPaginationPage(event) {
      this.currentPaginationPage = event;
      this.setSearchingStateOnStorages();
    },
    setSearchingStateOnStorages() {
      const superHeroesObjectToStorages = this.createObjectToUpdateStorages();
      localStorage.setItem('superheroes_searching_state', JSON.stringify(superHeroesObjectToStorages));
      this.$store.dispatch('updateSuperHeroesObject', superHeroesObjectToStorages);
    },
    createObjectToUpdateStorages() {
      return { sueprheroes: this.sueprheroes, currentPaginationPage: this.currentPaginationPage };
    },
    clearSearchResults() {
      this.sueprheroes = [];
      this.currentPaginationPage = 0;
      this.setSearchingStateOnStorages();
    }
  },
    created() {
      const super_heroes_state_from_store = this.$store.state.super_heroes_object;
      const super_heroes_state_from_localStorage = JSON.parse(localStorage.getItem('superheroes_searching_state'));

      if (super_heroes_state_from_store.sueprheroes.length) {
        this.sueprheroes = super_heroes_state_from_store.sueprheroes;
        this.initPaginationPage = super_heroes_state_from_store.currentPaginationPage;
      }else if (!super_heroes_state_from_store.sueprheroes.length && super_heroes_state_from_localStorage) {
        this.sueprheroes = super_heroes_state_from_localStorage.sueprheroes;
        this.initPaginationPage = super_heroes_state_from_localStorage.currentPaginationPage;
        this.$store.dispatch('updateSuperHeroesObject', this.createObjectToUpdateStorages());
      }
  },
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.superhero-container {
  @include container;
  .icon-trash-alt, .icon-user-plus {
    position: absolute;
    top: 20px !important;
    cursor: pointer;
    @include hover-opacity;
    color: $royal-purpure-color;
  }
  .icon-trash-alt {
    right: 20px !important;
  }
  .icon-user-plus {
    right: 20px !important;
    &--next-to-trash-icon {
      right: 60px !important;
    }
  }
}
</style>