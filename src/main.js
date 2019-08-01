// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DefaultLayout from '~/layouts/Default.vue'

import VueMarkdown from 'vue-markdown'

export default function (Vue, { router, head, isClient }) {

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
  })
  
  Vue.use(Vuetify)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('vue-markdown', VueMarkdown)
}
