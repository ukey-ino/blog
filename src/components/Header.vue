<template>
  <div id="header">
    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="visibleNav = !visibleNav">
        <v-icon color="#968BB6">menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-color">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">
        <v-icon color="#968BB6">home</v-icon>
        <div class="hidden-sm-and-down text-color">&nbsp; Home</div>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="visibleNav" absolute temporary>
      <v-list>
        <v-subheader class="text-color">最近の投稿</v-subheader>
        <v-list-item-group>
          <v-list-item
            v-for="(post, idx) in recentPosts"
            :key="idx"
            link
            :to="post.node.path"
          >
            <v-list-item-content>
              <v-list-item-title class="text-color">{{ post.node.title }}</v-list-item-title>
              <v-list-item-subtitle class="text-color">{{ post.node.createdate }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {

  props: {
    title: {
      type: String, 
      required: true
    },
    recentPosts: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      visibleNav: false
    }
  }
}
</script>

<style scoped>

</style>
