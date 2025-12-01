// src/app/components/DashboardOverview.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  Users, Bot, MessageSquare, BarChart3, ArrowUp, ArrowDown, Activity, 
  Database, AlertCircle, CheckCircle2,
  Upload, Zap, Shield, Brain, ChartBar
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { 
  dashboardService, 
  TeamMembersStats,
  BotsStats,
  ConversationStats,
  SystemHealth,
  StorageUsage,
  RecentActivity
} from '@/services/dashboardService';
import { formatDistanceToNow } from 'date-fns';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
  description?: string;
}

export function DashboardOverview(): React.ReactNode {
  const [teamStats, setTeamStats] = useState<TeamMembersStats | null>(null);
  const [botStats, setBotStats] = useState<BotsStats | null>(null);
  const [conversationStats, setConversationStats] = useState<ConversationStats | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [storageUsage, setStorageUsage] = useState<StorageUsage | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel for better performance
      const [
        teamData,
        botData,
        conversationData,
        healthData,
        storageData,
        activityData
      ] = await Promise.all([
        dashboardService.getTeamMembersStats(),
        dashboardService.getBotsStats(),
        dashboardService.getConversationStats(),
        dashboardService.getSystemHealth(),
        dashboardService.getStorageUsage(),
        dashboardService.getRecentActivity()
      ]);

      setTeamStats(teamData);
      setBotStats(botData);
      setConversationStats(conversationData);
      setSystemHealth(healthData);
      setStorageUsage(storageData);
      setRecentActivity(activityData);
      
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !teamStats || !botStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">{error || 'Failed to load dashboard'}</p>
          <button
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  // Calculate trends and changes
  const calculateTrend = (current: number, previous: number): { change: string; trend: 'up' | 'down' } => {
    if (previous === 0) return { change: '+100%', trend: 'up' };
    const change = ((current - previous) / previous) * 100;
    const trendValue: 'up' | 'down' = change >= 0 ? 'up' : 'down';
    return {
      change: `${change >= 0 ? '+' : ''}${Math.abs(Math.round(change))}%`,
      trend: trendValue
    };
  };

  // Main stats cards
  const mainStats: StatCard[] = [
    {
      title: 'Team Members',
      value: formatNumber(teamStats.total),
      ...calculateTrend(teamStats.total, teamStats.total - teamStats.new_this_month),
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500',
      description: `${teamStats.active} active, ${teamStats.new_this_month} new this month`
    },
    {
      title: 'Active Agents',
      value: formatNumber(botStats.active),
      ...calculateTrend(botStats.active, botStats.total - botStats.active),
      icon: <Bot className="w-6 h-6" />,
      color: 'bg-green-500',
      description: `${botStats.trained_bots} trained, ${botStats.inactive} inactive`
    },
    {
      title: 'Total Conversations',
      value: conversationStats ? formatNumber(conversationStats.total_messages) : '0',
      ...(conversationStats ? calculateTrend(conversationStats.total_messages, conversationStats.total_messages - conversationStats.active_conversations_today) : { change: '0%', trend: 'up' as const }),
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'bg-purple-500',
      description: conversationStats ? `${conversationStats.unique_sessions} sessions, ${conversationStats.active_conversations_today} active today` : 'Loading...'
    },
    {
      title: 'Success Rate',
      value: systemHealth ? `${Math.round(systemHealth.message_health.success_rate)}%` : '0%',
      change: '+2%',
      trend: 'up',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-orange-500',
      description: systemHealth ? `API: ${Math.round(systemHealth.api_performance.success_rate)}%, Training: ${Math.round(systemHealth.training_health.success_rate)}%` : 'Loading...'
    }
  ];

  // Performance metrics
  const performanceStats = [
    {
      title: 'Avg Response Time',
      value: conversationStats ? `${conversationStats.response_metrics.avg_response_time_seconds}s` : '0s',
      change: '-0.2s',
      trend: 'down' as const,
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-teal-500'
    },
    {
      title: 'Accuracy',
      value: conversationStats ? `${Math.round(conversationStats.response_metrics.avg_confidence)}%` : '0%',
      change: '+3%',
      trend: 'up' as const,
      icon: <Brain className="w-5 h-5" />,
      color: 'bg-indigo-500'
    },
    {
      title: 'Storage Used',
      value: storageUsage ? `${storageUsage.total_usage_mb} MB` : '0 MB',
      ...(storageUsage ? calculateTrend(storageUsage.total_usage_mb, storageUsage.growth_metrics.previous_month_mb) : { change: '0%', trend: 'up' as const }),
      icon: <Database className="w-5 h-5" />,
      color: 'bg-amber-500'
    },
    {
      title: 'Uptime',
      value: systemHealth ? `${Math.round(systemHealth.uptime_metrics.estimated_uptime)}%` : '0%',
      change: '+0.5%',
      trend: 'up' as const,
      icon: <Shield className="w-5 h-5" />,
      color: 'bg-emerald-500'
    }
  ];

  // Format recent activity
  const formatRecentActivity = () => {
    return recentActivity.slice(0, 5).map((activity) => ({
      id: activity.id,
      action: activity.title,
      description: activity.description,
      time: formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true }),
      type: activity.module,
      user: activity.user
    }));
  };

  const formattedRecentActivity = formatRecentActivity();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
            <p className="text-teal-100">
              Here&apos;s what&apos;s happening with your AI agents today.
            </p>
            {/* <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>System: {systemHealth?.storage_health.status || 'Loading...'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-4 h-4" />
                <span>{conversationStats?.active_conversations_today || 0} active conversations</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>{userEngagement?.retention_metrics.retention_rate || 0}% user retention</span>
              </div>
            </div> */}
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Activity className="w-8 h-8" />
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <QuickActionsSection />

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {performanceStats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900">{stat.value}</h4>
              <p className="text-xs text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivitySection activities={formattedRecentActivity} />

        {/* System Health */}
        <SystemHealthSection health={systemHealth} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bot Performance */}
        <BotPerformanceSection bots={botStats?.performance_breakdown || []} />

        {/* Storage Overview */}
        <StorageOverviewSection storage={storageUsage} />
      </div>


    </div>
  );
}

