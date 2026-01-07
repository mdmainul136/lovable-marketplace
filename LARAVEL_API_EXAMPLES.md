# Laravel Backend API Examples

This document provides complete Laravel code examples for the admin dashboard API endpoints.

## Setup

```bash
# Install Laravel Sanctum for API authentication
php artisan install:api

# Create models and migrations
php artisan make:model Product -mrc
php artisan make:model Order -mrc
php artisan make:model Customer -mrc
```

## Routes (routes/api.php)

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Auth\AuthController;

// Auth routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    
    // Admin routes (add admin middleware as needed)
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/analytics', [DashboardController::class, 'analytics']);
        
        // Products
        Route::apiResource('products', ProductController::class);
        Route::post('/products/bulk-delete', [ProductController::class, 'bulkDelete']);
        
        // Orders
        Route::apiResource('orders', OrderController::class)->only(['index', 'show']);
        Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);
        Route::patch('/orders/{order}/cancel', [OrderController::class, 'cancel']);
        
        // Customers
        Route::apiResource('customers', CustomerController::class)->only(['index', 'show']);
        Route::patch('/customers/{customer}/status', [CustomerController::class, 'updateStatus']);
        Route::patch('/customers/{customer}/block', [CustomerController::class, 'block']);
        Route::patch('/customers/{customer}/unblock', [CustomerController::class, 'unblock']);
    });
});
```

## Models

### Product Model (app/Models/Product.php)

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sku',
        'price',
        'stock',
        'category',
        'status',
        'image',
        'description',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    // Auto-calculate status based on stock
    public function getStatusAttribute($value)
    {
        if ($this->stock <= 0) return 'out_of_stock';
        if ($this->stock < 20) return 'low_stock';
        return $value ?? 'active';
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('sku', 'like', "%{$search}%");
        });
    }
}
```

