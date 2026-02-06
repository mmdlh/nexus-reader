import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  LayoutDashboard, 
  Library, 
  Users, 
  BarChart3, 
  Settings,
  Sparkles
} from "lucide-react";

const navItems = [
  { path: "/", label: "首页概览", icon: LayoutDashboard },
  { path: "/books", label: "图书管理", icon: Library },
  { path: "/borrow", label: "借阅管理", icon: BookOpen },
  { path: "/readers", label: "读者管理", icon: Users },
  { path: "/analytics", label: "数据分析", icon: BarChart3 },
  { path: "/settings", label: "系统设置", icon: Settings },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-library-navy via-primary to-library-navy-light opacity-95" />
      <div className="absolute inset-0 backdrop-blur-md" />
      
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-20">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 3).map((item) => (
                <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
              ))}
            </nav>

            {/* Center Title */}
            <div className="mx-8 flex items-center gap-3">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Sparkles className="w-8 h-8 text-library-gold" />
                <div className="absolute inset-0 blur-sm bg-library-gold/30 rounded-full" />
              </motion.div>
              
              <h1 className="font-tech text-2xl md:text-3xl font-bold text-white tracking-wider">
                智能图书馆
                <span className="text-library-gold ml-2">管理平台</span>
              </h1>
              
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Sparkles className="w-8 h-8 text-library-gold" />
                <div className="absolute inset-0 blur-sm bg-library-gold/30 rounded-full" />
              </motion.div>
            </div>

            {/* Right Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.slice(3).map((item) => (
                <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden border-t border-white/10">
          <div className="container mx-auto px-2 py-2">
            <div className="flex items-center justify-center gap-1 overflow-x-auto">
              {navItems.map((item) => (
                <MobileNavItem key={item.path} item={item} isActive={location.pathname === item.path} />
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

interface NavItemProps {
  item: { path: string; label: string; icon: React.ComponentType<{ className?: string }> };
  isActive: boolean;
}

const NavItem = ({ item, isActive }: NavItemProps) => {
  const Icon = item.icon;
  
  return (
    <Link to={item.path}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
          transition-all duration-300 group
          ${isActive 
            ? "bg-white/20 text-white shadow-lg" 
            : "text-white/80 hover:text-white hover:bg-white/10"
          }
        `}
      >
        <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-library-gold" : "group-hover:text-library-gold"}`} />
        <span>{item.label}</span>
        
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute inset-0 rounded-xl border-2 border-library-gold/50"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-library-gold rounded-full shadow-lg" 
               style={{ boxShadow: "0 0 10px hsl(var(--library-gold))" }} />
        )}
      </motion.div>
    </Link>
  );
};

const MobileNavItem = ({ item, isActive }: NavItemProps) => {
  const Icon = item.icon;
  
  return (
    <Link to={item.path}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={`
          flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs
          transition-all duration-300
          ${isActive 
            ? "bg-white/20 text-white" 
            : "text-white/70 hover:text-white hover:bg-white/10"
          }
        `}
      >
        <Icon className={`w-5 h-5 ${isActive ? "text-library-gold" : ""}`} />
        <span className="whitespace-nowrap">{item.label}</span>
      </motion.div>
    </Link>
  );
};

export default Header;
