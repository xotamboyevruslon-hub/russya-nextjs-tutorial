import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { Content } from "src/components";
import { BlogsType } from "src/interfaces/blogs.interface";
import Layout from "src/layout/layout"
import SEO from "src/layout/seo/seo";
import { BlogsService } from "src/services/blog.service";

const BlogPage = ({ blogs }: BlogPageProps) => {
    return (
        <SEO metaTitle='All blogs'>
            <Layout>
                <Box sx={{ display: "flex", gap: '20px', flexDirection: { xs: 'column', md: 'row' }, padding: '20px', justifyContent: 'center' }}>
                    <Content blogs={blogs} />
                </Box>
            </Layout>
        </SEO>
    )
}

export default BlogPage;

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async () => {
    try {
        const blogs = await BlogsService.getAllBlogs();

        return {
            props: { blogs },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: { blogs: [] },
        };
    }
};



interface BlogPageProps {
    blogs: BlogsType[];
}