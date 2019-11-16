<template>
  <Layout>
    <v-layout wrap>
      <v-flex xs12>
        <h1>コンテンツ一覧</h1>
        <v-pagination v-model="currentPage" :length="totalPages" />
      </v-flex>
      <v-container grid-list-md fluid>
        <transition-group
          appear
          tag="div"
          name="list"
          class="layout ma-1 row wrap"
          @before-enter="beforeEnter"
          @after-enter="afterEnter"
          @enter-cancelled="afterEnter"
        >
          <v-flex
            xs12
            md4
            v-for="(edge, index) in $page.allContentfulBlog.edges"
            :key="edge.node.id"
            :data-index="index"
          >
            <v-card :height="cardHeight" transition="slide-x-transition">
              <v-layout column fill-height>
                <v-img aspect-ratio="7" max-height="50px" lazy-src :src="coverUrl(edge.node.cover)"></v-img>
                <v-card-title>
                  <div>
                    <h3 class="headline mb-0">{{ summaryTitle(edge.node.title) }}</h3>
                    <span class="grey--text">created at {{ edge.node.createdate }}</span>
                    <div v-show="isMobileView">{{ summaryMobileView(edge.node.content) }}</div>
                    <div v-show="isLargeView">{{ summaryLargeView(edge.node.content) }}</div>
                  </div>
                </v-card-title>
                <v-spacer />
                <v-card-actions>
                  <v-btn flat color="orange" :to="edge.node.path">詳細</v-btn>
                </v-card-actions>
              </v-layout>
            </v-card>
          </v-flex>
        </transition-group>
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
  data: () => ({
    currentPage: 1,
    totalPages: 1,
    show: true
  }),
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

    shortenText: function(maxLength, text) {
      if (text.length >= maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    summaryMobileView: function(text) {
      return this.shortenText(30, text);
    },

    summaryLargeView: function(text) {
      return this.shortenText(60, text);
    },

    summaryTitle: function(text) {
      return this.shortenText(23, text);
    },

    beforeEnter: function(el) {
      el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + "ms";
    },
    afterEnter: function(el) {
      el.style.transitionDelay = "";
    }
  },
  created() {
    this.$data.currentPage = this.$page.allContentfulBlog.pageInfo.currentPage;
    this.$data.totalPages = this.$page.allContentfulBlog.pageInfo.totalPages;
  },
  computed: {
    cardHeight: function() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "300px";
        case "sm":
          return "300px";
        case "md":
          return "350px";
        case "lg":
          return "350px";
        case "xl":
          return "350px";
      }
    },
    isMobileView: function() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    isLargeView: function() {
      return this.$vuetify.breakpoint.mdAndUp;
    }
  },
  watch: {
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

.container {
  padding: 0;
}

.list-enter-active {
  transition: all 1s ease;
}
.list-enter,
.list-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
