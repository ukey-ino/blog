<template>
  <Layout>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-btn v-on:click="goToIndex">
              <v-icon>arrow_back</v-icon>
              <div class="hidden-sm-and-down">一覧に戻る</div>
            </v-btn>
  
            <v-card>
              <v-card-text>
                <h1>{{ $page.contentfulBlog.title }}</h1>
                <span class="grey--text">created at {{ $page.contentfulBlog.createdate }}</span>
                <div>
                  <g-image :src="coverUrl($page.contentfulBlog.cover)" />
                  <p>
                    <vue-markdown>{{ $page.contentfulBlog.content }}</vue-markdown>
                  </p>
                </div>
              </v-card-text>
            </v-card>

            <v-btn v-on:click="goToIndex">
              <v-icon>arrow_back</v-icon>
              <div class="hidden-sm-and-down">一覧に戻る</div>
            </v-btn>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.contentfulBlog.title,
      meta: [
        { name: 'og:type', content: 'article'},
        { name: 'og:title', content: this.$static.metaData.siteName },
        { name: 'og:description', content: this.$static.metaData.siteDescription },
        { name: 'og:url', 
          content: this.$static.metaData.siteUrl + "/blog/" + this.$page.contentfulBlog.slug },
        { name: 'og:site_url', content: this.$static.metaData.siteUrl },
        { name: 'og:image', content: this.$static.metaData.siteUrl + "images/site_image.jpg"},
        { name: 'twitter:card', content: 'summary'}
      ]
    }
  },
  methods: {
    coverUrl: function(coverContent) {
      if (coverContent) {
        // TODO: resized by fixed width now.
        return "https:" + coverContent.file.url + "?w=200";
      }
      // TODO: reference local file
      return "https://placehold.it/150x150.png";
    },

    goToIndex: function() {
      let goTo = this.referer;
      this.$router.push({ path: goTo });
    }
  },
  data: () => ({
    referer: null
  }),
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.referer = from.path;
    });
  }
};
</script>

<page-query>
  query Blog( $path: String! ) {
    contentfulBlog( path: $path ) {
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
      createdate(format: "YYYY.MM.DD", locale: "ja")
      date(format: "YYYY.MM.DD", locale: "ja")
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
