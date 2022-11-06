import Link from 'next/link';
import * as AiIcons from 'react-icons/ai';
import Image from 'next/image';

function Footer() {
    return (
        <footer className="footer-area md:pt-[20px] pt-[30px]">
           
            <div className="footer-bottom">
                <div className="custom-container">
                    <div className="inner-container border-[#dfdfdf] border-t md:mt-[95px] mt-[50px] py-9">
                        <div className="md:grid md:grid-cols-12 flex flex-col">
                            <div className="md:col-span-4 max-lm:order-last max-lm:pt-[10px]">
                                <div className="copyright flex-wrap md:justify-start justify-center md:mb-0 mb-[10px]">
                                    Odebiyi Olumide © 2022 <span className="mx-1"></span>
                                    
                                    
                                </div>
                            </div>
                            <div className="md:col-span-6">
                                
                                            
                            </div>
                            <div className="md:col-span-2">
                                <ul className="footer-language flex md:justify-end justify-center">
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