// Individual Component Sections (keep the same as before, but update props)

interface StatCardProps {
  stat: StatCard;
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${stat.color} text-white`}>
          {stat.icon}
        </div>
        <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {stat.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
          {stat.change}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
      <p className="text-gray-600 text-sm">{stat.title}</p>
      {stat.description && (
        <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
      )}
    </motion.div>
  );
}

interface RecentActivitySectionProps {
  activities: Array<{
    id: string;
    action: string;
    description: string;
    time: string;
    type: string;
    user: string;
  }>;
}

function RecentActivitySection({ activities }: RecentActivitySectionProps) {
  const getActivityColor = (type: string) => {
    const colors: { [key: string]: string } = {
      bot: 'bg-green-500',
      team: 'bg-blue-500',
      training: 'bg-purple-500',
      file: 'bg-amber-500',
      workspace: 'bg-teal-500',
      auth: 'bg-gray-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`w-2 h-2 mt-2 rounded-full ${getActivityColor(activity.type)}`} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{activity.action}</p>
              <p className="text-sm text-gray-600 truncate">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">{activity.time}</span>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface SystemHealthSectionProps {
  health: SystemHealth | null;
}

function SystemHealthSection({ health }: SystemHealthSectionProps) {
  if (!health) return null;

  const healthItems = [
    {
      name: 'API Performance',
      status: health.api_performance.success_rate >= 95 ? 'healthy' : 
              health.api_performance.success_rate >= 90 ? 'warning' : 'critical',
      value: `${Math.round(health.api_performance.success_rate)}%`,
      description: `${health.api_performance.total_requests} requests`
    },
    {
      name: 'Training System',
      status: health.training_health.success_rate >= 90 ? 'healthy' :
              health.training_health.success_rate >= 80 ? 'warning' : 'critical',
      value: `${Math.round(health.training_health.success_rate)}%`,
      description: `${health.training_health.total_jobs} jobs`
    },
    {
      name: 'Message Delivery',
      status: health.message_health.success_rate >= 98 ? 'healthy' :
              health.message_health.success_rate >= 95 ? 'warning' : 'critical',
      value: `${Math.round(health.message_health.success_rate)}%`,
      description: `${health.message_health.total_messages} messages`
    },
    {
      name: 'Storage',
      status: health.storage_health.status,
      value: `${health.storage_health.current_usage_mb} MB`,
      description: health.storage_health.message
    }
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      healthy: 'text-green-600 bg-green-50 border-green-200',
      warning: 'text-amber-600 bg-amber-50 border-amber-200',
      critical: 'text-red-600 bg-red-50 border-red-200',
      excellent: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    };
    return colors[status] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      healthy: <CheckCircle2 className="w-4 h-4" />,
      warning: <AlertCircle className="w-4 h-4" />,
      critical: <AlertCircle className="w-4 h-4" />,
      excellent: <CheckCircle2 className="w-4 h-4" />
    };
    return icons[status] || <Activity className="w-4 h-4" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">System Health</h3>
      <div className="space-y-4">
        {healthItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(item.status)}`}
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(item.status)}
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm opacity-75">{item.description}</p>
              </div>
            </div>
            <span className="font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface BotPerformanceSectionProps {
  bots: Array<{
    bot_id: string;
    bot_name: string;
    total_conversations: number;
    message_stats: {
      total_messages: number;
      user_messages: number;
      bot_messages: number;
      avg_response_time: number;
    };
    last_training: {
      status: string;
      date: string;
      duration_seconds: number;
    } | null;
  }>;
}

