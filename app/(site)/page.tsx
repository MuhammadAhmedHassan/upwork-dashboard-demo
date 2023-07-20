'use client'

import clsx from 'clsx'
import Sidebar from './components/Sidebar'
import { useCallback, useState } from 'react'
import Header from './components/Header'
import LineChart from './components/LineChart'
import DonutChart from './components/DonutChart'
import UserTable from './components/UserTable'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      {/* Header */}
      <main className="px-10 pt-8 w-full max-h-screen overflow-y-auto">
        <Header />

        <div className="mt-10 flex gap-x-6">
          <LineChart />
          <DonutChart />
        </div>

        <UserTable />
      </main>
    </div>
  )
}
