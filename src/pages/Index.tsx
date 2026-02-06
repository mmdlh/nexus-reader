import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock, 
  BookMarked,
  Award,
  Calendar,
  ArrowRight
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/ui/stat-card";
import GlassCard from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";

const recentBooks = [
  { id: 1, title: "人工智能：现代方法", author: "Stuart Russell", category: "计算机科学", status: "可借" },
  { id: 2, title: "设计心理学", author: "唐纳德·诺曼", category: "设计艺术", status: "已借出" },
  { id: 3, title: "时间简史", author: "史蒂芬·霍金", category: "科普读物", status: "可借" },
  { id: 4, title: "三体", author: "刘慈欣", category: "科幻小说", status: "可借" },
];

const activities = [
  { id: 1, action: "借阅", user: "张三", book: "Python编程从入门到实践", time: "10分钟前" },
  { id: 2, action: "归还", user: "李四", book: "JavaScript高级程序设计", time: "25分钟前" },
  { id: 3, action: "预约", user: "王五", book: "深入理解计算机系统", time: "1小时前" },
  { id: 4, action: "借阅", user: "赵六", book: "算法导论", time: "2小时前" },
];

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">欢迎使用智能图书馆管理系统</h2>
          <p className="text-muted-foreground">实时掌握图书馆运营状态，高效管理图书资源</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="馆藏图书总量"
            value="128,456"
            subtitle="本月新增 1,234 册"
            icon={BookOpen}
            trend={{ value: 5.2, isPositive: true }}
            color="primary"
          />
          <StatCard
            title="注册读者"
            value="15,832"
            subtitle="活跃用户 8,421"
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
            color="gold"
          />
          <StatCard
            title="今日借阅量"
            value="856"
            subtitle="较昨日 +128"
            icon={TrendingUp}
            trend={{ value: 17.6, isPositive: true }}
            color="teal"
          />
          <StatCard
            title="待处理归还"
            value="234"
            subtitle="逾期 45 本"
            icon={Clock}
            trend={{ value: 3.2, isPositive: false }}
            color="emerald"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Books */}
          <GlassCard className="lg:col-span-2 p-6" delay={0.2}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <BookMarked className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">最新入库图书</h3>
              </div>
              <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
                查看全部 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {recentBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author} · {book.category}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    book.status === "可借" 
                      ? "bg-library-emerald/10 text-library-emerald" 
                      : "bg-library-gold/10 text-library-gold"
                  }`}>
                    {book.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Activity Feed */}
          <GlassCard className="p-6" delay={0.3}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-library-gold/10">
                <Clock className="w-5 h-5 text-library-gold" />
              </div>
              <h3 className="text-lg font-semibold">实时动态</h3>
            </div>
            
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0"
                >
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    activity.action === "借阅" ? "bg-primary" :
                    activity.action === "归还" ? "bg-library-emerald" : "bg-library-gold"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action}了 </span>
                      <span className="font-medium">{activity.book}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Popular Categories */}
          <GlassCard className="p-6" delay={0.4}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-library-teal/10">
                <Award className="w-5 h-5 text-library-teal" />
              </div>
              <h3 className="text-lg font-semibold">热门分类借阅排行</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "计算机科学", value: 85, color: "bg-primary" },
                { name: "文学小说", value: 72, color: "bg-library-gold" },
                { name: "经济管理", value: 65, color: "bg-library-teal" },
                { name: "自然科学", value: 58, color: "bg-library-emerald" },
                { name: "艺术设计", value: 45, color: "bg-accent" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Upcoming Events */}
          <GlassCard className="p-6" delay={0.5}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-accent/10">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">近期活动安排</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { date: "2月8日", title: "新书发布会", desc: "《AI时代的教育》作者见面会", tag: "讲座" },
                { date: "2月10日", title: "读书分享会", desc: "春季读书计划启动仪式", tag: "活动" },
                { date: "2月15日", title: "系统升级", desc: "图书检索系统优化更新", tag: "通知" },
              ].map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="text-center min-w-16">
                    <p className="text-lg font-bold text-primary">{event.date.split("日")[0]}</p>
                    <p className="text-xs text-muted-foreground">2月</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{event.title}</p>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                        {event.tag}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.desc}</p>
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

export default Index;
