import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Download
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const borrowTrendData = [
  { month: "1月", borrowCount: 4200, returnCount: 3800 },
  { month: "2月", borrowCount: 3800, returnCount: 4100 },
  { month: "3月", borrowCount: 5100, returnCount: 4500 },
  { month: "4月", borrowCount: 4700, returnCount: 4900 },
  { month: "5月", borrowCount: 5300, returnCount: 5000 },
  { month: "6月", borrowCount: 6100, returnCount: 5600 },
];

const categoryData = [
  { name: "计算机科学", value: 35, color: "hsl(215, 80%, 45%)" },
  { name: "文学小说", value: 25, color: "hsl(38, 90%, 55%)" },
  { name: "经济管理", value: 18, color: "hsl(185, 70%, 45%)" },
  { name: "自然科学", value: 12, color: "hsl(160, 60%, 45%)" },
  { name: "其他", value: 10, color: "hsl(200, 85%, 50%)" },
];

const weeklyData = [
  { day: "周一", visitors: 1200, borrows: 340 },
  { day: "周二", visitors: 1350, borrows: 380 },
  { day: "周三", visitors: 1100, borrows: 290 },
  { day: "周四", visitors: 1400, borrows: 420 },
  { day: "周五", visitors: 1600, borrows: 480 },
  { day: "周六", visitors: 2100, borrows: 620 },
  { day: "周日", visitors: 1800, borrows: 510 },
];

const topBooks = [
  { rank: 1, title: "人工智能：现代方法", author: "Stuart Russell", count: 156 },
  { rank: 2, title: "三体", author: "刘慈欣", count: 142 },
  { rank: 3, title: "算法导论", author: "Thomas H. Cormen", count: 128 },
  { rank: 4, title: "设计心理学", author: "唐纳德·诺曼", count: 115 },
  { rank: 5, title: "时间简史", author: "史蒂芬·霍金", count: 98 },
];

const Analytics = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">数据分析</h2>
            <p className="text-muted-foreground">查看图书馆运营数据和统计分析</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              选择日期
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "本月借阅量", value: "6,142", change: "+12.5%", isPositive: true, icon: BarChart3 },
            { label: "日均访客", value: "1,456", change: "+8.3%", isPositive: true, icon: TrendingUp },
            { label: "图书利用率", value: "78.5%", change: "+2.1%", isPositive: true, icon: PieChart },
            { label: "逾期率", value: "3.2%", change: "-0.5%", isPositive: true, icon: TrendingDown },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-5" hover>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className={`text-sm font-medium mt-1 ${metric.isPositive ? "text-library-emerald" : "text-destructive"}`}>
                      {metric.change} 较上月
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <metric.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Borrow Trend Chart */}
          <GlassCard className="lg:col-span-2 p-6" delay={0.2}>
            <h3 className="text-lg font-semibold mb-4">借阅趋势</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={borrowTrendData}>
                  <defs>
                    <linearGradient id="colorBorrow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(215, 80%, 45%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(215, 80%, 45%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="borrowCount" 
                    stroke="hsl(215, 80%, 45%)" 
                    fillOpacity={1} 
                    fill="url(#colorBorrow)" 
                    name="借阅量"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="returnCount" 
                    stroke="hsl(160, 60%, 45%)" 
                    fillOpacity={1} 
                    fill="url(#colorReturn)" 
                    name="归还量"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Category Distribution */}
          <GlassCard className="p-6" delay={0.3}>
            <h3 className="text-lg font-semibold mb-4">分类占比</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Stats */}
          <GlassCard className="p-6" delay={0.4}>
            <h3 className="text-lg font-semibold mb-4">本周数据</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Bar dataKey="visitors" name="访客数" fill="hsl(215, 80%, 45%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="borrows" name="借阅数" fill="hsl(38, 90%, 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Top Books */}
          <GlassCard className="p-6" delay={0.5}>
            <h3 className="text-lg font-semibold mb-4">热门图书排行</h3>
            <div className="space-y-4">
              {topBooks.map((book, index) => (
                <motion.div
                  key={book.rank}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    book.rank === 1 ? "bg-library-gold/20 text-library-gold" :
                    book.rank === 2 ? "bg-muted text-muted-foreground" :
                    book.rank === 3 ? "bg-library-teal/20 text-library-teal" :
                    "bg-muted/50 text-muted-foreground"
                  }`}>
                    {book.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{book.count}</p>
                    <p className="text-xs text-muted-foreground">次借阅</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Analytics;
