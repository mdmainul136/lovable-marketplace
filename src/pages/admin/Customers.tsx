import { useState } from "react";
import { 
  Search, 
  MoreHorizontal, 
  Eye,
  Filter,
  Download,
  Mail,
  Ban,
  UserCheck,
  Shield
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data
const mockCustomers = [
  { 
    id: "1", 
    name: "Ahmed Rahman",
    email: "ahmed.rahman@example.com",
    phone: "+880 1712-345678",
    orders: 12,
    totalSpent: 45600,
    status: "active",
    joinedAt: "2023-06-15"
  },
  { 
    id: "2", 
    name: "Fatima Begum",
    email: "fatima.begum@example.com",
    phone: "+880 1812-456789",
    orders: 8,
    totalSpent: 28900,
    status: "active",
    joinedAt: "2023-08-22"
  },
  { 
    id: "3", 
    name: "Karim Uddin",
    email: "karim.uddin@example.com",
    phone: "+880 1912-567890",
    orders: 3,
    totalSpent: 12500,
    status: "active",
    joinedAt: "2023-11-10"
  },
  { 
    id: "4", 
    name: "Nasrin Akter",
    email: "nasrin.akter@example.com",
    phone: "+880 1612-678901",
    orders: 15,
    totalSpent: 67800,
    status: "vip",
    joinedAt: "2023-02-05"
  },
  { 
    id: "5", 
    name: "Rafiq Islam",
    email: "rafiq.islam@example.com",
    phone: "+880 1512-789012",
    orders: 0,
    totalSpent: 0,
    status: "inactive",
    joinedAt: "2024-01-02"
  },
  { 
    id: "6", 
    name: "Sumaiya Khan",
    email: "sumaiya.khan@example.com",
    phone: "+880 1412-890123",
    orders: 6,
    totalSpent: 23400,
    status: "active",
    joinedAt: "2023-09-18"
  },
  { 
    id: "7", 
    name: "Hasan Ali",
    email: "hasan.ali@example.com",
    phone: "+880 1312-901234",
    orders: 1,
    totalSpent: 4500,
    status: "blocked",
    joinedAt: "2023-12-01"
  },
  { 
    id: "8", 
    name: "Ruma Begum",
    email: "ruma.begum@example.com",
    phone: "+880 1712-012345",
    orders: 22,
    totalSpent: 89000,
    status: "vip",
    joinedAt: "2022-11-20"
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { 
    label: "Active", 
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
  },
  inactive: { 
    label: "Inactive", 
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" 
  },
  vip: { 
    label: "VIP", 
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" 
  },
  blocked: { 
    label: "Blocked", 
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
  },
};

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer base and relationships
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Customers
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Customers</div>
            <div className="text-2xl font-bold">2,890</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Active Customers</div>
            <div className="text-2xl font-bold">2,456</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">VIP Customers</div>
            <div className="text-2xl font-bold">124</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">New This Month</div>
            <div className="text-2xl font-bold">89</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            {filteredCustomers.length} customers found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-center">Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.phone}</TableCell>
                  <TableCell className="text-center">{customer.orders}</TableCell>
                  <TableCell className="text-right font-medium">
                    ৳{customer.totalSpent.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusConfig[customer.status].className}>
                      {statusConfig[customer.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.joinedAt}</TableCell>
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
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Make VIP
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {customer.status === "blocked" ? (
                          <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Unblock
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="mr-2 h-4 w-4" />
                            Block Customer
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
