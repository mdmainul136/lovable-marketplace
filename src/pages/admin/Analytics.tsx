import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Package } from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 145000, orders: 320, customers: 89 },
  { month: "Feb", revenue: 152000, orders: 345, customers: 102 },
  { month: "Mar", revenue: 148000, orders: 332, customers: 95 },
  { month: "Apr", revenue: 161000, orders: 378, customers: 118 },
  { month: "May", revenue: 155000, orders: 356, customers: 105 },
  { month: "Jun", revenue: 167000, orders: 398, customers: 134 },
  { month: "Jul", revenue: 172000, orders: 415, customers: 142 },
  { month: "Aug", revenue: 178000, orders: 428, customers: 156 },
  { month: "Sep", revenue: 185000, orders: 445, customers: 168 },
  { month: "Oct", revenue: 192000, orders: 462, customers: 175 },
  { month: "Nov", revenue: 205000, orders: 498, customers: 189 },
  { month: "Dec", revenue: 245000, orders: 578, customers: 234 },
];

const dailyData = [
  { day: "Mon", sales: 12500, visitors: 1250 },
  { day: "Tue", sales: 15800, visitors: 1580 },
  { day: "Wed", sales: 14200, visitors: 1420 },
  { day: "Thu", sales: 18900, visitors: 1890 },
  { day: "Fri", sales: 22500, visitors: 2250 },
  { day: "Sat", sales: 28000, visitors: 2800 },
  { day: "Sun", sales: 19500, visitors: 1950 },
];

const categoryData = [
  { name: "Electronics", value: 35, revenue: 856000, color: "hsl(var(--primary))" },
  { name: "Fashion", value: 28, revenue: 684000, color: "hsl(var(--category-2))" },
  { name: "Home & Living", value: 20, revenue: 488000, color: "hsl(var(--category-3))" },
  { name: "Beauty", value: 12, revenue: 293000, color: "hsl(var(--category-4))" },
  { name: "Others", value: 5, revenue: 122000, color: "hsl(var(--category-5))" },
];

const topProducts = [
  { name: "Wireless Earbuds Pro", sales: 1234, revenue: 246800, growth: 12.5 },
  { name: "Smart Watch Series 5", sales: 989, revenue: 494500, growth: 8.2 },
  { name: "Leather Wallet Premium", sales: 856, revenue: 128400, growth: -2.1 },
  { name: "Cotton T-Shirt Pack", sales: 742, revenue: 89040, growth: 15.8 },
  { name: "Bluetooth Speaker Mini", sales: 628, revenue: 125600, growth: 5.3 },
];

const statsCards = [
  {
    title: "Total Revenue",
    value: "৳24,45,680",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "vs last year",
  },
  {
    title: "Total Orders",
    value: "12,340",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    description: "vs last year",
  },
  {
    title: "Total Customers",
    value: "2,890",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    description: "vs last year",
  },
  {
    title: "Avg. Order Value",
    value: "৳1,982",
    change: "-2.1%",
    trend: "down",
    icon: Package,
    description: "vs last year",
  },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your store performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="year">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className={`flex items-center text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend === "up" ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Revenue & Orders Trend</CardTitle>
          <CardDescription>Monthly revenue and order volume for the current year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `৳${value/1000}k`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue2)"
                  name="Revenue"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="orders" 
                  stroke="hsl(var(--category-3))" 
                  strokeWidth={2}
                  dot={false}
                  name="Orders"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Daily Sales */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Daily Sales</CardTitle>
            <CardDescription>Sales performance this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Category-wise revenue distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={3}
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
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <div 
                      className="h-3 w-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: cat.color }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{cat.name}</div>
                      <div className="text-xs text-muted-foreground">৳{(cat.revenue/1000).toFixed(0)}k</div>
                    </div>
                    <span className="text-sm font-medium">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Best selling products by revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">{product.sales.toLocaleString()} sales</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">৳{product.revenue.toLocaleString()}</div>
                  <div className={`text-sm flex items-center justify-end ${
                    product.growth >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {product.growth >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                    {product.growth >= 0 ? "+" : ""}{product.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
