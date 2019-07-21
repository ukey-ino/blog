// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import VueMarkdown from 'vue-markdown'

import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'

export default function (Vue, { router, head, isClient }) {
  Vue.use(Vuetify)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('vue-markdown', VueMarkdown)
}
