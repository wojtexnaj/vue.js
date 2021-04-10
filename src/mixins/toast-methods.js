export const toastMethodsMixin = {
    methods: {
        hideToast() {
            this.isToast = false;
            this.dataForToast.message = '';
        },
        showToast(message) {
            this.isToast = false;
            setTimeout(() => {
                this.dataForToast.message = message;
                this.isToast = true;
            })
          },
    },
}