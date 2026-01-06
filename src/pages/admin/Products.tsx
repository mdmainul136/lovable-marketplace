import { useState } from "react";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Download
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
import { Checkbox } from "@/components/ui/checkbox";

// Mock data - in real app this would come from API
const mockProducts = [
  { 
    id: "1", 
    name: "Wireless Earbuds Pro", 
    sku: "WEP-001", 
    price: 2500, 
    stock: 145, 
    category: "Electronics",
    status: "active",
    image: "/placeholder.svg"
  },
  { 
    id: "2", 
    name: "Smart Watch Series 5", 
    sku: "SWS-005", 
    price: 8500, 
    stock: 32, 
    category: "Electronics",
    status: "active",
    image: "/placeholder.svg"
  },
  { 
    id: "3", 
    name: "Leather Wallet Premium", 
    sku: "LWP-012", 
    price: 1800, 
    stock: 0, 
    category: "Accessories",
    status: "out_of_stock",
    image: "/placeholder.svg"
  },
  { 
    id: "4", 
    name: "Cotton T-Shirt Pack (3pcs)", 
    sku: "CTP-003", 
    price: 1200, 
    stock: 250, 
    category: "Fashion",
    status: "active",
    image: "/placeholder.svg"
  },
  { 
    id: "5", 
    name: "Bluetooth Speaker Mini", 
    sku: "BSM-007", 
    price: 3200, 
    stock: 18, 
    category: "Electronics",
    status: "low_stock",
    image: "/placeholder.svg"
  },
  { 
    id: "6", 
    name: "Running Shoes Sport", 
    sku: "RSS-022", 
    price: 4500, 
    stock: 65, 
    category: "Fashion",
    status: "active",
    image: "/placeholder.svg"
  },
  { 
    id: "7", 
    name: "Stainless Steel Water Bottle", 
    sku: "SSW-015", 
    price: 850, 
    stock: 120, 
    category: "Home",
    status: "active",
    image: "/placeholder.svg"
  },
  { 
    id: "8", 
    name: "Laptop Stand Adjustable", 
    sku: "LSA-009", 
    price: 2200, 
    stock: 8, 
    category: "Electronics",
    status: "low_stock",
    image: "/placeholder.svg"
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { 
    label: "Active", 
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
  },
  low_stock: { 
    label: "Low Stock", 
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" 
  },
  out_of_stock: { 
    label: "Out of Stock", 
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
  },
  draft: { 
    label: "Draft", 
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" 
  },
};

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and listings
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Home">Home</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Products</CardTitle>
              <CardDescription>
                {filteredProducts.length} products found
              </CardDescription>
            </div>
            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedProducts.length} selected
                </span>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProduct(product.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium line-clamp-1">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right font-medium">৳{product.price.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusConfig[product.status].className}>
                      {statusConfig[product.status].label}
                    </Badge>
                  </TableCell>
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
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
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
