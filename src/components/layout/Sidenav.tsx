import React from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';

const Sidenav = () => {
    /* Set the width of the side navigation to 250px */
    const openNav = () => {
        const sidenav = document.getElementById("mySidenav");
        if (sidenav) {
            sidenav.style.width = "250px";
        }
    };

    /* Set the width of the side navigation to 0 */
    const closeNav = () => {
        const sidenav = document.getElementById("mySidenav");
        if (sidenav) {
            sidenav.style.width = "0";
        }
    };

    return (
        <>
            <div id="mySidenav" className="sidenav shadow-2xl bg-amber-100 shadow-black">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <div className='flex justify-center'>
                    <Image src={Logo} alt='Logo' className='w-[60px] h-[60px] bg-black pt-[5px]' />
                </div>
                <div className='flex flex-col items-center space-y-2 mt-10'>
                    <Link href={'/'} className='cursor-pointer hover:bg-black hover:text-white w-full flex justify-center  py-3'>Home</Link>
                    <Link href={'/'} className='cursor-pointer hover:bg-black hover:text-white w-full flex justify-center py-3'>Products</Link>
                    <Link href={'/'} className='cursor-pointer hover:bg-black hover:text-white w-full flex justify-center py-3'>Services</Link>
                    <Link href={'/'} className='cursor-pointer hover:bg-black hover:text-white w-full flex justify-center py-3'>About us</Link>
                    <Link href={'/'} className='cursor-pointer hover:bg-black hover:text-white w-full flex justify-center py-3'>Contact us</Link>
                    <button className="px-4 py-2 cursor-pointer  rounded-md transition-colors flex items-center space-x-2">
                        <User size={16} />
                        <span className="underline underline-offset-8">Sign In</span>
                    </button>
                </div>

            </div>


            <span onClick={openNav}>open</span>

        </>
    )
}

export default Sidenav