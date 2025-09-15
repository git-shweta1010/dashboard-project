import React from 'react'

export default function Layout({ children }) {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <header className="p-4 shadow-md bg-gray-800">
        <h1 className="text-2xl font-semibold">My Dashboard</h1>
      </header>
      <main className="p-6">
        {children}
      </main>
      <footer className="p-4 text-center text-sm text-gray-500">
        © 2025 Shweta..
      </footer>
    </div>
  )
}
