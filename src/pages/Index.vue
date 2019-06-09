<template>
  <Layout>
    <h1>コンテンツ一覧</h1>
    <ul v-for="edge in $page.allContentfulBlog.edges" :key="edge.id">
      <li>
        <g-image :src=coverUrl(edge.node.cover) />
        <p>title: {{ edge.node.title }}</p>
        <p>slug: {{ edge.node.slug }}</p>
        <p>path:
          <g-link :to="edge.node.path">
            {{ edge.node.path }}
          </g-link>
        </p>
        <p>content: {{ edge.node.content }}</p>
      </li>
    </ul>
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
        return "https://placehold.it/150x150.png";
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
