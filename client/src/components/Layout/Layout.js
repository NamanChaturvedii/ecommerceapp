import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";

import  { Toaster } from 'react-hot-toast';
const Layout = ({ children, title, description, keywords, author }) => {    // we write the {children} to show the children or the written text on the app .js
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "80vh" }}>
            <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "Ecommerce app - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Naman Chaturvedi",
    };

export default Layout