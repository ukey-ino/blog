<template>
  <Layout>
    <h1>投稿詳細</h1>
    <div>
      <p>title: {{ $page.contentfulBlog.title }} </p>
      <p>slug: {{ $page.contentfulBlog.slug }}</p>
      <g-link :to="$page.contentfulBlog.path">
        {{ $page.contentfulBlog.path }}
      </g-link>
      <p>content: </p>
      <p><vue-markdown> {{ $page.contentfulBlog.content }} </vue-markdown> </p>
    </div>
  </Layout>
</template>

<page-query>
  query Blog( $path: String! ) {
    contentfulBlog( path: $path ) {
      id
      path
      title
      slug
      content
      date(format: "YYYY.MM.DD", locale: "ja")
    }
  }
</page-query>
