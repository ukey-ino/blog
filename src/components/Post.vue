<template>
  <div id="post">
    <v-card class="card" :height="cardHeight">
      <v-layout column fill-height>
        <v-img aspect-ratio="7" max-height="50px" lazy-src :src="cardObj.imageUrl"></v-img>
        <v-card-title>
            <div>
              <h3 id="title" class="headline mb-0 card-text">{{ cardObj.title }}</h3>
              <span id="detailLink" class='card-gray--text'>created at {{ cardObj.createdAt }}</span>
              <div id="body" class="card-text">{{ cardObj.abstract }}</div>
            </div>
        </v-card-title>
        <v-spacer />
        <v-card-actions>
          <v-btn id="detailLink" class="card card-text" outlined :to="cardObj.linkTo">詳細</v-btn>
        </v-card-actions>
        <v-spacer />
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {

  props: {
    cardObj: {
      type: Object,
      required: true
    },
    cardHeight: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      title: "Title",
      imageUrl: null,
      createdAt: "2020-01-01",
      abstract: "Abstarct",
      linkTo: ""
    };
  }
};
</script>

<style lang="scss" scoped>

.card {
  background-color: #E2E0EB;
  box-shadow: 20px 20px 60px #c0bec8,
              -20px -20px 60px #ffffff;
}

.card-text {
  color: #968BB6;
}

.card-gray--text {
  color: #B8B1CE;
}


</style>
