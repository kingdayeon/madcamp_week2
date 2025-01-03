// src/components/Navigation.tsx
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: '내 우주' },
  { path: '/gallery', label: '갤러리' },
  { path: '/horoscope', label: '별자리 운세' },
  { path: '/mypage', label: '마이페이지' },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center"> {/* justify-center를 justify-between으로 변경하고 최대 너비 설정 */}
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
