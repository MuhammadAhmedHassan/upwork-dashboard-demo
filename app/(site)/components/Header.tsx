'use client'

import clsx from 'clsx'
import { useCallback, useState } from 'react'

type PillType = { title: string; isActive: boolean }

export default function Header() {
  const [pills, setPills] = useState([
    { title: '6 Hours', isActive: false },
    { title: '1 Day', isActive: false },
    { title: '7 Days', isActive: false },
    { title: '14 Days', isActive: false },
    { title: '1 Month', isActive: false },
    { title: '2 Months', isActive: false },
    { title: '3 Months', isActive: false },
    { title: '1 Year', isActive: true },
  ])

  const handlePillPress = useCallback((pill: PillType) => {
    setPills((ps) =>
      ps.map((p) => {
        if (p.title === pill.title) p.isActive = true
        else p.isActive = false
        return p
      })
    )
  }, [])

  return (
    <header className="flex justify-between items-center ">
      <div className="flex flex-col">
        <h1 className="text-3xl text-gray-800 font-bold text-center ">
          Dashboard
        </h1>
        <p className="text-gray-500">January 1, 2023</p>
      </div>

      <div className="flex gap-x-2">
        {pills.map((p) => (
          <button
            onClick={() => handlePillPress(p)}
            key={p.title}
            className={clsx(
              'flex items-center justify-center px-4 py-1 rounded-full text-xs',
              p.isActive ? 'bg-yellow-400 text-white' : 'bg-white text-gray-800'
            )}
          >
            {p.title}
          </button>
        ))}
      </div>
    </header>
  )
}
