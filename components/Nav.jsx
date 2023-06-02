"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [fakeUser, setFakeUser] = useState(null);

  const handleFakeSignIn = async () => {
    const fakeUser = {
      email: "lol1@gmail.com",
      username: "fakefake1231",
      image: "/assets/images/logo.svg",
    };
    sessionStorage.setItem("fakeUser", JSON.stringify(fakeUser));
    setFakeUser(fakeUser);
    try {
      await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fakeUser),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFakeSignOut = () => {
    sessionStorage.clear();
    setFakeUser(null);
  };
  useEffect(() => {
    const storedFakeUser = JSON.parse(sessionStorage.getItem("fakeUser"));
    if (storedFakeUser) setFakeUser(storedFakeUser);
  }, []);

  useEffect(() => {
    const setProvidersFunc = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersFunc();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopua logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {session?.user || fakeUser ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              // onClick={signOut}
              onClick={handleFakeSignOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image || fakeUser?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
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
                  // onClick={() => signIn(provider.id)}
                  onClick={() => handleFakeSignIn()}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {session?.user || fakeUser ? (
          <div className="flex">
            <Image
              src={session?.user?.image || fakeUser?.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/propmpt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  // onClick={() => {
                  //   setToggleDropDown(false);
                  //   signOut();
                  // }}
                  onClick={() => {
                    setToggleDropDown(false);
                    handleFakeSignOut();
                  }}
                  className="mt-5 w-full black_btn"
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
                  type="button"
                  key={provider.name}
                  // onClick={() => signIn(provider.id)}
                  onClick={() => handleFakeSignIn()}
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
