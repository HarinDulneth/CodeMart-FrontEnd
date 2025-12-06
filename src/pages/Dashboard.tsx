import { useState } from "react";
import { DashboardSidebar, TabId } from "@/components/dashboard/DashboardSidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { TransactionRow } from "@/components/dashboard/TransactionRow";
import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Heart, 
  ShoppingCart,
  TrendingUp,
  Plus,
  Bell,
  Mail,
  Shield
} from "lucide-react";
import { toast } from "sonner";
import {
  currentUser,
  sellingProjects,
  boughtProjects,
  wishlistProjects,
  cartItems,
  transactions,
  dashboardStats,
} from "@/data/dummyData";
import { getCurrentUser } from "@/services/api";
import Cart from "./Cart";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const handleRemoveFromWishlist = (projectId: number) => {
    toast.success("Removed from wishlist");
  };

  const handleRemoveFromCart = (projectId: number) => {
    toast.success("Removed from cart");
  };

  const handleAddToCart = (projectId: number) => {
    toast.success("Added to cart!");
  };

  const handleEditProject = (projectId: number) => {
    toast.info("Opening project editor...");
  };

  const handleDeleteProject = (projectId: number) => {
    toast.error("Project deleted");
  };

  const user = getCurrentUser();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Revenue"
                value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
                subtitle="From all products"
                icon={DollarSign}
                variant="primary"
                trend={{ value: 12.5, isPositive: true }}
              />
              <StatsCard
                title="Total Sales"
                value={dashboardStats.totalSales}
                subtitle="Products sold"
                icon={ShoppingBag}
                trend={{ value: 8.2, isPositive: true }}
              />
              <StatsCard
                title="Active Products"
                value={dashboardStats.activeProjects}
                subtitle={`of ${sellingProjects.length} total`}
                icon={Package}
              />
              <StatsCard
                title="Wishlist Items"
                value={dashboardStats.wishlistCount}
                icon={Heart}
              />
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest purchases and sales</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('transactions')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {transactions.slice(0, 5).map((transaction) => (
                  <TransactionRow key={transaction.id} transaction={transaction} />
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats Row */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    Cart Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Items in cart</span>
                      <span className="font-semibold">{cartItems.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Cart total</span>
                      <span className="font-semibold text-primary">${dashboardStats.cartTotal}</span>
                    </div>
                    <Button className="w-full" onClick={() => setActiveTab('cart')}>
                      View Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Best seller</span>
                      <span className="font-semibold">E-Commerce Dashboard</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">This month</span>
                      <Badge className="bg-success/10 text-success">+$5,200</Badge>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab('revenue')}>
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'profile':
        return <ProfileSection user={user} />;

      case 'wishlist':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Wishlist</h2>
                <p className="text-muted-foreground">{wishlistProjects.length} items saved for later</p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishlistProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  type="wishlist"
                  onRemove={() => handleRemoveFromWishlist(project.id)}
                  onAddToCart={() => handleAddToCart(project.id)}
                />
              ))}
            </div>
          </div>
        );

      case 'cart':
        return (
          <Cart />
        );

      case 'transactions':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Transaction History</h2>
              <p className="text-muted-foreground">All your purchases and sales</p>
            </div>
            <Card>
              <CardContent className="pt-6">
                {transactions.map((transaction) => (
                  <TransactionRow key={transaction.id} transaction={transaction} />
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case 'bought':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Purchased Projects</h2>
              <p className="text-muted-foreground">{boughtProjects.length} projects in your library</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {boughtProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  type="bought"
                />
              ))}
            </div>
          </div>
        );

      case 'selling':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">My Products</h2>
                <p className="text-muted-foreground">{sellingProjects.length} products listed</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sellingProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  type="selling"
                  onEdit={() => handleEditProject(project.id)}
                  onDelete={() => handleDeleteProject(project.id)}
                />
              ))}
            </div>
          </div>
        );

      case 'revenue':
        return <RevenueChart />;

      case 'settings':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Settings</h2>
              <p className="text-muted-foreground">Manage your preferences and notifications</p>
            </div>
            
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sale Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone buys your product</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Newsletter</Label>
                    <p className="text-sm text-muted-foreground">Receive our weekly newsletter</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Settings
                </CardTitle>
                <CardDescription>Manage your email preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-email">Primary Email</Label>
                  <Input id="primary-email" value={currentUser.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-email">Backup Email</Label>
                  <Input id="backup-email" placeholder="Enter backup email" />
                </div>
                <Button variant="outline">Update Email Settings</Button>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Manage your privacy and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Email on Profile</Label>
                    <p className="text-sm text-muted-foreground">Display your email address publicly</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Activity Status</Label>
                    <p className="text-sm text-muted-foreground">Show when you're online</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
