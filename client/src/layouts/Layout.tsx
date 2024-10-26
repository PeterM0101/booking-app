import Header from "../components/Header.tsx";
import {FC, ReactNode} from "react";
import Hero from "../components/Hero.tsx";
import Footer from "../components/Footer.tsx";

interface LayoutProps {
    children: ReactNode | null
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header/>
            <Hero/>
            <div className='container mx-auto py-10 flex-1'>{children}</div>
            <Footer/>
        </div>
    );
};

export default Layout;