// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const nodeExternals = require('webpack-node-externals')

const ARTICLES_PER_PAGE = 9;

module.exports = function (api) {

  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          whitelist: [/^vuetify/]
        })
      ])
    }
  })

  api.loadSource(store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    store.addMetadata('siteStatus', process.env.SITE_STATUS);
    store.addMetadata('cdnUrl', process.env.CDN_URL);
  });

  // タグ用画面の生成
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allContentfulBlog {
        edges {
          node {
            tags
          }
        }
      }
    }`);

    let allTags = new Set();
    data.allContentfulBlog.edges.forEach(({node}) => {
      node.tags.forEach((tag) => {
        allTags.add(tag);
      })
    });

    allTags.forEach(async(tag) => {

      const tagMetadata = await graphql(`
        query retrieveTag($tagStr: String!){
          allContentfulBlog(filter: {
            tags: {
              contains: [$tagStr]
            }
          }) {
            totalCount
          }
        }`, {tagStr: tag});
      
      const totalCountTaggedArticle = tagMetadata.data.allContentfulBlog.totalCount;

      for (var i = 0; i < (totalCountTaggedArticle / ARTICLES_PER_PAGE) ; i++) {
        var idx = i + 1;
        createPage({
          path: `/list-tag/${tag}/${idx}`,
          component: './src/templates/ListTags.vue',
          context: {
            tag: tag,
            count: idx,
          }
        })  
      }
    })
  })
}
