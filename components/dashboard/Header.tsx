interface HeaderProps {
  user: { name?: string | null; email?: string | null; role?: string | null }
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="h-14 flex-shrink-0 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <div className="text-sm text-gray-400">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-white leading-tight">{user?.name || user?.email}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role || 'admin'}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">
            {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  )
}
