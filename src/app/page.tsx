import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Comment from "./components/Comment";
import Footer from "./components/Footer";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source);
}

interface Iblog {
    name: string;
    description: string;
    poster: any; 
    slug: {
        current: string;
    };
}

export default async function Home() {
    
    let res: Iblog[] = await client.fetch(`
        *[_type == "blog" && defined(slug.current)] | order(_createdAt desc) [0..15] {
            name,
            description,
            poster,
            slug
        }
    `);
    console.log("Fetched Blogs:", res);

    return (
        <>
            <Header />
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {res.map((data, index) => (
                        <a
                            key={index}
                            href={`/blog/${data.slug.current}`} 
                            className="bg-white shadow-lg rounded-lg overflow-hidden"
                        >
                            {data.poster ? (
                                <img
                                    src={urlFor(data.poster).width(200).height(200).fit("crop").url()}
                                    alt={data.name || "Blog Poster"}
                                    className="w-full h-64 object-cover"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                                    <p>No Image Available</p>
                                </div>
                            )}

                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {data.name || "Untitled Blog"}
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    {data.description || "No description available."}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <Comment />
            <Footer />
        </>
    );
}

