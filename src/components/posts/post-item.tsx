import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import  { FaCalendar }  from 'react-icons/fa';


function PostItem({ posts }: {posts:any}) {
    const formattedDate = new Date(posts?.published_at).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    // const imagePath = `/images/posts/${posts?.slug}/${posts?.image}`;
    const linkPath = `/posts/${posts?.uuid}`;

    return (
        <div className="post-item">
            <Link href={linkPath}>
                <a>
                    <div className="post-img block">
                        {/* <Image
                            src={posts?.image_url}
                            alt={posts?.title}
                            width={374}
                            height={303}
                            layout="responsive"
                            quality={60}
                            priority
                        /> */}
                        <img
                            src={posts?.image_url}
                            alt={posts?.title}
                            width={374}
                            
                        />
                    </div>
                    <div className="post-content">
                        <h2 className="text-[24px] leading-[34px] mt-6 transition duration-300 hover:text-[#cbaf71] hover:underline">
                            {posts?.title}
                        </h2>
                        <div className="text-[14px] leading-6 text-[#222] block mt-2">
                        <span className="text-black font-medium ml-[5px]">  {formattedDate} 
                            </span>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
}

PostItem.propTypes = {
    posts: PropTypes.instanceOf(Object).isRequired,
};

export default PostItem;
