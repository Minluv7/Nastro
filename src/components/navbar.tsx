"use client";
import { useState } from "react";
import Image from "next/image";

export default function Navbar({className = ""}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`bg-background p-4 relative flex items-end ${className}`}>
      <div className="flex items-end justify-between w-full">
        {/* Logo */}
        <a href="/" className="w-[15rem]">
          <Image src="/logo.png" width={240} height={240} alt="logo" />
        </a>

        {/* Hamburger Button (visible on mobile) */}
        <button
          className="block md:hidden z-20 text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              style={{ stroke: "rgb(226, 226, 226)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              style={{ stroke: "rgb(226, 226, 226)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>

        {/* Desktop Menu (hidden on mobile) */}
        <ul className="hidden md:flex gap-6 text-gray-600">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/horoscope">Horoscope</a>
          </li>
          <li>
            <a href="/moon_phases">Moon Phases</a>
          </li>
          <li>
            <a href="/planets">Planets</a>
          </li>
          <li>
            <a href="/human">Human</a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`fixed z-10 inset-0 bg-background w-full h-full ${
          isOpen ? "flex" : "hidden"
        } flex-col justify-center items-center gap-6 p-4 md:hidden`}
      >
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/horoscope">Horoscope</a>
        </li>
        <li>
          <a href="/moon_phases">Moon Phases</a>
        </li>
        <li>
          <a href="/planets">Planets</a>
        </li>
        <li>
          <a href="/human">Human</a>
        </li>
    </ul>

    </nav>
  );
}
