
const PagesWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-3 px-3 bg-accent">
        {children}
    </div>
  )
}

export default PagesWrapper