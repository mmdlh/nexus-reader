import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Plus, 
  BookOpen, 
  Grid3X3, 
  List,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const books = [
  { id: 1, title: "人工智能：现代方法", author: "Stuart Russell", isbn: "978-7-115-49531-4", category: "计算机科学", location: "A区3层", copies: 5, available: 3, cover: "AI" },
  { id: 2, title: "设计心理学", author: "唐纳德·诺曼", isbn: "978-7-508-67892-1", category: "设计艺术", location: "B区2层", copies: 3, available: 0, cover: "设计" },
  { id: 3, title: "时间简史", author: "史蒂芬·霍金", isbn: "978-7-535-73278-3", category: "科普读物", location: "C区1层", copies: 8, available: 6, cover: "时间" },
  { id: 4, title: "三体", author: "刘慈欣", isbn: "978-7-229-04238-0", category: "科幻小说", location: "D区4层", copies: 12, available: 8, cover: "三体" },
  { id: 5, title: "算法导论", author: "Thomas H. Cormen", isbn: "978-7-111-40701-0", category: "计算机科学", location: "A区3层", copies: 6, available: 2, cover: "算法" },
  { id: 6, title: "经济学原理", author: "曼昆", isbn: "978-7-301-25647-8", category: "经济管理", location: "E区2层", copies: 10, available: 7, cover: "经济" },
];

const categories = ["全部", "计算机科学", "设计艺术", "科普读物", "科幻小说", "经济管理", "文学小说"];

const Books = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === "全部" || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
            <h2 className="text-2xl font-bold text-foreground">图书管理</h2>
            <p className="text-muted-foreground">管理馆藏图书，添加、编辑或删除图书信息</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
            <Plus className="w-4 h-4 mr-2" />
            新增图书
          </Button>
        </div>

        {/* Filters */}
        <GlassCard className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索图书名称、作者、ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 bg-background/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="分类筛选" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Books Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-0 overflow-hidden group" hover>
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-library-gold/20 flex items-center justify-center">
                    <div className="w-24 h-32 rounded-lg bg-gradient-to-br from-library-navy to-library-navy-light shadow-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                      <span className="text-white font-bold text-lg">{book.cover}</span>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors">
                        <Eye className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors">
                        <Edit className="w-4 h-4 text-library-gold" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">{book.category}</span>
                      <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">{book.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="text-sm">
                        <span className={book.available > 0 ? "text-library-emerald font-medium" : "text-destructive font-medium"}>
                          {book.available}
                        </span>
                        <span className="text-muted-foreground">/{book.copies} 可借</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{book.isbn}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">图书信息</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">分类</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">位置</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">ISBN</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">库存</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book, index) => (
                    <motion.tr
                      key={book.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-14 rounded bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">{book.category}</span>
                      </td>
                      <td className="p-4 text-muted-foreground">{book.location}</td>
                      <td className="p-4 text-muted-foreground text-sm">{book.isbn}</td>
                      <td className="p-4">
                        <span className={book.available > 0 ? "text-library-emerald" : "text-destructive"}>
                          {book.available}/{book.copies}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">显示 1-{filteredBooks.length} 共 {filteredBooks.length} 条记录</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Books;
