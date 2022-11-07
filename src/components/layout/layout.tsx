import PropTypes from 'prop-types';
import Footer from './footer';

export * from '../scroll';

function Layout({ children }: {children:any}) {
    return (
        <>
            <main>{children}</main>
            <Footer />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
};

export default Layout;
