"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className=' flex-between w-full mb-16 pt-3 text-primary-content'>
    
      {/* <Link href='/my-events' className='black_btn'>
              Create Post
      </Link> */}
      <Link href='/' className='flex gap-2 flex-center text-primary-content'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <h1 className="text-3xl font-bold leading-tight">My Ticket</h1> 
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/my-events' className='leading-normal text-lg pr-4'>
              My Events 
            </Link>
            <Link href='/buy-product' className='leading-normal text-lg pr-4'>
              Available Event Tickets
            </Link>
            <Link href='/my-tickets' className='leading-normal text-lg pr-4'>
              My Tickets
            </Link>
            <Link href='/event-registration' className='leading-normal text-lg pr-4'>
              Event Registration

            </Link>



            <button type='button' onClick={signOut} className='outline_btn text-lg pr-2'>
              Sign Out
            </button>

            <Link href='/my-tickets'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            <Link href='/buy-product' className='leading-normal text-lg pr-4'>
              Available Event Tickets
            </Link>
            <Link href='/buy-product' className='leading-normal text-lg pr-4'>
              Become a Partner
            </Link>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn text-lg'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/my-tickets'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Tickets
                </Link>
                <Link
                  href='/my-events'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Events
                </Link>
                <Link
                  href='/buy-product'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Buy Product
                </Link>
                <Link
                  href='/event-registration'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Event Registration
                </Link>
                <Link
                  href='/contact'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Contact
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn text-lg'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;