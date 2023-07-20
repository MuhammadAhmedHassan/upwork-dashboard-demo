'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { IconType } from 'react-icons'
import { PiCirclesFourBold } from 'react-icons/pi'
import { HiPresentationChartBar } from 'react-icons/hi'
import { BsChatText } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { SlLogout } from 'react-icons/sl'

type LinkType = {
  title: string
  href: string
  isActive: boolean
  icon: IconType
}

export default function Sidebar() {
  const [links, setLinks] = useState<LinkType[]>([
    { title: 'Dashboard', href: '/', isActive: true, icon: PiCirclesFourBold },
    {
      title: 'Popcards',
      href: '/',
      isActive: false,
      icon: HiPresentationChartBar,
    },
    { title: 'Feedback Forms', href: '/', isActive: false, icon: BsChatText },
  ])

  const handleLinkPress = useCallback((link: LinkType) => {
    setLinks((ps) =>
      ps.map((l) => {
        if (l.title === link.title) l.isActive = true
        else l.isActive = false
        return l
      })
    )
  }, [])

  return (
    <div className="min-h-screen  bg-gray-100">
      <aside className="bg-white max-w-xs min-w-max min-h-screen px-5 pt-8 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl text-gray-800 font-bold text-center ">
            <Link href="/">POPCARD</Link>
          </h1>
          <div className="border-t border-gray-300 my-8" />

          <nav>
            {links.map((l) => (
              <Link
                onClick={() => handleLinkPress(l)}
                key={l.title}
                href={l.href}
                className={clsx(
                  'flex items-center gap-x-4 text-sm mb-5 rounded-lg py-2 px-4',
                  l.isActive ? 'bg-yellow-400 text-white' : 'text-gray-500'
                )}
              >
                <l.icon size={24} />
                {l.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className=" ">
          <Link
            href="/"
            className={clsx(
              'flex items-center gap-x-4 text-sm my-5 rounded-lg py-2 px-4 text-gray-500'
              // l.isActive ? 'bg-yellow-400 text-white' : 'text-gray-500'
            )}
          >
            <IoSettingsOutline size={22} />
            Settings
          </Link>
          <button className="flex items-center gap-x-4 text-sm my-5 rounded-lg py-2 px-4 text-gray-500 w-full text-left">
            <SlLogout size={22} />
            Logout
          </button>
        </div>
      </aside>
    </div>
  )
}
