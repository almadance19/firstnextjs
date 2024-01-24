import React from "react";
import Link from "next/link"; 
import Nav from "./Nav";
import Image from "next/image";

const Header = () => {    
    return (
        <header data-theme="business" className="bg-primary text-primary-content  py-4 shadow">
        {/* <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* <h1 className="text-3xl font-bold leading-tight">Box Office</h1> */}
        {/* <div className="flex justify-between">
        <Link href="/">
        <h1 className="text-3xl font-bold leading-tight">Box Office</h1> 
        </Link>
        </div>
        </div> */} 

        <Nav />	


        </header>
    );
}

export default Header;    