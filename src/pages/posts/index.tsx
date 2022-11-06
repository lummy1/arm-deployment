import React from 'react'
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState, useEffect  } from 'react';
import HeaderTwo from '../../components/header/header';
import AllItems from '../../components/posts/all-items';
import { displayAlert } from "../../utils/toast";
import { ToastContainer } from 'react-toastify';

const base_url=process.env.BASE_URL;
const api_key=process.env.API_KEY;
const getNews = async () => {
    try {
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




function allItemsPage() {

    const [industries, setIndustries] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {

        (async () => {
            await getNews()
                .then((resp: any) => {
                    console.log(resp);
                    console.log(resp?.error?.code);
                    if (resp?.error?.code !== undefined) {
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
                        if (resp?.error?.code !== undefined ) {
                            console.log(resp.error.message);
                            displayAlert('error', resp.error.message);
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
                <title>All Posts</title>
                
            </Head>
            <HeaderTwo />
           
            <AllItems posts={news} categories={industries}  />
        </>
    );
}

allItemsPage.propTypes = {
     posts: PropTypes.instanceOf(Object).isRequired,
     categories: PropTypes.instanceOf(Object).isRequired,
    // tags: PropTypes.instanceOf(Object).isRequired,
};

export default allItemsPage;
