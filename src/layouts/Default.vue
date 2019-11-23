<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon 
        @click.stop="visibleNav = !visibleNav">
      </v-toolbar-side-icon>
      <v-toolbar-title>{{ $static.metaData.siteName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/" ><v-icon>home</v-icon><div class="hidden-sm-and-down">&nbsp; Home</div></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-model="visibleNav"
      absolute 
      temporary >
      <v-toolbar flat>
        <v-toolbar-title>最近の投稿</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <div
          v-for="edge in $static.allContentfulBlog.edges"
          :key="edge.id"
        >
          <v-list-tile :to="edge.node.path">
            <v-list-tile-title>{{ edge.node.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ edge.node.createdate }}</v-list-tile-sub-title>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-container fluid>
      <slot/>
    </v-container>
  </v-app>
</template>

<static-query>
query {
  metaData {
    siteName
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
}
</script>

<style lang="scss">
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
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
</style>
