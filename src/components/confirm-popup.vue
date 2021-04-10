<template>
  <div class="confirm-popup-container">
      <div class="confirm-popup-overlay" @click="cancel">Cancel></div>
      <div class="confirm-popup">
          <div tabindex="0" aria-label="popup title: Confirm" class="confirm-popup__title">
              Confirm
          </div>
          <div tabindex="0" :aria-label="`question: ${data.question} ${data.whatToRemove || ''}?`" class="confirm-popup__content">
              {{ data.question }} <span class="confirm-popup__content--name">{{ data.whatToRemove }}</span> ?
          </div>
          <div class="confirm-popup__buttons">
              <button id="cancel-button" class="confirm-popup__buttons--cancel" @click="cancel">Cancel</button>
              <button class="confirm-popup__buttons--confirm" @click="confirm">Confirm</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ConfirmPopup',
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel');
        },
        confirm() {
            this.$emit('confirm');
        }
    },
    mounted() {
        const cancelButton = document.getElementById('cancel-button');
        if (cancelButton) cancelButton.focus();
    }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.confirm-popup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .confirm-popup-overlay {
        @include overlay;
    }
    .confirm-popup {
        position: fixed;
        top: 5vh;
        min-width: 100%;
        min-height: 300px;
        padding: 20px;
        z-index: $z-index-popup;
        background: $white-color;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        @include respond-to (xs) {
            min-width: 500px;
            top: 10vh;
        }
        &__title {
            font-size: 36px;
            color: $eton-blue;
            font-weight: bold;
        }
        &__content {
            font-size: 24px;
            text-align: center;
            word-break: break-word;
            &--name {
                font-weight: bold;
            }
        }
        &__buttons {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            @include respond-to (xs) {
                flex-direction: row;
            }
            &--cancel, &--confirm {
                color: $white-color;
                @include hover-opacity;
            }
            &--cancel {
                background-color: $eminence-color;
                margin-bottom: 10px;
                @include respond-to (xs) {
                    margin-right: 10px;
                    margin-bottom: 0;
                }
            }
            &--confirm {
                background-color: $eton-blue;
            }
        }
    }
}
</style>