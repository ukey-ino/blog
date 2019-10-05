<template>
  <Layout>
    <div>{{initialize()}}</div>
    <v-layout wrap>
      <v-flex xs12>
        <h1>コンテンツ一覧</h1>
        <v-pagination v-model="currentPage" :length="totalPages" />
      </v-flex>
      <div>{{ cardHeight }}</div>
      <v-container grid-list-md>
        <v-layout ma-1 row wrap>
          <v-flex xs12 md4 v-for="edge in $page.allContentfulBlog.edges" :key="edge.id">
            <v-card height="350px">
              <v-layout column fill-height>
                <v-img aspect-ratio="7" max-height="50px" lazy-src :src="coverUrl(edge.node.cover)"></v-img>

                <v-card-title>
                  <div>
                    <h3 class="headline mb-0">{{ edge.node.title }}</h3>
                    <span class="grey--text">created at {{ edge.node.createdate }}</span>
                    <div>{{ summaryText(edge.node.content) }}</div>
                  </div>
                </v-card-title>

                <v-spacer />
                <v-card-actions>
                  <v-btn flat color="orange" :to="edge.node.path">詳細</v-btn>
                </v-card-actions>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-pagination v-model="currentPage" :length="totalPages" />
    </v-layout>
  </Layout>
</template>

<script>
import { Pager } from "gridsome";

export default {
  metaInfo() {
    return {
      titleTemplate: null,
      meta: [
        { name: "og:type", content: "website" },
        { name: "og:title", content: this.$static.metaData.siteName },
        {
          name: "og:description",
          content: this.$static.metaData.siteDescription
        },
        {
          name: "og:url",
          content:
            this.$static.metaData.siteUrl +
            "/" +
            (this.$page.allContentfulBlog.pageInfo.currentPage == 1
              ? ""
              : this.$page.allContentfulBlog.pageInfo.currentPage)
        },
        { name: "og:site_url", content: this.$static.metaData.siteUrl },
        {
          name: "og:image",
          content: this.$static.metaData.siteUrl + "images/site_image.jpg"
        }
      ]
    };
  },
  components: {
    Pager
  },
  methods: {
    coverUrl: function(coverContent) {
      if (coverContent) {
        // TODO: resized by fixed width now.
        return "https:" + coverContent.file.url + "?w=200";
      }
      // TODO: reference local file
      return "https://placehold.it/150x150.png?text=NoImage";
    },

    summaryText: function(text) {
      if (text.length >= 30) {
        return text.substring(0, 30) + "...";
      }
      return text;
    },

    getCurrentPage: function() {
      this.$data.currentPage = this.$page.allContentfulBlog.pageInfo.currentPage;
    },
    getTotalPages: function() {
      this.$data.totalPages = this.$page.allContentfulBlog.pageInfo.totalPages;
    },
    initialize: function() {
      this.getCurrentPage();
      this.getTotalPages();
    },

    currentPageUrl: function() {}
  },
  computed: {},
  data: () => ({
    currentPage: 1,
    totalPages: 1
  }),
  watch: {
    $route: "initialize",
    currentPage: function(newNumber) {
      let pathToGo = "/";
      if (newNumber != 1) {
        pathToGo = "/" + newNumber;
      }
      this.$router.push({ path: pathToGo });
    }
  }
};
</script>


<page-query>
query Blog ( $page: Int) {
  allContentfulBlog( perPage: 9, sortBy: "createdate", order: DESC, page: $page ) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    totalCount
    edges {
      node {
        id
        path
        title
        slug
        content
        cover {
          file {
            url
          }
        }
        createdate( format: "YYYY.MM.DD" )
        date( format: "YYYY.MM.DD", locale: "ja" )
      }
    }
  }
}
</page-query>

<static-query>
query {
  metaData {
    siteName
    siteDescription
    siteUrl
  }
}
</static-query>


<style>
.message {
  color: #42b983;
}
</style>
