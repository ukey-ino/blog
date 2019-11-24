<template>
  <div class="bg">
    <v-app id="inspire">
      <v-app-bar class="v-app-bar__style">
        <v-app-bar-nav-icon @click.stop="visibleNav = !visibleNav">
          <v-icon>menu</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>{{ $static.metaData.siteName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/">
          <v-icon>home</v-icon>
          <div class="hidden-sm-and-down">&nbsp; Home</div>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="visibleNav" absolute temporary>
        <v-list>
          <v-subheader>最近の投稿</v-subheader>
          <v-list-item-group>
            <v-list-item
              v-for="edge in $static.allContentfulBlog.edges"
              :key="edge.id"
              link
              :to="edge.node.path"
            >
              <v-list-item-content>
                <v-list-item-title>{{ edge.node.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ edge.node.createdate }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-container fluid>
        <slot />
      </v-container>
    </v-app>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName,
    siteUrl
  },
  allContentfulBlog( sortBy: "createdate", order: DESC, limit: 5 ) {
    edges {
      node {
        id
        path
        title
        createdate( format: "YYYY.MM.DD" )
      }
    }
  }
}
</static-query>

<script>
export default {
  data: () => ({
    visibleNav: false
  })
};
</script>

<style lang="scss">
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.layout {
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 5px;
  padding-right: 5px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}

.bg {
  background-image: url("~@/assets/images/site_background.gif");
  background-size: contain;
  background-repeat: repeat;
}

#inspire {
  background: none;
}

.v-app-bar__style {
  max-height: 56px;
}
</style>
