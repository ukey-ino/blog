// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DefaultLayout from '~/layouts/Default.vue'

import VueMarkdown from 'vue-markdown'

export default function (Vue, { appOptions, router, head, isClient }) {

  head.htmlAttrs = {
    prefix: 'og: http://ogp.me/ns#'
  }
  
  // For Vuetify
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
  })
  const opts = {
    theme: {
      dark: true
    }
  }
  Vue.use(Vuetify)
  appOptions.vuetify = new Vuetify(opts);

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('vue-markdown', VueMarkdown)

}
