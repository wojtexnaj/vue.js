<template>
    <div class="navigation-container">
        <div class="navigation-container__links-box" v-bind:class="{'navigation-container__links-box--show': isShowMenu}">
            <font-awesome-icon
                :tabindex="!isShowPopup && isShowMenu ? 0 : -1"
                title="hide navigation"
                class="icon-times"
                id="hideMenuIcon"
                icon="times"
                size="lg"
                @click="hideMenu"
                @keypress.enter="hideMenu"/>
            <div class="links" @click="hideMenu">
                <router-link
                    :tabindex="!isShowPopup && isShowMenu ? 0 : -1"
                    :aria-label="`go to ${link} page`"
                    v-for="link in links"
                    :key="link"
                    :class="`link ${link === currentPathName ? 'link--active' : ''}`"
                    :to="`/${link}`"
                    tag="button"
                    :disabled="currentPathName === link"
                    >{{ capitalizeFirstLetter(link) }}</router-link>
            </div>
        </div>
        <div class="navigation-container__overlay" v-if="isShowMenu" @click="hideMenu"></div>
        <font-awesome-icon
            :tabindex="!isShowMenu ? (isShowPopup ? -1 : 0) : -1"
            title="show navigation"
            class="icon-bars"
            id="showMenuIcon"
            icon="bars"
            size="lg"
            @click="showMenu"
            @keypress.enter="showMenu"/>
    </div>
</template>

<script>
import { helpersMethodsMixin } from '../mixins/helpers-methods';
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  mixins: [helpersMethodsMixin],
  data: () => {
      return {
        links: ['todo', 'super-heroes'],
        isShowMenu: false,
        currentPathName: ''
      }
  },
  methods: {
    showMenu() {
        this.isShowMenu = true;
        this.$store.dispatch('updateIsShowMenu', this.isShowMenu);
        const hideMenuIcon = document.getElementById('hideMenuIcon');
        hideMenuIcon.focus();
    },
    hideMenu() {
        this.isShowMenu = false;
        this.$store.dispatch('updateIsShowMenu', this.isShowMenu);
        const showMenuIcon = document.getElementById('showMenuIcon');
        showMenuIcon.focus();
    }
  },
  updated() {
      this.currentPathName = this.$route.name;

  },
  computed: {
    ...mapGetters({
      isShowPopup: 'getIsShowPopup'
    }),
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.navigation-container {
    &__links-box {
        position: fixed;
        top: 0;
        left: -360px;
        bottom: 0;
        background-color: $royal-purpure-color;
        transition: left 0.4s ease-in-out;
        z-index: $z-index-navigation;
        &--show {
            left: 0;
        }
        .links {
            display: flex;
            flex-direction: column;
            margin: 10vh;

            .link {
                color: $white-color;
                font-size: 24px;
                text-decoration: none;
                padding: 10px;
                transition: opacity 0.2s ease-in-out;
                background-color: inherit;
                @include hover-opacity;
                &--active {
                    cursor: default;
                    opacity: .8;
                }
            }
        }
    }
    .icon-bars, .icon-times {
        position: absolute;
        top: 20px !important;
        left: 20px !important;
        cursor: pointer;
        @include hover-opacity;
    }
    .icon-bars {
        color: $royal-purpure-color;
    }
    .icon-times {
        color: $white-color;
    }
    &__overlay {
        @include overlay;
    }
}
</style>