function BotPerformanceSection({ bots }: BotPerformanceSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Agent Performance</h3>
      <div className="space-y-4">
        {bots.slice(0, 4).map((bot) => (
          <div key={bot.bot_id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{bot.bot_name}</p>
                <p className="text-sm text-gray-600">
                  {bot.total_conversations} conversations • {bot.message_stats.avg_response_time ? `${(bot.message_stats.avg_response_time / 1000).toFixed(1)}s avg response` : 'No responses'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{bot.message_stats.total_messages}</p>
              <p className="text-sm text-gray-600">messages</p>
            </div>
          </div>
        ))}
        {bots.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No agent activity yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface StorageOverviewSectionProps {
  storage: StorageUsage | null;
}

function StorageOverviewSection({ storage }: StorageOverviewSectionProps) {
  if (!storage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Storage Overview</h3>
      
      {/* Total Storage */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Total Storage Used</span>
          <span className="text-sm font-bold text-gray-900">{storage.total_usage_mb} MB</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-teal-500 h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${Math.min((storage.total_usage_mb / 1024) * 100, 100)}%` 
            }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {storage.growth_metrics.monthly_growth_mb >= 0 ? '+' : ''}{storage.growth_metrics.monthly_growth_percentage}% from last month
        </p>
      </div>

      {/* Storage by Bot */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 text-sm">Storage by Agent</h4>
        {storage.usage_by_bot.slice(0, 5).map((bot) => (
          <div key={bot.bot__name} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 truncate flex-1 mr-4">{bot.bot__name || 'Unassigned'}</span>
            <span className="text-sm font-medium text-gray-900">{bot.size_mb.toFixed(1)} MB</span>
            <span className="text-xs text-gray-500 w-12 text-right">({bot.file_count} files)</span>
          </div>
        ))}
      </div>

      {/* Optimization Suggestions */}
      {storage.optimization_suggestions.length > 0 && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-medium text-amber-800 text-sm mb-2">Optimization Suggestions</h4>
          <ul className="text-xs text-amber-700 space-y-1">
            {storage.optimization_suggestions.map((suggestion, index) => (
              <li key={index}>• {suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

function QuickActionsSection() {
  const quickActions = [
    {
      title: 'Create Agent',
      description: 'New AI agent',
      icon: <Bot className="w-5 h-5 text-white" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => console.log('Create Agent')
    },
    {
      title: 'Invite Team',
      description: 'Add members',
      icon: <Users className="w-5 h-5 text-white" />,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Invite Team')
    },
    {
      title: 'Upload Files',
      description: 'Training documents',
      icon: <Upload className="w-5 h-5 text-white" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('Upload Files')
    },
    {
      title: 'View Analytics',
      description: 'Detailed reports',
      icon: <ChartBar className="w-5 h-5 text-white" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => console.log('View Analytics')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.title}
            onClick={action.action}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group text-left"
          >
            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-2 transition-colors`}>
              {action.icon}
            </div>
            <p className="text-sm font-medium text-gray-900">{action.title}</p>
            <p className="text-xs text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Loading Skeleton (keep the same as before)
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Welcome Section Skeleton */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 bg-teal-400 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-teal-400 rounded w-64 animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="h-4 bg-teal-400 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-teal-400 rounded w-40 animate-pulse"></div>
              <div className="h-4 bg-teal-400 rounded w-36 animate-pulse"></div>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                  <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardOverview;