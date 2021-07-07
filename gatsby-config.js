module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'Gatsby Blog Aggregator',
  },
  plugins: [
    'gatsby-plugin-image',
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: '',
    //   },
    // },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-custom-api',
      options: {
        url: 'http://localhost:8080/posts'
      },
      rootKey: 'getPosts',
      schemas: {
        getPosts: `
          limit: Int
          total: Int
          page: Int
          items: [posts]
        `,
        posts: `
          CreatedAt: Date
          UpdatedAt: Date
          DeletedAt: Date
          ID: ID
          title: String
          description: String
          content: String
          link: String
          blogId: String
          categories: [category]
          published: String
          PublishDate: Date
          views: Int
        `,
        category: `
          ID: Int
          CreatedAt: Date
          UpdatedAt: Date
          DeletedAt: Date
          Title: String
          Description: String
        `
      }
    },
  ],
};
