'use client'

import { Instagram, LinkedinIcon, LucideFacebook, YoutubeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

function HeaderPayment() {
  const menu1: { title: string; link: string }[] = [
    {
      title: 'Contact',
      link: 'https://maxseen.com/contact-us/',
    },
    {
      title: 'About',
      link: 'https://maxseen.com/maxeen-digital-agency-about-us/',
    },
    {
      title: 'Services',
      link: 'https://maxseen.com/service/seo-services-1/',
    },
  ]

  const companyLinks = [
    {
      href: 'https://www.facebook.com/people/Maxseen-Digital-Marketing/100094278076057/',
      title: 'facebook',
      icon: <LucideFacebook className=" group-hover:text-white" />,
    },
    {
      href: 'https://www.instagram.com/maxseeninc/',
      title: 'instagram',
      icon: <Instagram className=" group-hover:text-white" />,
    },
    {
      href: 'https://www.youtube.com/@MaxseenDigitalMarketing',
      title: 'youtube',
      icon: <YoutubeIcon className=" group-hover:text-white" />,
    },
    {
      href: 'https://www.linkedin.com/in/maxseen-digital-marketing-3a9021283/',
      title: 'linkedin',
      icon: <LinkedinIcon className=" group-hover:text-white" />,
    },
  ]

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const handleSideNavOpen = () => {
    setSideNavOpen(!sideNavOpen)
  }

  return (
    <header className="sticky top-0 z-10 my-2 border-b bg-background font-bold">
      <div className="hidden border-b lg:block">
        <div className="h-12 border-b ">
          <div className="ml-32 mt-5  flex w-3/5 items-center divide-x text-sm">
            <div className="w-auto flex-1 pr-4 text-right">
              <a href="tel:+16696965906" target="_blank">
                {' '}
                <img src="/contactPng/call.svg" alt="#" className="mr-1 inline-block w-4" />
                (669) 696 59-06{' '}
              </a>
            </div>
            <div className="min-w-fit flex-1  px-4 text-center">
              <img src="/contactPng/map.svg" alt="#" className="mr-1 inline-block w-4" />
              San Jose, California, USA
            </div>
            <div className="min-w-fit  flex-1 pl-4 text-left">
              <a href="mailto:success@maxseen.com" target="_blank">
                <img src="/contactPng/email.svg" alt="#" className="mr-1 inline-block w-4" />
                success@maxseen.com
              </a>
            </div>
          </div>
          <div className="float-right -mt-4 mr-8 flex items-center justify-center gap-3">
            {companyLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                className=" group  flex items-center justify-center rounded-full p-1  hover:bg-[#6831EF]"
              >
                {l.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 lg:flex lg:items-center lg:gap-12">
            <Link target="_blank" href={'https://maxseen.com/'}>
              <span className="sr-only">Home</span>
              <Image
                className="h-14 w-[185px]"
                src="https://maxseen.com/wp-content/uploads/2023/06/logo.webp"
                alt="logo"
                width={185}
                height={56}
              />
            </Link>
          </div>
          <div className="lg:flex lg:items-center lg:gap-12">
            <nav aria-label="Global" className="hidden lg:block">
              <ul className="flex items-center gap-6 text-sm">
                {menu1.map(item => {
                  return (
                    <li
                      key={item.link}
                      className="group flex  h-16 items-center justify-center hover:border-b-[3px] hover:border-b-[#6831EF]"
                    >
                      <Link
                        className=" text-[0.95rem] group-hover:text-[#6831EF]  "
                        target="_blank"
                        href={item.link}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
                {/* <div className="flex h-16 items-center justify-center hover:border-b-[3px] hover:border-b-blue-600">
                  <li>
                    <button onClick={handleDropdownOpen} className="inline-block text-[0.95rem]">
                      Services
                    </button>
                    <button
                      onClick={handleDropdownOpen}
                      className="h-full p-2 hover:bg-gray-50 hover:text-gray-700"
                    >
                      <span className="sr-only">Menu</span>
                      <div className="inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </button>
                  </li>
                </div> */}
              </ul>
            </nav>
            {/* the below codes are for (screen width < lg) navbar */}
            {sideNavOpen ? (
              <div>
                <nav
                  id="sidenav-1"
                  className="absolute left-0 top-0 z-[1035] h-full w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800 lg:hidden"
                  data-te-sidenav-init
                  data-te-sidenav-hidden="false"
                  data-te-sidenav-position="absolute"
                >
                  <ul
                    className="relative m-0 list-none divide-y divide-solid px-[0.2rem]"
                    data-te-sidenav-menu-ref
                  >
                    <li className="mb-4 ml-4 mt-10">
                      <Image
                        className="h-14 w-[185px]"
                        src="https://maxseen.com/wp-content/uploads/2023/06/logo.webp"
                        alt="logo"
                        width={185}
                        height={56}
                      />
                    </li>
                    {menu1.map(item => {
                      return (
                        <li key={item.link} className="relative">
                          <a
                            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-600  hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none "
                            href={item.link}
                          >
                            <span>{item.title}</span>
                          </a>
                        </li>
                      )
                    })}
                    <li className="relative">
                      <a
                        onClick={handleDropdownOpen}
                        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-600  hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none "
                        data-te-sidenav-link-ref
                      >
                        <span onClick={handleDropdownOpen}>Services</span>
                        <button
                          onClick={handleDropdownOpen}
                          className="absolute right-0 ml-auto mr-[0.8rem] text-black transition-transform duration-300 ease-linear motion-reduce:transition-none dark:[&>svg]:text-gray-300"
                          data-te-sidenav-rotate-icon-ref
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </a>
                      {dropdownOpen ? (
                        <ul
                          className="!visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
                          data-te-sidenav-collapse-ref
                          data-te-collapse-show
                        >
                          <li className="relative">
                            <a
                              className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.875rem] outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-600  hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none "
                              data-te-sidenav-link-ref
                            >
                              Link A
                            </a>
                          </li>
                          <li className="relative">
                            <a
                              className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.875rem] outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-blue-600  hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none "
                              data-te-sidenav-link-ref
                            >
                              Link B
                            </a>
                          </li>
                        </ul>
                      ) : null}
                    </li>
                  </ul>
                </nav>
              </div>
            ) : null}
            <div className="flex items-center gap-4">
              <div className="block lg:hidden">
                <button
                  className="rounded bg-gray-100 p-2 transition hover:text-gray-600/75"
                  onClick={handleSideNavOpen}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default HeaderPayment
