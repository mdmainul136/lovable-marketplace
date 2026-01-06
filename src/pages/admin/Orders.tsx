import { useState } from "react";
import { 
  Search, 
  MoreHorizontal, 
  Eye,
  Filter,
  Download,
  Truck,
  XCircle,
  CheckCircle,
  Clock,
  Package
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const mockOrders = [
  { 
    id: "ORD-001", 
    customer: "Ahmed Rahman",
    email: "ahmed@example.com",
    items: 3,
    total: 12500,
    status: "pending",
    paymentStatus: "paid",
    date: "2024-01-15 10:30 AM"
  },
  { 
    id: "ORD-002", 
    customer: "Fatima Begum",
    email: "fatima@example.com",
    items: 1,
    total: 4500,
    status: "processing",
    paymentStatus: "paid",
    date: "2024-01-15 09:15 AM"
  },
  { 
    id: "ORD-003", 
    customer: "Karim Uddin",
    email: "karim@example.com",
    items: 5,
    total: 28000,
    status: "shipped",
    paymentStatus: "paid",
    date: "2024-01-14 04:45 PM"
  },
  { 
    id: "ORD-004", 
    customer: "Nasrin Akter",
    email: "nasrin@example.com",
    items: 2,
    total: 6800,
    status: "delivered",
    paymentStatus: "paid",
    date: "2024-01-14 02:30 PM"
  },
  { 
    id: "ORD-005", 
    customer: "Rafiq Islam",
    email: "rafiq@example.com",
    items: 1,
    total: 2200,
    status: "cancelled",
    paymentStatus: "refunded",
    date: "2024-01-13 11:20 AM"
  },
  { 
    id: "ORD-006", 
    customer: "Sumaiya Khan",
    email: "sumaiya@example.com",
    items: 4,
    total: 15600,
    status: "confirmed",
    paymentStatus: "pending",
    date: "2024-01-13 09:00 AM"
  },
  { 
    id: "ORD-007", 
    customer: "Hasan Ali",
    email: "hasan@example.com",
    items: 2,
    total: 8900,
    status: "processing",
    paymentStatus: "paid",
    date: "2024-01-12 03:15 PM"
  },
  { 
    id: "ORD-008", 
    customer: "Ruma Begum",
    email: "ruma@example.com",
    items: 6,
    total: 34500,
    status: "delivered",
    paymentStatus: "paid",
    date: "2024-01-12 01:00 PM"
  },
];

const orderStatusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  pending: { 
    label: "Pending", 
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: Clock
  },
  confirmed: { 
    label: "Confirmed", 
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: CheckCircle
  },
  processing: { 
    label: "Processing", 
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    icon: Package
  },
  shipped: { 
    label: "Shipped", 
    className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    icon: Truck
  },
  delivered: { 
    label: "Delivered", 
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: CheckCircle
  },
  cancelled: { 
    label: "Cancelled", 
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: XCircle
  },
};

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
  paid: { 
    label: "Paid", 
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
  },
  pending: { 
    label: "Pending", 
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" 
  },
  refunded: { 
    label: "Refunded", 
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" 
  },
  failed: { 
    label: "Failed", 
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
  },
};

const orderStats = [
  { label: "All Orders", value: "all", count: 156 },
  { label: "Pending", value: "pending", count: 12 },
  { label: "Processing", value: "processing", count: 8 },
  { label: "Shipped", value: "shipped", count: 15 },
  { label: "Delivered", value: "delivered", count: 112 },
  { label: "Cancelled", value: "cancelled", count: 9 },
];

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track customer orders
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Orders
        </Button>
      </div>

      {/* Status Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          {orderStats.map((stat) => (
            <TabsTrigger 
              key={stat.value} 
              value={stat.value}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {stat.label}
              <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                {stat.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle>Order List</CardTitle>
          <CardDescription>
            {filteredOrders.length} orders found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const StatusIcon = orderStatusConfig[order.status].icon;
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{order.items}</TableCell>
                    <TableCell className="text-right font-medium">
                      ৳{order.total.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={orderStatusConfig[order.status].className}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {orderStatusConfig[order.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={paymentStatusConfig[order.paymentStatus].className}>
                        {paymentStatusConfig[order.paymentStatus].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
