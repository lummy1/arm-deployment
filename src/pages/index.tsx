import React from 'react'
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState, useEffect, startTransition  } from 'react';
import Header from '../components/header/header';
import AllItems from '../components/posts/all-items';
import { displayAlert } from "../utils/toast";
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { ColorRing } from 'react-loader-spinner'


const base_url=process.env.BASE_URL;
const api_key=process.env.API_KEY;

// type TApiAllNewsResp = {
//     newsItems: 
//         {
//             uuid: string;
//             title: string;
//             description:  string;
//             keywords:  string;
//             snippet:  string;
//             url:  string;
//             image_url:  string;
//             language:  string;
//             published_at:  string;
//             source:  string;
//             relevance_score: null;
//             entities: {
//                 industry: string;
               
//             };
//             similar: []
//         }[]
    
// };

// const NewsGrid = (props: TApiAllNewsResp) => {
//     const { newsItems } = props;

// }


const getNews = async () => {
    try {

        console.log(base_url); 
        console.log(api_key);   
        const respJSON = await fetch(`${base_url}/news/all?filter_entities=true&language=en&api_token=${api_key}`);
        const resp = await respJSON.json();
        console.log(resp);
        console.log(resp?.error?.code);

        return resp;
    } catch (error) {
        throw error;
    }
};



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

  const filterData = async () => {
    const router = useRouter();
    const val = router?.query?.data != undefined ? router?.query?.data : '';
    const country = router?.query?.country != undefined ? router?.query?.country : '';
    console.log(val);
    try {
        const country = router?.query?.country != undefined ? router?.query?.country : '';
        const api = `${base_url}/news/all?filter_entities=true&must_have_entities=true&language=en&api_token=${api_key}&industries=` + val + `&country=` + country;
        const respJSON = await fetch(api);
        const resp = await respJSON.json();
        console.log(resp);
        return resp;
    } catch (error) {
        console.log(error);
    }
}



function allItemsPage() {

    const router = useRouter();
    console.log(router);
    if (router?.query?.data) {
        console.log(router?.query);
        console.log(router?.query?.data);
    };

    const [industries, setIndustries] = useState([]);
    const [news, setNews] = useState([]);
    const [filteredResults, setFilteredResults] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    

    // const filter = () =>{
        (async () => {
            if (router?.query?.data != undefined) {
                if (filteredResults == false) {
                    filterData().then((resp: any) => {
                        console.log(resp);
                        if (resp) {
                            console.log(resp);
                            startTransition(() => {
                            setNews(resp?.data);
                            setFilteredResults(true);
                            })
                            setRefreshKey(oldKey => oldKey +1)
                        } else {
                            // display error messsage
                            displayAlert('error', 'There is no value to filter');
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            }
        })();
    // }

    const DisplayMessage = () => {
        return (
            <div style={{textAlign: 'center'}}>Loading...</div>
        )
    }

    useEffect(() => {
        // console.log('reach here useeffect');
        // console.log(router?.query);
        // if (router?.query?.data != undefined) {
        //     console.log('reach here useeffect2');
        //     filter();
        // }

        (async () => {
            await getNews()
                .then((resp: any) => {
                    console.log(resp);
                    if (resp?.error?.code === 'usage_limit_reached') {
                        console.log(resp.error.message);
                        displayAlert('error', resp.error.message);
                    } else {
                        setNews(resp.data);
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                });

            await getIndustries()
                .then((resp: any) => {
                    console.log(resp);
                    if (resp?.error?.code === 'usage_limit_reached') {
                        console.log(resp.error.message);
                        //displayAlert('error', resp.error.message);
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
            {news.length > 0 ? (
                <>
                    <Head>
                        <title>All Posts</title>
                    </Head>
                    <Header />
                    <AllItems posts={news} categories={industries}  />
                </>
            ) : (
                    <DisplayMessage />
            )}
        </>
    );
}


allItemsPage.propTypes = {
    // posts: PropTypes.instanceOf(Object).isRequired,
    // categories: PropTypes.instanceOf(Object).isRequired,
    // tags: PropTypes.instanceOf(Object).isRequired,
};

export default allItemsPage;
