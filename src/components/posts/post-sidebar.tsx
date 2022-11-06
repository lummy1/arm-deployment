import PropTypes from 'prop-types';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import {Router, useNavigate } from "react-router-dom";
import {useRouter } from 'next/router';

function PostSidebar({ categories }) {

    console.log(categories);
    const router = useRouter();
    // const navigate = useNavigate();
    const [data, setData] = useState({
        industries: [],
      });
      const [country, setCountry] = useState('');
      const handleChanged = (e: any) => {
          let value = e.target.checked;
          console.log(value);
      }
  
      const handleChange = (e: any) => {
          const { value, checked } = e.target;
          const { industries } = data;
          console.log(`${value} is ${checked}`);
          if (checked) {
              setData({
                  industries: [...industries, value],
              });
          }
          else {
              setData({
                  industries: industries.filter((item) => item !== value),
              });
          }
      };
  
      const handleSelect = (e: any) => {
          console.log(e.target.value);
          setCountry(e.target.value);
      }
  
      
  
      console.log(data);

      const callNewsApi = async () => {
        const val = data?.industries?.join(',');
        console.log(val);
        try {
            // const api = "https://api.marketaux.com/v1/news/all?filter_entities=true&must_have_entities=true&language=en&api_token=B5jPRKP0TrGAeDHAl34dGcEqOiKr7VbNQQWhUJwR&industries=" + val + "&country=us";
            // const respJSON = await fetch(api);
            // const resp = await respJSON.json();
            // console.log(resp);
            return val;
        } catch (error) {
            console.log(error);
        }
    }

    const performSearch = (event: any) => {
        event.preventDefault();
        router.push({ pathname: '/', query: { pattern: '' } });
    };

    const filterData = async () => {
        await callNewsApi().then((resp: any) => {
            console.log(resp);
            // navigate('/', { state: { data: resp?.data, fromPage: 'filter-post' }, replace: false });
            if (resp) {
                console.log(resp);
                router.push({ pathname: '/', query: { data: resp, country: country, fromPage: 'filter-post' } });
            } else {
                // display error messsage
            }
        }).catch((err) => {
            console.log(err);
        })
    }

      
    return (
        <>
        {categories?.length > 0 && (
            <>
                <div className="post-sidebar border-[#eee] border p-[50px_29px_66px]">
                    <div className="post-searchbar">
                        {/* <h2 className="text-[20px] font-bold text-[#222] border-[#eee] border-b pb-[11px] mb-[20px]">
                Search
            </h2> */}
                        {/* <form className="flex relative">
                <input
                    className="w-full border-[#ddd] border-opacity-40 border text-[14px] focus-visible:outline-0 py-[15px] pl-[20px] pr-[50px]"
                    placeholder="Search..."
                    type="text"
                    id="search"
                />
                <button
                    className="absolute text-[#595959] top-1/2 translate-y-[-50%] right-[30px]"
                    type="submit"
                >
                    <FaSearch />
                </button>
            </form> */}
                    </div>
                    <form className="">
                        <div className="post-searchbar">
                            <h2 className="text-[20px] font-bold text-[#222] border-[#eee] border-b pb-[11px] mb-[20px]">
                                Countries
                            </h2>

                            <select className="w-full border-[#ddd] border-opacity-40 border text-[14px] focus-visible:outline-0 py-[15px] pl-[20px] pr-[50px]"
                                placeholder="Search..." id="search" onChange={(e) => handleSelect(e)}>
                                <option value="">Choose Country...</option>
                                <option value="us">United States</option>
                                <option value="gb">United Kingdom</option>
                                <option value="eu">European Union</option>
                                <option value="za">South Africa</option>
                                <option value="hk">Hong Kong</option>

                            </select>

                        </div>

                        <div className="post-sidebar-item post-sidebar-item mt-[50px]">
                            <h2 className="text-[20px] font-bold text-[#222] border-[#eee] border-b pb-[11px] mb-[20px]">
                                Industries
                            </h2>
                            <ul className="post-list">
                                {categories.map((category: any, i: number) => (
                                    <>
                                        <li className="mb-[15px] last:mb-0" key={i}>
                                            <input type={'checkbox'} name={'industries'} value={category} onChange={e => handleChange(e)} />
                                            {' '}  {category}

                                            {/* <Link href={`/category/${category}`}>
                            <a className="hover:underline capitalize">
                                {category}
                            </a>
                        </Link> */}
                                        </li>

                                    </>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-[55px]">
                            <button type="button" onClick={() => filterData()} className="boxed-btn text-[14px]">
                                Apply
                            </button>
                        </div>
                    </form>
            {/* <div className="post-sidebar-item post-sidebar-item mt-[50px]">
            
                <h2 className="text-[20px] font-bold text-[#222] border-[#eee] border-b pb-[11px] mb-[20px]">
                    Popular tags
                </h2>
                <ul className="post-tags flex flex-wrap">
                    {tags.map((popularTag) => (
                        <li className=" mr-[10px] mb-[5px]" key={popularTag}>
                            <Link href={`/tag/${popularTag}`}>
                                <a className="hover:underline">{popularTag},</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
                </>
            )}
        </>
    );
}
PostSidebar.propTypes = {
    categories: PropTypes.instanceOf(Object).isRequired,
   // tags: PropTypes.instanceOf(Object).isRequired,
};

export default PostSidebar;
