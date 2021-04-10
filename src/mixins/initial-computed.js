import { mapGetters } from 'vuex';

export const mapGettersForiSShowMenuAndIsShowPopup = {
    computed: {
        ...mapGetters({
          isShowMenu: 'getIsShowMenu'
        }),
        ...mapGetters({
          isShowPopup: 'getIsShowPopup'
        }),
    }
}