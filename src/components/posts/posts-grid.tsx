import PropTypes from 'prop-types';
import PostItem from './post-item';
import { useRouter } from 'next/router'

function PostsGrid({ posts }) {

    const router = useRouter();
    const val = router?.query?.data != undefined ? router?.query?.data : '';
    const country = router?.query?.country != undefined ? router?.query?.country : '';
    console.log(val);
    console.log('gsff'+ country);
    return (
        <>
        <div className="lg:col-span-8">
            <div className="font-bold text-[14px] leading-[38px] mb-[15px]">
        {val !=='' || country !=='' ? (  <span className='text-[16px]'>Filter Result:</span>
        ): '' }
        {val !==''  ? ( <span style={{color:'#ffe699'}} className="gap-x-[25px]"> Industries: {val}  </span>  
        ): '' }
        {country !==''  ? ( <span  style={{color:'#e6ac00', textAlign:'right'}}> Country Code: {country} </span> 
        ): '' }
        </div>
            <div className="grid lm:grid-cols-2 gap-x-[25px] gap-y-[55px]">
                {posts.map((posts:any , index:any) => (
                    <PostItem key={index} posts={posts} />
                ))}
            </div>
        </div>
        </>
    );
}

PostsGrid.propTypes = {
    posts: PropTypes.instanceOf(Object).isRequired,
};

export default PostsGrid;