### Order Model (app/Models/Order.php)

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'status',
        'payment_status',
        'total',
        'shipping_address',
    ];

    protected $casts = [
        'total' => 'decimal:2',
        'shipping_address' => 'array',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getItemsCountAttribute()
    {
        return $this->items()->sum('quantity');
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
```

### Customer Model (app/Models/Customer.php)

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function getOrdersCountAttribute()
    {
        return $this->orders()->count();
    }

    public function getTotalSpentAttribute()
    {
        return $this->orders()->where('status', '!=', 'cancelled')->sum('total');
    }
}
```

## Controllers

### Dashboard Controller (app/Http/Controllers/Admin/DashboardController.php)

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $now = Carbon::now();
        $lastMonth = Carbon::now()->subMonth();

        // Calculate stats
        $currentRevenue = Order::where('status', '!=', 'cancelled')
            ->whereMonth('created_at', $now->month)
            ->sum('total');
        
        $lastMonthRevenue = Order::where('status', '!=', 'cancelled')
            ->whereMonth('created_at', $lastMonth->month)
            ->sum('total');
        
        $revenueChange = $lastMonthRevenue > 0 
            ? round((($currentRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100, 1)
            : 0;

        $currentOrders = Order::whereMonth('created_at', $now->month)->count();
        $lastMonthOrders = Order::whereMonth('created_at', $lastMonth->month)->count();
        $ordersChange = $lastMonthOrders > 0 
            ? round((($currentOrders - $lastMonthOrders) / $lastMonthOrders) * 100, 1)
            : 0;

        $totalProducts = Product::count();
        $newProductsThisWeek = Product::where('created_at', '>=', $now->startOfWeek())->count();

        $totalCustomers = Customer::count();
        $currentCustomers = Customer::whereMonth('created_at', $now->month)->count();
        $lastMonthCustomers = Customer::whereMonth('created_at', $lastMonth->month)->count();
        $customersChange = $lastMonthCustomers > 0
            ? round((($currentCustomers - $lastMonthCustomers) / $lastMonthCustomers) * 100, 1)
            : 0;

        // Revenue data for chart
        $revenueData = Order::selectRaw('MONTH(created_at) as month, SUM(total) as revenue, COUNT(*) as orders')
            ->where('status', '!=', 'cancelled')
            ->whereYear('created_at', $now->year)
            ->groupByRaw('MONTH(created_at)')
            ->get()
            ->map(fn($item) => [
                'month' => Carbon::create()->month($item->month)->format('M'),
                'revenue' => (float) $item->revenue,
                'orders' => $item->orders,
            ]);

        // Category distribution
        $categoryData = Product::selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->get();
        
        $total = $categoryData->sum('count');
        $colors = ['hsl(var(--primary))', 'hsl(210, 70%, 60%)', 'hsl(150, 60%, 50%)', 'hsl(45, 80%, 55%)'];
        
        $categoryData = $categoryData->map(fn($item, $index) => [
            'name' => $item->category,
            'value' => round(($item->count / $total) * 100),
            'color' => $colors[$index % count($colors)],
        ]);

        // Recent orders
        $recentOrders = Order::with('customer')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($order) => [
                'id' => 'ORD' . str_pad($order->id, 3, '0', STR_PAD_LEFT),
                'customer' => $order->customer->name,
                'amount' => (float) $order->total,
                'status' => $order->status,
                'date' => $order->created_at->diffForHumans(),
            ]);

        // Top products
        $topProducts = Product::withCount(['orderItems as sales' => function ($query) {
                $query->select(\DB::raw('COALESCE(SUM(quantity), 0)'));
            }])
            ->withSum('orderItems as revenue', 'total')
            ->orderByDesc('sales')
            ->take(5)
            ->get()
            ->map(fn($product) => [
                'id' => (string) $product->id,
                'name' => $product->name,
                'sales' => (int) $product->sales,
                'revenue' => (float) $product->revenue ?? 0,
            ]);

        return response()->json([
            'stats' => [
                'totalRevenue' => (float) $currentRevenue,
                'revenueChange' => $revenueChange,
                'totalOrders' => Order::count(),
                'ordersChange' => $ordersChange,
                'totalProducts' => $totalProducts,
                'newProductsThisWeek' => $newProductsThisWeek,
                'totalCustomers' => $totalCustomers,
                'customersChange' => $customersChange,
            ],
            'revenueData' => $revenueData,
            'categoryData' => $categoryData,
            'recentOrders' => $recentOrders,
            'topProducts' => $topProducts,
        ]);
    }

    public function analytics(Request $request)
    {
        // Similar implementation for detailed analytics
        return response()->json([
            'revenue' => [],
            'dailySales' => [],
            'categoryDistribution' => [],
            'topProducts' => [],
        ]);
    }
}
```

### Product Controller (app/Http/Controllers/Admin/ProductController.php)

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($search = $request->get('search')) {
            $query->search($search);
        }

        if ($category = $request->get('category')) {
            $query->where('category', $category);
        }

        if ($status = $request->get('status')) {
            $query->where('status', $status);
        }

        $products = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'data' => $products->items(),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'sku' => 'sometimes|string|unique:products,sku,' . $product->id,
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'category' => 'sometimes|string',
            'status' => 'sometimes|in:active,draft',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(null, 204);
    }

    public function bulkDelete(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:products,id',
        ]);

        Product::whereIn('id', $validated['ids'])->delete();

        return response()->json(null, 204);
    }
}
```

### Order Controller (app/Http/Controllers/Admin/OrderController.php)

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('customer');

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhereHas('customer', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        if ($status = $request->get('status')) {
            $query->where('status', $status);
        }

        $orders = $query->latest()->paginate($request->get('per_page', 15));

        // Calculate stats
        $stats = [
            'all' => Order::count(),
            'pending' => Order::where('status', 'pending')->count(),
            'processing' => Order::where('status', 'processing')->count(),
            'shipped' => Order::where('status', 'shipped')->count(),
            'delivered' => Order::where('status', 'delivered')->count(),
            'cancelled' => Order::where('status', 'cancelled')->count(),
        ];

        return response()->json([
            'data' => $orders->items()->map(fn($order) => [
                'id' => 'ORD-' . str_pad($order->id, 3, '0', STR_PAD_LEFT),
                'customer' => $order->customer->name,
                'email' => $order->customer->email,
                'items' => $order->items_count,
                'total' => (float) $order->total,
                'status' => $order->status,
                'paymentStatus' => $order->payment_status,
                'date' => $order->created_at->format('Y-m-d h:i A'),
            ]),
            'meta' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ],
            'stats' => $stats,
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['customer', 'items.product']);
        
        return response()->json([
            'id' => 'ORD-' . str_pad($order->id, 3, '0', STR_PAD_LEFT),
            'customer' => $order->customer->name,
            'email' => $order->customer->email,
            'items' => $order->items_count,
            'total' => (float) $order->total,
            'status' => $order->status,
            'paymentStatus' => $order->payment_status,
            'date' => $order->created_at->format('Y-m-d h:i A'),
            'shippingAddress' => $order->shipping_address,
            'orderItems' => $order->items->map(fn($item) => [
                'product' => $item->product->name,
                'quantity' => $item->quantity,
                'price' => (float) $item->price,
            ]),
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,processing,shipped,delivered',
        ]);

        $order->update($validated);

        return response()->json($order);
    }

    public function cancel(Order $order)
    {
        $order->update([
            'status' => 'cancelled',
            'payment_status' => $order->payment_status === 'paid' ? 'refunded' : $order->payment_status,
        ]);

        return response()->json(null, 204);
    }
}
```

### Customer Controller (app/Http/Controllers/Admin/CustomerController.php)

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = Customer::query();

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($status = $request->get('status')) {
            $query->where('status', $status);
        }

        $customers = $query->paginate($request->get('per_page', 15));

        // Calculate stats
        $now = Carbon::now();
        $stats = [
            'total' => Customer::count(),
            'active' => Customer::where('status', 'active')->count(),
            'vip' => Customer::where('status', 'vip')->count(),
            'newThisMonth' => Customer::whereMonth('created_at', $now->month)->count(),
        ];

        return response()->json([
            'data' => $customers->items()->map(fn($customer) => [
                'id' => (string) $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'orders' => $customer->orders_count,
                'totalSpent' => (float) $customer->total_spent,
                'status' => $customer->status,
                'joinedAt' => $customer->created_at->format('Y-m-d'),
            ]),
            'meta' => [
                'current_page' => $customers->currentPage(),
                'last_page' => $customers->lastPage(),
                'per_page' => $customers->perPage(),
                'total' => $customers->total(),
            ],
            'stats' => $stats,
        ]);
    }

    public function show(Customer $customer)
    {
        return response()->json([
            'id' => (string) $customer->id,
            'name' => $customer->name,
            'email' => $customer->email,
            'phone' => $customer->phone,
            'orders' => $customer->orders_count,
            'totalSpent' => (float) $customer->total_spent,
            'status' => $customer->status,
            'joinedAt' => $customer->created_at->format('Y-m-d'),
        ]);
    }

    public function updateStatus(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'status' => 'required|in:active,inactive,vip',
        ]);

        $customer->update($validated);

        return response()->json($customer);
    }

    public function block(Customer $customer)
    {
        $customer->update(['status' => 'blocked']);

        return response()->json(null, 204);
    }

    public function unblock(Customer $customer)
    {
        $customer->update(['status' => 'active']);

        return response()->json(null, 204);
    }
}
```

## Migrations

### Products Migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sku')->unique();
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(0);
            $table->string('category');
            $table->enum('status', ['active', 'draft', 'low_stock', 'out_of_stock'])->default('active');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

### Orders Migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
            $table->decimal('total', 12, 2);
            $table->json('shipping_address')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
```

### Customers Migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->enum('status', ['active', 'inactive', 'vip', 'blocked'])->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
```

## CORS Configuration (config/cors.php)

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

## Environment Variables (.env)

```env
# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Sanctum stateful domains
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

## Running the API

```bash
# Run migrations
php artisan migrate

# Seed sample data (create seeders as needed)
php artisan db:seed

# Start the server
php artisan serve
```

Your React frontend will now connect to `http://localhost:8000/api` and fetch real data from Laravel!
