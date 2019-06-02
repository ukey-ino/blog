<template>
  <Layout>
    <h1>コンテンツ一覧</h1>
    <ul v-for="edge in $page.allContentfulBlog.edges" :key="edge.id">
      <li>
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
        date( format: "YYYY.MM.DD", locale: "ja" )
      }
    }
  }
}
</page-query>
