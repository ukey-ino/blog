<template>
  <Layout>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-btn v-on:click="goToIndex" class="my-2">
              <v-icon color="#968BB6">arrow_back</v-icon>
              <div class="hidden-sm-and-down text-color">一覧に戻る</div>
            </v-btn>
            <br><br>
            <v-card class="card">
              <v-card-text>
                <h1 class="text-color">{{ $page.contentfulBlog.title }}</h1>
                <span class="grey--text">created at {{ $page.contentfulBlog.createdate }}</span>
                <div>
                  <g-image class="responsive" :src="coverUrl($page.contentfulBlog.coverid, $static.metadata.siteStatus, $static.metadata.cdnUrl)" />
                  <p>
                    <vue-markdown class="text-color" :source="$page.contentfulBlog.content"></vue-markdown>
                  </p>
                </div>
                <div>
                  <v-chip
                    v-for="(tag, idx) in $page.contentfulBlog.tags"
                    :key="idx"
                    :href="tagUrl(tag)"
                    :link="true"
                    text-color="#968BB6"
                    color="#d1cdde"
                  >
                  <v-icon left>label</v-icon>
                  {{tag}}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
            <br><br>
            <v-btn v-on:click="goToIndex" class="my-2">
              <v-icon color="#968BB6">arrow_back</v-icon>
              <div class="hidden-sm-and-down text-color">一覧に戻る</div>
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
        { name: 'og:title', content: this.$static.metadata.siteName },
        { name: 'og:description', content: this.$page.contentfulBlog.title },
        { name: 'og:url', 
          content: this.$static.metadata.siteUrl + "/blog/" + this.$page.contentfulBlog.slug },
        { name: 'og:site_url', content: this.$static.metadata.siteUrl },
        { name: 'og:image', content: this.$static.metadata.siteUrl + "/images/site_image.jpg"},
        { name: 'twitter:card', content: 'summary'}
      ]
    }
  },
  methods: {
    coverUrl: function(contentId, siteStatus, cdnUrl) {
      if (contentId) {
        // TODO: resized by fixed width now.
        return cdnUrl + "/" + siteStatus + "/" + contentId + ".png";
      }
      // TODO: reference local file
      return "/images/article/No-Image.png";
    },

    goToIndex: function() {
      let goTo = this.referer;
      this.$router.push({ path: goTo });
    },

    tagUrl: function(tag) {
      return "/list-tag/" + tag + "/1"
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
      coverid
      createdate(format: "YYYY.MM.DD", locale: "ja")
      date(format: "YYYY.MM.DD", locale: "ja")
      tags
    }
  }
</page-query>

<static-query>
query {
  metadata {
    siteName
    siteDescription
    siteUrl
    siteStatus
    cdnUrl
  }
}
</static-query>

<style scoped>

.card {
  background-color: #E2E0EB;
  box-shadow: 20px 20px 60px #c0bec8,
              -20px -20px 60px #ffffff;
}


.responsive {
  max-width: 60%;
  min-width: 200px;
}

</style>