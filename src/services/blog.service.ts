import { request, gql } from 'graphql-request';
import { BlogsType } from 'src/interfaces/blogs.interface';
import { CategoryType } from 'src/interfaces/categories.interface';

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

if (!graphqlAPI) {
  console.error('NEXT_PUBLIC_HYGRAPH_ENDPOINT environment variable is not set');
}

export const BlogsService = {
  async getAllBlogs() {
    const query = gql`
        query GetBlogs {
            blogs {
                excerpt
                id
                slug
                title
                createdAt
                image {
                 url
                }
                author {
                  name
                  avatar {
                    url
                    }
                }
                category {  
                   label
                   slug
                }
                description {
                  text
                  
                 }  
            }
        }
        `;

    try {
      if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not configured');
      }
      const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query);
      return result.blogs;
    } catch (error) {
      console.error('Error fetching all blogs:', error);
      return [];
    }
  },


  async getLatestBlog() {
    const query = gql`
        query GetLatestBlog {
            blogs (last:2) {
                id
                slug
                title
                createdAt
                image {
                 url    
                }
                description {
                  text
                }
                author {
                  name
                  avatar {
                    url
                  }
                }
            }
        }
        `;

    try {
      if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not configured');
      }
      const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query);
      return result.blogs;
    } catch (error) {
      console.error('Error fetching latest blogs:', error);
      return [];
    }
  },


  async getCategories() {
    const query = gql`
        query GetCategories {
          categories {
          slug,
          label 
          }   
        }
       `;
    try {
      if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not configured');
      }
      const result = await request<{ categories: CategoryType[] }>(graphqlAPI, query);
      return result.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },


  async getDetailedBlogs(slug: string): Promise<BlogsType | null> {
    const query = gql`
      query GetDetailedBlog ($slug: String!) {
        blogs(where: { slug: $slug }, first: 1) {
          excerpt
          id
          slug
          title
          createdAt
          image {
            url
          }
          author {
            name
            avatar {
              url
            }
          }
          category {
            label
            slug
          }
          description {
            html
            text
          }
        }
      }
      `;

    try {
      if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not configured');
      }
      const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query, { slug });
      return result.blogs?.[0] ?? null;
    } catch (error) {
      console.error('Error fetching detailed blog:', error);
      return null;
    }
  },

  getDetailedCategoriesBlog: async (slug: string) => {
    const query = `
    query getCategoriesBlog($slug: String!) {
      blogs(where: { category: { slug: $slug } }) {
        excerpt
        id
        slug
        title
        createdAt
        image {
          url
        }
        author {
          name
          avatar {
            url
          }
        }
        category {
          label
          slug
        }
        description {
          text
        }
      }
    }
  `;

    try {
      if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not configured');
      }
      const result = await request<{ blogs: BlogsType[] }>(
        graphqlAPI,
        query,
        { slug }
      );

      return result.blogs;
    } catch (error) {
      console.error('Error fetching category blogs:', error);
      return [];
    }
  },
};
  