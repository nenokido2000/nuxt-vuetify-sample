import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import ja from './i18n/vuetify/ja'

Vue.use(Vuetify, {
  theme: {
    primary: '#03a9f4', // a color that is not in the material colors palette
    accent: colors.blue.darken3,
    secondary: colors.amber.darken3,
    info: colors.blue.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.blue.accent3
  },
  lang: {
    locales: { ja },
    current: 'ja'
  }
})
