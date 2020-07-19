// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: process.env.SITE_TITLE,
  siteDescription: process.env.SITE_DESCRIPTION,
  siteUrl: process.env.SITE_URL,
  plugins: [
	  {
      use: '@gridsome/source-contentful',
      options: {
        space: process.env.CONTENTFUL_SPACE, 
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, 
        host: 'cdn.contentful.com',
        environment: process.env.CONTENTFUL_ENVIRONMENT,
        typeName: 'Contentful'
      }
	  }
  ],
  templates: {
    ContentfulBlog: [
      {
        path: "/blog/:slug",
        component: "./src/templates/ContentfulBlog.vue",
      }
    ]
  }
}
