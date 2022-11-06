import Head from 'next/head';
import PropTypes from 'prop-types';
import PostContent from '../../components/posts/post-detail/post-content';
import { useRouter } from "next/router";
import { useState, useEffect} from 'react'
import Header from '../../components/header/header';
import { displayAlert } from "../../utils/toast";
import { ToastContainer } from 'react-toastify';






const base_url=process.env.BASE_URL;
const api_key=process.env.API_KEY;
function PostDetailPage() {
    // const { post, tags, categories, prevPost, nextPost } = protrrrreps;
    // console.log(post);

    const getIndustries = async () => {
        try {
          const respJSON = await fetch(
            `${base_url}/entity/industry/list?api_token=${api_key}`
          );
          const resp = await respJSON.json();
          console.log(resp);
          return resp;
        } catch (error) {
          throw error;
        }
      };

    const router = useRouter();
    console.log(router)
    console.log(router?.query)

    const getSingleNews = async () => {
        try {
            console.log(router)
            console.log(router?.query)
            const uuid = router?.query.slug;
            console.log(uuid)
            const respJSON = await fetch(`${base_url}/news/uuid/${uuid}?api_token=${api_key}`);
            const resp = await respJSON.json();
            console.log(resp)
            return resp;
        } catch (error) {
            throw error;
        }
    };

    const [industries, setIndustries] = useState([]);
    const [news, setNews] = useState({});

    useEffect(() => {

        (async () => {
            await getSingleNews()
                .then((resp: any) => {
                    console.log(resp);
                    if (resp?.error?.code !== undefined ) {
                        console.log(resp.error.message);
                        displayAlert('error', resp.error.message);
                    } else {
                        setNews(resp);
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                });

                await getIndustries()
                    .then((resp: any) => {
                        console.log(resp);
                        if (resp?.error?.code !== undefined ) {
                            console.log(resp.error.message);
                           // displayAlert('error', resp.error.message);
                        } else {
                            setIndustries(resp.data);
                        }
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
        })();       
            
    }, [])
    return (
        <>
         <ToastContainer theme="colored"/>
            <Head>
                <title>{news.title}</title>
                <meta name="description" content={news.title} />
            </Head>
            <Header />
            
            <PostContent post={news} categories={industries}  />
            
            {/* <PostPageNavigation prevPost={prevPost} nextPost={nextPost} /> */}
        </>
    );
}

PostDetailPage.propTypes = {
    post: PropTypes.instanceOf(Object),
    categories: PropTypes.instanceOf(Object),
    // prevPost: PropTypes.instanceOf(Object).isRequired,
    // nextPost: PropTypes.instanceOf(Object).isRequired,
};

export default PostDetailPage;
