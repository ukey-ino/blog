<template>
  <Layout>
    <h1 class="text-color">コンテンツ一覧</h1>
    <PostList :dataObjects="dataObjs" :pagerObject="pagerObject"
      v-on:on-paging="paging">
    </PostList>
  </Layout>
</template>

<script>
import Post from '../components/Post.vue'
import PostList from '../components/PostList.vue'
import Header from '../components/Header.vue'
import { Pager } from "gridsome";


export default {
  components: {
    Post,
    PostList,
    Header,
    Pager
  },

  data() {
    return {
      dataObjs: [],
      pagerObject: {
        currentPage: 1,
        totalPages: 1
      },
    }
  },
  methods: {
    shortenText: function(maxLength, text) {
      if (text.length >= maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },
    
    refreshContent: function() {
      this.$data.pagerObject.currentPage = this.$page.allContentfulBlog.pageInfo.currentPage;
      this.$data.pagerObject.totalPages = this.$page.allContentfulBlog.pageInfo.totalPages;
      this.dataObjs = [];
      for (let i = 0 ; i < this.$page.allContentfulBlog.edges.length ; i++ ) {
        this.$data.dataObjs.push({
          title: this.$page.allContentfulBlog.edges[i].node.title,
          imageUrl: (function(content) {
            if(content) {
              return "https:" + content.file.url + "?w=200";
            }
            return "https://placehold.it/150x150.png?text=NoImage";
          })(this.$page.allContentfulBlog.edges[i].node.cover),
          createdAt: this.$page.allContentfulBlog.edges[i].node.createdate,
          abstract: this.$page.allContentfulBlog.edges[i].node.content,
          linkTo: this.$page.allContentfulBlog.edges[i].node.path,
        })
      }
    },

    paging: function(num) {
      let pathToGo = '/';
      if (num != 1) {
        pathToGo = "/" + num;
      }
      this.$router.push({ path: pathToGo });
    }
  },
  created() {
    this.refreshContent();
  },
  mounted() {
  },
  watch: {
    "$route" (to, from) {
      this.refreshContent();
    }
  }
}
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

<style lang="scss" >
body {
  background-color: #E2E0EB;
}

</style>
