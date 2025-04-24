import { BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StatusChartProps {
  data: {
    day: string;
    value: number;
    hours?: number;
  }[];
}

const StatusChart = ({ data }: StatusChartProps) => {
  // Calculate total active hours
  const totalHours = data.reduce((sum, item) => sum + (item.hours || 0), 0);
  
  // Calculate total active days
  const activeDays = data.filter(item => item.value > 0).length;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const hours = payload[0].payload.hours || 0;
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md text-xs">
          <p className="font-medium">{label}</p>
          <p className="text-[hsl(var(--primary))]">
            {hours > 0 
              ? `Online for ${hours} ${hours === 1 ? 'hour' : 'hours'}`
              : 'Offline'}
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Color cells based on activity level
  const getActivityColor = (value: number) => {
    if (value === 0) return '#2d3035';
    if (value === 1) return '#2e5532';
    if (value === 2) return '#2b742c';
    if (value === 3) return '#39FF14';
    return '#39FF14';
  };
  
  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <h3 className="text-lg font-medium mb-2">Activity Status</h3>
      
      <div className="mb-4 grid grid-cols-2 gap-4 text-center">
        <div className="bg-black/30 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground">Total Active Hours</p>
          <p className="text-xl font-semibold">{totalHours}</p>
        </div>
        <div className="bg-black/30 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground">Active Days</p>
          <p className="text-xl font-semibold">{activeDays} / {data.length}</p>
        </div>
      </div>
      
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis 
              dataKey="day" 
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: '#6c757d' }}
              interval="preserveStartEnd"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getActivityColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 grid grid-cols-4 gap-2">
        <div className="flex items-center justify-center text-xs">
          <span className="inline-block w-3 h-3 mr-1 rounded" style={{ backgroundColor: '#2d3035' }}></span>
          <span className="text-muted-foreground">None</span>
        </div>
        <div className="flex items-center justify-center text-xs">
          <span className="inline-block w-3 h-3 mr-1 rounded" style={{ backgroundColor: '#2e5532' }}></span>
          <span className="text-muted-foreground">Low</span>
        </div>
        <div className="flex items-center justify-center text-xs">
          <span className="inline-block w-3 h-3 mr-1 rounded" style={{ backgroundColor: '#2b742c' }}></span>
          <span className="text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center justify-center text-xs">
          <span className="inline-block w-3 h-3 mr-1 rounded" style={{ backgroundColor: '#39FF14' }}></span>
          <span className="text-muted-foreground">High</span>
        </div>
      </div>
    </div>
  );
};

export default StatusChart;
