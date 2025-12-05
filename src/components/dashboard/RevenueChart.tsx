import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const monthlyRevenue = [
  { month: 'Sep', revenue: 2400, sales: 12 },
  { month: 'Oct', revenue: 3200, sales: 18 },
  { month: 'Nov', revenue: 2800, sales: 15 },
  { month: 'Dec', revenue: 4100, sales: 24 },
  { month: 'Jan', revenue: 3600, sales: 20 },
  { month: 'Feb', revenue: 4800, sales: 28 },
  { month: 'Mar', revenue: 5200, sales: 32 },
];

const productRevenue = [
  { name: 'E-Commerce Dashboard', revenue: 7003 },
  { name: 'AI Chat Widget', revenue: 1817 },
  { name: 'Mobile Starter Kit', revenue: 2388 },
];

export function RevenueChart() {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Revenue Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Your earnings over the past 7 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(215, 16%, 47%)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(215, 16%, 47%)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(214, 32%, 91%)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: number) => [`$${value}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(221, 83%, 53%)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Product */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Product</CardTitle>
          <CardDescription>Total earnings from each of your products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productRevenue} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" horizontal={false} />
                <XAxis 
                  type="number" 
                  stroke="hsl(215, 16%, 47%)" 
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(215, 16%, 47%)" 
                  fontSize={12}
                  width={150}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(214, 32%, 91%)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: number) => [`$${value}`, 'Revenue']}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(142, 76%, 36%)" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">$5,200</p>
              <p className="text-sm text-muted-foreground mt-1">This Month</p>
              <p className="text-xs text-success mt-2">↑ 8.3% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">32</p>
              <p className="text-sm text-muted-foreground mt-1">Sales This Month</p>
              <p className="text-xs text-success mt-2">↑ 14.3% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">$162.50</p>
              <p className="text-sm text-muted-foreground mt-1">Avg. Sale Value</p>
              <p className="text-xs text-muted-foreground mt-2">-5.2% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
