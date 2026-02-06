import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Palette,
  Users,
  Mail,
  Globe,
  Clock,
  Save,
  RefreshCw
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    overdue: true,
    newBooks: true,
  });

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
            <h2 className="text-2xl font-bold text-foreground">系统设置</h2>
            <p className="text-muted-foreground">配置系统参数、通知和安全设置</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              重置默认
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <Save className="w-4 h-4 mr-2" />
              保存设置
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <GlassCard className="p-4">
              <nav className="space-y-1">
                {[
                  { icon: SettingsIcon, label: "基本设置", active: true },
                  { icon: Bell, label: "通知设置", active: false },
                  { icon: Shield, label: "安全设置", active: false },
                  { icon: Database, label: "数据管理", active: false },
                  { icon: Palette, label: "界面设置", active: false },
                  { icon: Users, label: "权限管理", active: false },
                ].map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      item.active
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </GlassCard>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="mb-6 bg-muted/50">
                <TabsTrigger value="basic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  基本设置
                </TabsTrigger>
                <TabsTrigger value="notification" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  通知设置
                </TabsTrigger>
                <TabsTrigger value="borrow" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  借阅规则
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-6">图书馆基本信息</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="libName">图书馆名称</Label>
                      <Input id="libName" defaultValue="智能图书馆" className="bg-background/50" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="libCode">图书馆代码</Label>
                      <Input id="libCode" defaultValue="LIB-2024-001" className="bg-background/50" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">联系邮箱</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="email" defaultValue="library@example.com" className="pl-10 bg-background/50" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">官方网站</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="website" defaultValue="https://library.example.com" className="pl-10 bg-background/50" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">图书馆地址</Label>
                      <Input id="address" defaultValue="北京市海淀区学院路XX号" className="bg-background/50" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>开放时间</Label>
                      <div className="flex gap-2 items-center">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <Select defaultValue="8:00">
                          <SelectTrigger className="w-28 bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8:00">08:00</SelectItem>
                            <SelectItem value="9:00">09:00</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-muted-foreground">至</span>
                        <Select defaultValue="22:00">
                          <SelectTrigger className="w-28 bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="21:00">21:00</SelectItem>
                            <SelectItem value="22:00">22:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>时区设置</Label>
                      <Select defaultValue="asia-shanghai">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia-shanghai">Asia/Shanghai (UTC+8)</SelectItem>
                          <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </GlassCard>
              </TabsContent>

              <TabsContent value="notification">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-6">通知偏好设置</h3>
                  
                  <div className="space-y-6">
                    {[
                      { key: "email", label: "邮件通知", desc: "通过邮件接收系统通知和提醒" },
                      { key: "sms", label: "短信通知", desc: "通过短信接收重要通知（可能产生费用）" },
                      { key: "overdue", label: "逾期提醒", desc: "在图书即将逾期时发送提醒" },
                      { key: "newBooks", label: "新书推荐", desc: "接收新书入库和推荐通知" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, [item.key]: checked }))
                          }
                        />
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </TabsContent>

              <TabsContent value="borrow">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-6">借阅规则配置</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>普通会员借阅上限</Label>
                      <Select defaultValue="5">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[3, 5, 8, 10].map(n => (
                            <SelectItem key={n} value={n.toString()}>{n} 本</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>VIP会员借阅上限</Label>
                      <Select defaultValue="10">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[8, 10, 15, 20].map(n => (
                            <SelectItem key={n} value={n.toString()}>{n} 本</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>借阅期限（天）</Label>
                      <Select defaultValue="30">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[14, 21, 30, 60].map(n => (
                            <SelectItem key={n} value={n.toString()}>{n} 天</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>续借次数上限</Label>
                      <Select defaultValue="2">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3].map(n => (
                            <SelectItem key={n} value={n.toString()}>{n} 次</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>逾期罚款（元/天）</Label>
                      <Input type="number" defaultValue="0.5" className="bg-background/50" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>预约保留天数</Label>
                      <Select defaultValue="3">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[2, 3, 5, 7].map(n => (
                            <SelectItem key={n} value={n.toString()}>{n} 天</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </GlassCard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Settings;
