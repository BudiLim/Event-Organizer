import { splitStr } from "../app/helper/splitStr";
import Link from "next/link";
import Image from "next/image";

interface ICardBlog {
    name: string;
    image: string;
    id: string;
    category: string;
    location: string;
}

export const CardBlog: React.FC<ICardBlog> = ({ name, image, id, category, location }) => {
    return (
        <div
            data-cy="blog-item"
            className="bg-black text-white rounded-lg shadow-white shadow-md"
        >
            <Link
                data-cy="blog-redirect"
                href={`/event/${id}`}
            >
                <Image
                    data-cy="blog-img"
                    src={image}
                    alt={name}
                    width={300}
                    height={450}
                    className="rounded-lg h-[350px] w-full md:h-[350px] lg:h-[400px]"
                />
                <div className="p-4 font-medium">
                    <h5
                        data-cy="blog-name"
                        className="mb-2 text-xl font-bold tracking-tight text-white"
                    >
                        {splitStr(name, 50)}
                    </h5>

                    {/* Display Category */}
                    <div className="text-sm mb-2">
                        <strong>Category:</strong> {category.toLocaleLowerCase()}
                    </div>

                    {/* Display Location */}
                    <div className="text-sm mb-4">
                        <strong>Location:</strong> {location}
                    </div>
                </div>
            </Link>
        </div>
    );
};
