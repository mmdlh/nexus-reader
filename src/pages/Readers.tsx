import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  UserPlus,
  Users,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  MoreVertical,
  Shield,
  Star
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const readers = [
  { id: "R2024001", name: "张三", email: "zhangsan@example.com", phone: "138****1234", type: "普通会员", borrowCount: 12, registerDate: "2024-01-01", status: "正常", avatar: "张" },
  { id: "R2024002", name: "李四", email: "lisi@example.com", phone: "139****5678", type: "VIP会员", borrowCount: 45, registerDate: "2023-06-15", status: "正常", avatar: "李" },
  { id: "R2024003", name: "王五", email: "wangwu@example.com", phone: "137****9012", type: "普通会员", borrowCount: 8, registerDate: "2024-02-01", status: "正常", avatar: "王" },
  { id: "R2024004", name: "赵六", email: "zhaoliu@example.com", phone: "136****3456", type: "教职工", borrowCount: 67, registerDate: "2022-09-01", status: "正常", avatar: "赵" },
  { id: "R2024005", name: "钱七", email: "qianqi@example.com", phone: "135****7890", type: "学生", borrowCount: 23, registerDate: "2023-09-01", status: "冻结", avatar: "钱" },
  { id: "R2024006", name: "孙八", email: "sunba@example.com", phone: "134****1122", type: "VIP会员", borrowCount: 89, registerDate: "2021-03-20", status: "正常", avatar: "孙" },
];

const readerTypes = ["全部", "普通会员", "VIP会员", "教职工", "学生"];

const Readers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("全部");

  const filteredReaders = readers.filter(reader => {
    const matchesType = selectedType === "全部" || reader.type === selectedType;
    const matchesSearch = reader.name.includes(searchQuery) || 
                         reader.id.includes(searchQuery) ||
                         reader.email.includes(searchQuery);
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "VIP会员": return "bg-library-gold/10 text-library-gold border-library-gold/30";
      case "教职工": return "bg-primary/10 text-primary border-primary/30";
      case "学生": return "bg-library-teal/10 text-library-teal border-library-teal/30";
      default: return "bg-muted text-muted-foreground border-border";
    }
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
            <h2 className="text-2xl font-bold text-foreground">读者管理</h2>
            <p className="text-muted-foreground">管理读者信息、会员等级和借阅权限</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg">
            <UserPlus className="w-4 h-4 mr-2" />
            新增读者
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "注册读者", value: "15,832", icon: Users, color: "primary" },
            { label: "VIP会员", value: "2,156", icon: Star, color: "gold" },
            { label: "教职工", value: "892", icon: Shield, color: "teal" },
            { label: "本月新增", value: "234", icon: UserPlus, color: "emerald" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-4" hover>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${
                    stat.color === 'primary' ? 'bg-primary/10' :
                    stat.color === 'gold' ? 'bg-library-gold/10' :
                    stat.color === 'teal' ? 'bg-library-teal/10' :
                    'bg-library-emerald/10'
                  }`}>
                    <stat.icon className={`w-6 h-6 ${
                      stat.color === 'primary' ? 'text-primary' :
                      stat.color === 'gold' ? 'text-library-gold' :
                      stat.color === 'teal' ? 'text-library-teal' :
                      'text-library-emerald'
                    }`} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <GlassCard className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索读者姓名、ID、邮箱..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {readerTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedType === type
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Readers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReaders.map((reader, index) => (
            <motion.div
              key={reader.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6 group" hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-lg font-bold">
                        {reader.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{reader.name}</h3>
                      <p className="text-sm text-muted-foreground">{reader.id}</p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>查看详情</DropdownMenuItem>
                      <DropdownMenuItem>编辑信息</DropdownMenuItem>
                      <DropdownMenuItem>借阅记录</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">冻结账户</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{reader.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{reader.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>注册于 {reader.registerDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(reader.type)}`}>
                      {reader.type}
                    </span>
                    {reader.status === "冻结" && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive border border-destructive/30">
                        已冻结
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="font-medium">{reader.borrowCount}</span>
                    <span className="text-muted-foreground">本</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Readers;
