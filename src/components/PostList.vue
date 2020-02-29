<template>
  <div id="postList">
    <div id="pager">
      <v-pagination
        v-model="pagerObject.currentPage"
        :length="pagerObject.totalPages"
        prev-icon="navigate_before"
        next-icon="navigate_next"
        @input="getNumberOfPagination"
      ></v-pagination>
    </div>
    <div id="posts">
      <v-container>
        <v-row no-gutters>
          <v-col 
            v-for="(obj, idx) in dataObjects"
            :key="idx"
            :cols="12 / getNumberOfCardsPerRow">
            <Post
              :card-obj="summarize(obj)"
              :card-height="getCardHeight"
            ></Post>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div id="pager">
      <v-pagination
        v-model="pagerObject.currentPage"
        :length="pagerObject.totalPages"
        prev-icon="navigate_before"
        next-icon="navigate_next"
        @input="getNumberOfPagination"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { Pager } from "gridsome"
import Post from './Post.vue'

export default {
  components: {
    Post,
    Pager
  },

  props: {
    dataObjects: {
      type: Array,
      required: true
    },
    postHeight: {
      type: String,
      default: '300px'
    },
    pagerObject: {
      type: Object
    },
  },

  data() {
    return {
    }
  },

  methods : {
    shortenText: function(maxLength, text) {
      if (text.length >= maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    summaryMobileBody: function(text) {
      return this.shortenText(30, text);
    },

    summaryLargeBody: function(text) {
      return this.shortenText(50, text);
    },


    summaryTitle: function(text) {
      return this.shortenText(23, text);
    },

    summarize: function(cardObj) {
      return {
        title: this.summaryTitle(cardObj.title),
        imageUrl: cardObj.imageUrl,
        createdAt: cardObj.createdAt,
        abstract: (this.$vuetify.breakpoint.smAndDown) ? 
          this.summaryMobileBody(cardObj.abstract) : 
          this.summaryLargeBody(cardObj.abstract),
        linkTo: cardObj.linkTo,
      }
    },

    getNumberOfPagination: function(num) {
      this.$emit('on-paging', num);
    },
  },

  computed: {
    getNumberOfCardsPerRow: function() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 1
      } else {
        return 3
      }
    },
    getCardHeight: function() {
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
    }
  },
}
</script>

<style lang="scss">
/* v-pagenation のアクティブボタン背景色の回避 */
.theme--light.v-pagination{
  .v-pagination__item--active  {
    background: #1358d6;
  }
}
</style>
