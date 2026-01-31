import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Content, Sidebar } from "src/components";
import { BlogsType } from "src/interfaces/blogs.interface";
import { CategoryType } from "src/interfaces/categories.interface";
import Layout from "src/layout/layout"
import SEO from "src/layout/seo/seo";
import { BlogsService } from "src/services/blog.service";

const CategoryDetailedPage = ({ blogs, latestBlogs, categories }: DetailedCategoriesPageProps) => {
    const router = useRouter();

    return (
        <SEO metaTitle={`${router.query.slug}-category`}>
            <Layout>
                <Box sx={{ display: "flex", gap: '20px', flexDirection: { xs: 'column', md: 'row' }, padding: '20px' }}>
                    <Sidebar latestBlogs={latestBlogs} categories={categories} />
                    <Content blogs={blogs} />
                </Box>
            </Layout>
        </SEO>
    )
}

export default CategoryDetailedPage

export const getServerSideProps: GetServerSideProps<DetailedCategoriesPageProps> = async ({ query }) => {
    try {
        const slug = query.slug;
        
        if (typeof slug !== "string") {
            return { notFound: true };
        }

        const [latestBlogs, categories, blogs] = await Promise.all([
            BlogsService.getLatestBlog(),
            BlogsService.getCategories(),
            BlogsService.getDetailedCategoriesBlog(slug),
        ]);

        if (!blogs || blogs.length === 0) {
            return { notFound: true };
        }

        return {
            props: {
                blogs,
                latestBlogs,
                categories,
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return { notFound: true };
    }
};

interface DetailedCategoriesPageProps {
    blogs: BlogsType[];
    latestBlogs: BlogsType[];
    categories: CategoryType[];
}

