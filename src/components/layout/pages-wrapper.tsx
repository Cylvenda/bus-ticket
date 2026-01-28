import React from 'react'

interface PagesWrapperProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

const PagesWrapper = ({ children, className = "", fullWidth = false }: PagesWrapperProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ${className}`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='13' cy='7' r='1'/%3E%3Ccircle cx='19' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className={
          fullWidth
            ? "w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10"
            : "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10"
        }>
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PagesWrapper