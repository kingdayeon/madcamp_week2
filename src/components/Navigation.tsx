// src/components/Navigation.tsx
import { Link, useLocation} from 'react-router-dom';

const navItems = [
  { path: '/home', label: 'My Space' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/horoscope', label: 'Horoscope 🔮' },
  { path: '/mypage', label: 'Mypage' },
  { path: '/social', label: 'Social' },
];

export default function Navigation() {
  const location = useLocation();
  // const navigate = useNavigate();



  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 네비게이션 아이템 */}
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-8 py-3 rounded-full font-medium transition-all
                ${isActive 
                  ? 'text-black' 
                  : 'text-white hover:text-gray-200'}`}
            >
              {item.label}
              {isActive && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 -z-10 bg-white/60 rounded-full" />
              )}
            </Link>
          );
        })}

      </div>
    </nav>
  );
}
