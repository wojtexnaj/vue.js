<template>
<div v-if="!destroy">
    <transition v-if="type === 'todo'" name="fade">
        <div
            v-if="show"
            class="list-elem"
            :tabindex="isShowMenu || isShowPopup ? -1 : 0"
            aria-label="todo item" >
            <div class="list-elem__name">
                <textarea-autosize
                placeholder="Add todo name"
                :tabindex="isShowMenu || isShowPopup ? -1 : 0"
                aria-label="todo's title"
                v-model="elem.name"
                @blur.native="updateElem('name')"
                @focus.native="copyContent(elem.name)"
                />
            </div>
            <div class="list-elem__description">
                <textarea-autosize
                placeholder="Add description"
                :tabindex="isShowMenu || isShowPopup ? -1 : 0"
                aria-label="todo's description"
                v-model="elem.description"
                @blur.native="updateElem('description')"
                @focus.native="copyContent(elem.description)"
                />
            </div>
            <div class="list-elem__date">
                <div
                    class="created"
                    :tabindex="isShowMenu || isShowPopup ? -1 : 0">
                    <span>Created:</span>
                    {{ created }}
                </div>
            </div>
            <div class="list-elem__buttons">
                <button
                    :tabindex="isShowMenu || isShowPopup ? -1 : 0"
                    aria-label="remove todo"
                    class="button button__remove"
                    @click="removeElem">Remove</button>
            </div>
        </div>
    </transition>

    <transition v-if="type === 'hero'" name="fade">
        <div
            v-if="show"
            class="list-elem"
            :class="{'list-elem--hero': type === 'hero'}"
            @click="navigateTo"
            @keypress.enter="navigateTo"
            :tabindex="isShowMenu || isShowPopup ? -1 : 0"
            :aria-label="`super hero: ${elem.name} button`">
            <div class="list-elem__hero-name">
                {{ elem.name }}
            </div>
            <div class="list-elem__hero-image">
                <div class="image" v-bind:style="{ backgroundImage: `url(${loadedImage ? elem.image : defaultHeroImage})` }"></div>
                <img :src="elem.image" @error="isErrorImage">
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import Vue from 'vue';
import TextareaAutosize from 'vue-textarea-autosize';
Vue.use(TextareaAutosize);
import moment from 'moment';
import defaultHeroImage from "../assets/user.png";
import { mapGettersForiSShowMenuAndIsShowPopup } from '../mixins/initial-computed';

export default {
  name: 'ListElem',
  mixins: [mapGettersForiSShowMenuAndIsShowPopup],
  props: {
      elem: {
          type: Object,
          default: () => { }
      },
      type: {
          type: String,
          default: () => ''
      }
  },
  data: () => {
      return {
          show: false,
          created: '',
          destroy: false,
          defaultHeroImage: defaultHeroImage,
          loadedImage: true,
          copiedContent: ''
      }
  },
  methods: {
      updateElem(key) {
          if (this.copiedContent === this.elem[key]) return;
          this.$emit('updateElem', { elem: this.elem, key: key });
      },
      removeElem() {
          this.$emit('removeElem', this.elem.id);
      },
      navigateTo() {
          this.$emit('navigateTo', this.elem.id);
      },
      isErrorImage() {
          this.loadedImage = false;
      },
      copyContent(content) {
          this.copiedContent = content;
      }
  },
  created() {
      setTimeout(() => this.show = true, 1);
      this.created = moment(this.elem.created).format('DD.MM.YYYY');
  },
  beforeDestroy() {
      this.destroy = true;
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.list-elem {
    padding: 10px;
    border: 1px solid $royal-purpure-color;
    margin: 10px 20px;
    border-radius: 3px;
    animation: fadeIn ease .5s;
    width: 300px;

    // style for todo
    &__name, &__description {
        textarea {
            width: 100%;
            border: none;
            text-align: center;
            padding: 5px;
        }
    }
    &__name {
        textarea {
            font-size: 20px;
        }
    }
    &__date {
        font-size: 10px;
        display: flex;
        justify-content: flex-end;
        margin: 10px 0;
        span {
            font-weight: bold;
        }
    }
    &__buttons {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .button {
            color: $white-color;
            &__remove {
                background-color: $eminence-color;
            }
            @include hover-opacity;
        }
    }

    // style for hero
    &--hero {
        background-color: $royal-purpure-color;
        color: $white-color;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 50px -20px $eminence-color;
        }
    }
    &__hero-name {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    &__hero-image {
        position: relative;
        height: 290px;
        img {
            display: none;

        }
        .image {
            background-size: cover;
            overflow: hidden;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
        .image:after {
            content: "";
            position: absolute;
            top: -50%;
            left: -60%;
            width: 20%;
            height: 200%;
            opacity: 0;
            transform: rotate(30deg);
            background: rgba(255, 255, 255, 0.13);
            background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0.13) 0%,
                rgba(255, 255, 255, 0.13) 77%,
                rgba(255, 255, 255, 0.5) 92%,
                rgba(255, 255, 255, 0.0) 100%
            );
            }
        /* Hover state - trigger effect */
        .image:hover:after {
            opacity: 1;
            left: 130%;
            transition-property: left, top, opacity;
            transition-duration: 0.7s, 0.7s, 0.15s;
            transition-timing-function: ease;
        }
        /* Active state */
        .image:active:after {
            opacity: 0;
        }
    }
}
</style>