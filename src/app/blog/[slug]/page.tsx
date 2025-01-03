import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { notFound } from "next/navigation";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source);
}

interface BlogPost {
    name: string;
    description: string;
    poster: any;
    slug: {
        current: string;
    };
}

async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
    return await client.fetch(
        `
        *[_type == "blog" && slug.current == $slug][0] {
            name,
            description,
            poster,
            slug
        }
        `,
        { slug }
    );
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
    const post = await fetchBlogPost(params.slug);

    if (!post) {
        notFound(); 
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">{post.name}</h1>
            {post.poster && (
                <img
                    src={urlFor(post.poster).width(800).url()}
                    alt={post.name}
                    className="my-4 w-full"
                />
            )}
            <p className="text-gray-700">{post.description}</p>
        </div>
    );
}
