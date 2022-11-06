import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import DarkLogo from './dark-logo';

function HeaderTwo() {
   

    // Header Sticky Activation
    const header = useRef();
    useEffect(() => {
        window.addEventListener('scroll', isSticky);

        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []);

    const isSticky = (e) => {
        const scrollTop = window.scrollY;

        scrollTop >= 90
            ? header.current?.classList.add('is-sticky')
            : header.current?.classList.remove('is-sticky');
    };
    //   End Here

    const router = useRouter();
    const headerCss = `flex lg:justify-between justify-end items-center`;

    return (
        <>
            <header className="header-section sticky-style-2" ref={header}>
                <div className="custom-container container">
                    <div className="grid grid-cols-12 items-center leading-[120px]">
                        <div className="lg:col-span-2 col-span-6">
                            <DarkLogo />
                        </div>
                        <div className="lg:col-span-7 lg:block hidden">
                            <nav>
                                <ul className="main-menu">
                                    <li
                                        className={
                                            router.pathname === '/'
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        <Link href="/">
                                            <a>
                                                <span>Home</span>
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li
                                        className={
                                            router.pathname === '/posts'
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        <Link href="#">
                                            <a>
                                                <span>About</span>
                                            </a>
                                        </Link>
                                    </li>
                                   
                                </ul>
                            </nav>
                        </div>
                        
                    </div>
                </div>
            </header>
           
        </>
    );
}

export default HeaderTwo;
