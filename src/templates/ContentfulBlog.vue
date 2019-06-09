<template>
  <Layout>
    <h1>投稿詳細</h1>
    <div>
      <g-image :src="coverUrl($page.contentfulBlog.cover)" />
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
      date(format: "YYYY.MM.DD", locale: "ja")
    }
  }
</page-query>
