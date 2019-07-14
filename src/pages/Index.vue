<template>
  <Layout>
    <h1>コンテンツ一覧</h1>
    <v-card v-for="edge in $page.allContentfulBlog.edges" :key="edge.id">
        <v-img aspect-ratio="10"  lazy-src :src="coverUrl(edge.node.cover)"></v-img>
        
        <v-card-title>
          <div>
            <h3 class="headline mb-0">{{ edge.node.title }}</h3>
            <div>{{ summaryText(edge.node.content) }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange" :to="edge.node.path">詳細</v-btn>
        </v-card-actions>
    </v-card>
  </Layout>
</template>

<script>
  export default {
    methods: {
      coverUrl: function (coverContent) {
        if (coverContent) {
          // TODO: resized by fixed width now.
          return "https:" + coverContent.file.url + "?w=200";
        }
        // TODO: reference local file
        return "https://placehold.it/150x150.png?text=NoImage";
      },
      
      summaryText: function(text) {
        if (text.length >= 30 ) {
          return text.substring(0,30) + "...";
        }
        return text;
      }
    }
  }
</script>


<page-query>
query Blog ( $page: Int) {
  allContentfulBlog( perPage: 6, order: DESC, page: $page ) @paginate {
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
        date( format: "YYYY.MM.DD", locale: "ja" )
      }
    }
  }
}
</page-query>
