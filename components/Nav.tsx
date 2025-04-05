"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { getProviders, ClientSafeProvider } from "next-auth/react";

const Nav = () => {
  const {data : session} = useSession();
  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut({ callbackUrl: '/' }); // Redirect to the home page after signing out
  };
  
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  const [toggleDropdown, settoggleDropdown] = useState(false); 

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-2 md:gap-2">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image ?? '/assets/icons/profile.png'}
                alt="profile"
                width={37}
                className="rounded-full"
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image ?? '/assets/icons/profile.png'}
              alt="profile"
              width={37}
              className="rounded-full"
              height={37}
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
                <div className="dropdown">
                    <Link href='/profile'
                    className="dropdown_link"
                    onClick={()=>settoggleDropdown(false)}>
                    My Profile
                    </Link>
                    <Link href='/create-prompt'
                    className="dropdown_link"
                    onClick={()=>settoggleDropdown(false)}>
                    Create Prompt
                    </Link>
                    <button type="button" onClick={() => {
                        settoggleDropdown(false);
                        handleSignOut
                    }}
                    className="w-full black_btn mt-5">
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
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
