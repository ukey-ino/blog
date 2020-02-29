<template>
  <div class="bg">
    <v-app id="inspire">
      <Header
        :title="$static.metaData.siteName"
        :recent-posts="$static.allContentfulBlog.edges">
      </Header>
      <v-container fluid>
        <slot />
      </v-container>
    </v-app>
  </div>
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
import Header from '../components/Header.vue'

export default {
  components: {
    Header
  },

  data() {
    return {
    }
  },
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
  background-color: #E2E0EB;
}

#inspire {
  background: none;
}

.v-app-bar__style {
  max-height: 56px;
}

.text-color {
  color: #968BB6;
}

</style>
