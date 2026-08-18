import React from 'react'

const Footer = () => {
  return (
    <footer className="
      w-full
      mt-auto
      bg-slate-950/95
      border-t border-slate-200/70
      shadow-[0_-8px_24px_rgba(15,23,42,0.04)]
      backdrop-blur-xl
      glass-panel
      text-sm
      text-center
      py-3
      text-slate-300
      dark:bg-slate-950/90
      dark:text-gray-400
    ">
      <span>
        © 2026 | Designed & Developed by{' '}
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
