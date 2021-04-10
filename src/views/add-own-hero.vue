<template>
    <div class="add-own-super-hero-container" id="add-own-super-hero-container">
        <Breadcrumbs />

        <h3
          :tabindex="isShowMenu || isShowPopup ? -1 : 0"
          class="main-header">ADD OWN SUPER HERO</h3>

          <FormulateForm name="superHero" #default="{ hasErrors }">
            <div class="box" v-for="(value, category) in superHeroForm" :key="category">
                <div v-if="typeof superHeroForm[category] === 'string'">
                    <FormulateInput
                        :tabindex="isShowMenu || isShowPopup ? -1 : 0"
                        :key="category"
                        :name="category"
                        :label="capitalizeFirstLetter(category)"
                        type="text"
                        :class="category === 'name' ? 'box__name': ''"
                        v-model="superHeroForm[category]"
                        :validation="category === 'name' ? 'required' : ''"
                    />
                    <div class="button-add-super-hero-box" id="button-add">
                        <button
                            :tabindex="isShowMenu || isShowPopup ? -1 : 0"
                            :disabled="hasErrors"
                            @click="addOwnHero"
                        >Add super hero</button>
                    </div>
                </div>

                <div v-if="typeof superHeroForm[category] === 'object'">
                    <h3 :tabindex="isShowMenu || isShowPopup ? -1 : 0">{{ capitalizeFirstLetter(category) }}</h3>
                    <div v-for="(objectValue, attribute) in superHeroForm[category]" :key="attribute" class="box__content">
                        <FormulateInput
                            :tabindex="isShowMenu || isShowPopup ? -1 : 0"
                            v-if="attribute !== 'height-unit' && attribute !== 'weight-unit'"
                            :name="attribute"
                            type="text"
                            :help="attribute === 'aliases' ? 'you can enter a few after the commas' : ''"
                            :label="capitalizeFirstLetter(attribute)"
                            v-model="superHeroForm[category][attribute]"
                            :inputmode="setInputmode(attribute)"
                            :pattern="setPattern(attribute)"
                            :validation="setValidation(attribute)"
                        />
                        <FormulateInput v-if="attribute === 'height' || attribute === 'weight'"
                            :tabindex="isShowMenu || isShowPopup ? -1 : 0"
                            v-model="superHeroForm[category][attribute === 'height' ? 'height-unit' : 'weight-unit']"
                            class="box__content--select"
                            aria-label="select unit"
                            :options="attribute === 'height' ? ['cm', 'ft'] : ['kg', 'lb']"
                            type="select"
                            />
                    </div>

                </div>
            </div>
          </FormulateForm>
          <Toast
            v-if="isToast"
            :data="dataForToast"
            @destroyToast="hideToast"/>
    </div>
</template>

<script>
import Breadcrumbs from '../components/breadcrumbs';
import { helpersMethodsMixin, mapGettersForiSShowMenuAndIsShowPopup, toastMethodsMixin } from '../mixins';
import { superheroesService } from '../services';
import Toast from '../components/toast';

const defaultSuperHeroForm = {
    name: '',
    powerstats: {
        intelligence: 0,
        strength: 0,
        speed: 0,
        durability: 0,
        power: 0,
        combat: 0
    },
    biography: {
        'full-name': '',
        'alter-egos': '',
        'aliases': '',
        'place-of-birth': '',
        'first-appearance': '',
        'publisher': '',
        'alignment': ''
    },
    appearance: {
        'eye-color': '',
        'gender': '',
        'hair-color': '',
        'height': 0,
        'height-unit': 'cm',
        'race': '',
        'weight': 0,
        'weight-unit': 'kg',
    },
    work: {
        base: '',
        occupation: ''
    },
    connections: {
        'group-affiliation': '',
        relatives: ''
    }
}

export default {
    name: 'AddOnwHero',
    components: {
        Breadcrumbs,
        Toast
    },
    mixins: [helpersMethodsMixin, mapGettersForiSShowMenuAndIsShowPopup, toastMethodsMixin],
    data () {
    return {
      isToast: false,
      dataForToast: {
        message: '',
        duration: 2000 // milliseconds
      },
      superHeroForm: {}
    }
  },
  methods: {

    setInputmode(attribute) {
        const attributesForNumeric = ['height', 'weight', ...Object.keys(this.superHeroForm.powerstats)];
        return attributesForNumeric.includes(attribute) ?  'numeric' : 'text';
    },
    setPattern(attribute) {
        const attributesForPattern = ['height', 'weight', ...Object.keys(this.superHeroForm.powerstats)];
        return attributesForPattern.includes(attribute) ?  '[0-100]*' : '';
    },
    setValidation(attribute) {
        if ([...Object.keys(this.superHeroForm.powerstats)].includes(attribute)) {
            return 'number|between:-1,101';
        }else if (attribute === 'height' && this.superHeroForm.appearance['height-unit'] === 'cm' || attribute === 'weight') {
            return 'number'
        }
        return '';
    },
    addOwnHero() {
        superheroesService.addOwnHero(this.superHeroForm).then(() => {
            this.showToast('Hero has been added!');
            this.$formulate.reset('superHero');
            this.setDefaultSuperHeroForm();
        }).catch(error => {
        this.showToast(`Something went wrong! ${error}`);
      });
    },
    setDefaultSuperHeroForm() {
        this.superHeroForm = JSON.parse(JSON.stringify(defaultSuperHeroForm));
    }
  },
  beforeMount() {
      this.setDefaultSuperHeroForm()
  },
  mounted() {
      const buttonAdd = document.getElementById('button-add');
      const sticky = buttonAdd.offsetTop;
      window.onscroll = () => {
        if (window.pageYOffset > sticky) {
            buttonAdd.classList.add("button-add-super-hero-box--sticky");
        } else {
            buttonAdd.classList.remove("button-add-super-hero-box--sticky");
        }
      }
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.add-own-super-hero-container {
    @include container;
    .formulate-form {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;

        @include respond-to (sm) {
            justify-content: space-between;
        }
        .box {
            margin: 5px;
            min-width: 270px;
            &__name {
                padding-top: 44px;
                text-align: left;
            }
            &__content {
                display: flex;
                align-items: center;
                &--select {
                    margin-bottom: -4px;
                }
                .formulate-input {
                    width: 100%;
                    text-align: left;
                }
            }
            h3 {
                margin: 10px 0;
                font-size: 24px;
                font-weight: bold;
                color: $royal-purpure-color;
                text-align: left;
            }
            .button-add-super-hero-box {
                &--sticky {
                    position: fixed;
                    top: 10px;
                }
                button {
                    background-color: $eton-blue;
                    color: $white-color;
                    width: 190px;
                    &:disabled {
                        filter: blur(1px);
                    }
                }
            }
        }
    }
}
</style>