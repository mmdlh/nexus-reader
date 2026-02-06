import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "gold" | "teal" | "emerald";
}

const colorClasses = {
  primary: {
    icon: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    glow: "shadow-[0_0_20px_hsl(var(--primary)/0.2)]",
  },
  gold: {
    icon: "text-library-gold",
    bg: "bg-library-gold/10",
    border: "border-library-gold/20",
    glow: "shadow-[0_0_20px_hsl(var(--library-gold)/0.2)]",
  },
  teal: {
    icon: "text-library-teal",
    bg: "bg-library-teal/10",
    border: "border-library-teal/20",
    glow: "shadow-[0_0_20px_hsl(var(--library-teal)/0.2)]",
  },
  emerald: {
    icon: "text-library-emerald",
    bg: "bg-library-emerald/10",
    border: "border-library-emerald/20",
    glow: "shadow-[0_0_20px_hsl(var(--library-emerald)/0.2)]",
  },
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "primary" }: StatCardProps) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative overflow-hidden rounded-2xl p-6
        bg-card/95 backdrop-blur-xl
        border ${colors.border}
        shadow-lg hover:${colors.glow}
        transition-shadow duration-300
      `}
    >
      {/* Gradient top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${color === 'gold' ? 'library-gold' : color === 'teal' ? 'library-teal' : color === 'emerald' ? 'library-emerald' : 'primary'} to-transparent`} />
      
      {/* Background decoration */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 ${colors.bg} rounded-full blur-2xl`} />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium ${trend.isPositive ? 'text-library-emerald' : 'text-destructive'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">较上月</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl ${colors.bg} ${colors.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
