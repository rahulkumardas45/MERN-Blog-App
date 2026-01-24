import React from 'react'

const Footer = () => {
  return (
    <footer className="
      w-full
      fixed bottom-0 left-0
      bg-gray-50
      border-t
      text-sm
      text-center
      py-3
      text-gray-600
      dark:bg-gray-900
      dark:text-gray-400
    ">
      <span>
        © 2025 | Designed & Developed by{' '}
        <a
          href="https://www.youtube.com/@Iiitian_rahul"
          target="_blank"
          rel="noopener noreferrer"
          className="
            font-semibold
            text-green-600
            hover:text-green-700
            hover:underline
            transition
          "
        >
          Rahul Kumar
        </a>
      </span>
    </footer>
  )
}

export default Footer
