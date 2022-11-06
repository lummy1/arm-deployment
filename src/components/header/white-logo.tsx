import Link from 'next/link';
import Image from 'next/image';

function WhiteLogo() {
    return (
        <Link href="/">
            <a className="inline-block align-middle leading-[1]">
                <Image
                    src="/images/logo/logo.png"
                    alt="Logo"
                    width={116}
                    height={57}
                />
            </a>
        </Link>
    );
}

export default WhiteLogo;
