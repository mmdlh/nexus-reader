import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUpDown,
  RefreshCw,
  X
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const borrowRecords = [
  { id: 1, book: "人工智能：现代方法", reader: "张三", readerId: "R2024001", borrowDate: "2024-01-15", dueDate: "2024-02-15", status: "借阅中", overdue: false },
  { id: 2, book: "设计心理学", reader: "李四", readerId: "R2024002", borrowDate: "2024-01-10", dueDate: "2024-02-10", status: "已逾期", overdue: true },
  { id: 3, book: "时间简史", reader: "王五", readerId: "R2024003", borrowDate: "2024-01-20", dueDate: "2024-02-20", status: "借阅中", overdue: false },
  { id: 4, book: "算法导论", reader: "赵六", readerId: "R2024004", borrowDate: "2024-01-05", dueDate: "2024-02-05", status: "已归还", overdue: false, returnDate: "2024-02-03" },
  { id: 5, book: "三体", reader: "钱七", readerId: "R2024005", borrowDate: "2024-01-18", dueDate: "2024-02-18", status: "借阅中", overdue: false },
];

const reservations = [
  { id: 1, book: "深入理解计算机系统", reader: "张三", readerId: "R2024001", reserveDate: "2024-02-01", status: "等待中", position: 2 },
  { id: 2, book: "JavaScript高级程序设计", reader: "李四", readerId: "R2024002", reserveDate: "2024-02-03", status: "可取书", position: 1 },
  { id: 3, book: "Python编程从入门到实践", reader: "王五", readerId: "R2024003", reserveDate: "2024-02-05", status: "等待中", position: 3 },
];

const Borrow = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const stats = {
    total: borrowRecords.length,
    active: borrowRecords.filter(r => r.status === "借阅中").length,
    overdue: borrowRecords.filter(r => r.overdue).length,
    returned: borrowRecords.filter(r => r.status === "已归还").length,
  };

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
            <h2 className="text-2xl font-bold text-foreground">借阅管理</h2>
            <p className="text-muted-foreground">管理图书借阅、归还和预约记录</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <BookOpen className="w-4 h-4 mr-2" />
              新建借阅
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <RefreshCw className="w-4 h-4 mr-2" />
              办理归还
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "总借阅记录", value: stats.total, icon: BookOpen, color: "primary" },
            { label: "当前借阅中", value: stats.active, icon: Clock, color: "teal" },
            { label: "逾期未还", value: stats.overdue, icon: AlertTriangle, color: "destructive" },
            { label: "已归还", value: stats.returned, icon: CheckCircle, color: "emerald" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-4" hover>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    stat.color === 'primary' ? 'bg-primary/10' :
                    stat.color === 'teal' ? 'bg-library-teal/10' :
                    stat.color === 'destructive' ? 'bg-destructive/10' :
                    'bg-library-emerald/10'
                  }`}>
                    <stat.icon className={`w-5 h-5 ${
                      stat.color === 'primary' ? 'text-primary' :
                      stat.color === 'teal' ? 'text-library-teal' :
                      stat.color === 'destructive' ? 'text-destructive' :
                      'text-library-emerald'
                    }`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <GlassCard className="p-6">
          <Tabs defaultValue="borrow" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="borrow" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  借阅记录
                </TabsTrigger>
                <TabsTrigger value="reserve" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  预约管理
                </TabsTrigger>
              </TabsList>
              
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索读者、图书名称..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            <TabsContent value="borrow" className="mt-0">
              {/* Filter Tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {[
                  { key: "all", label: "全部", count: stats.total },
                  { key: "active", label: "借阅中", count: stats.active },
                  { key: "overdue", label: "已逾期", count: stats.overdue },
                  { key: "returned", label: "已归还", count: stats.returned },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.key
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {tab.label}
                    <span className="ml-2 px-1.5 py-0.5 rounded-full bg-white/20 text-xs">{tab.count}</span>
                  </button>
                ))}
              </div>

              {/* Records List */}
              <div className="space-y-3">
                {borrowRecords.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${
                      record.overdue 
                        ? "border-destructive/30 bg-destructive/5" 
                        : "border-border/50 bg-muted/20 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3 md:mb-0">
                      <div className={`p-3 rounded-xl ${
                        record.overdue ? "bg-destructive/10" : "bg-primary/10"
                      }`}>
                        <BookOpen className={`w-5 h-5 ${
                          record.overdue ? "text-destructive" : "text-primary"
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{record.book}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.reader} · {record.readerId}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6">
                      <div className="text-sm">
                        <p className="text-muted-foreground">借阅日期</p>
                        <p className="font-medium">{record.borrowDate}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">应还日期</p>
                        <p className={`font-medium ${record.overdue ? "text-destructive" : ""}`}>{record.dueDate}</p>
                      </div>
                      
                      <Badge variant={
                        record.status === "已归还" ? "secondary" :
                        record.overdue ? "destructive" : "default"
                      } className={
                        record.status === "借阅中" && !record.overdue 
                          ? "bg-library-teal/10 text-library-teal border-library-teal/30" 
                          : ""
                      }>
                        {record.status}
                      </Badge>
                      
                      <div className="flex gap-2">
                        {record.status !== "已归还" && (
                          <Button size="sm" variant="outline" className="text-xs">
                            办理归还
                          </Button>
                        )}
                        {record.overdue && (
                          <Button size="sm" variant="outline" className="text-xs text-destructive border-destructive/30">
                            催还通知
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reserve" className="mt-0">
              <div className="space-y-3">
                {reservations.map((reservation, index) => (
                  <motion.div
                    key={reservation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${
                      reservation.status === "可取书"
                        ? "border-library-emerald/30 bg-library-emerald/5"
                        : "border-border/50 bg-muted/20"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3 md:mb-0">
                      <div className={`p-3 rounded-xl ${
                        reservation.status === "可取书" ? "bg-library-emerald/10" : "bg-library-gold/10"
                      }`}>
                        <Clock className={`w-5 h-5 ${
                          reservation.status === "可取书" ? "text-library-emerald" : "text-library-gold"
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{reservation.book}</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.reader} · {reservation.readerId}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6">
                      <div className="text-sm">
                        <p className="text-muted-foreground">预约日期</p>
                        <p className="font-medium">{reservation.reserveDate}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">排队位置</p>
                        <p className="font-medium">第 {reservation.position} 位</p>
                      </div>
                      
                      <Badge className={
                        reservation.status === "可取书"
                          ? "bg-library-emerald/10 text-library-emerald border-library-emerald/30"
                          : "bg-library-gold/10 text-library-gold border-library-gold/30"
                      }>
                        {reservation.status}
                      </Badge>
                      
                      <div className="flex gap-2">
                        {reservation.status === "可取书" && (
                          <Button size="sm" className="text-xs bg-library-emerald hover:bg-library-emerald/90">
                            确认取书
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-xs text-destructive">
                          <X className="w-3 h-3 mr-1" />
                          取消预约
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </motion.div>
    </MainLayout>
  );
};

export default Borrow;
