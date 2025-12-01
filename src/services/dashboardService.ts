// src/services/dashboardService.ts
import api from './api';

// Individual interfaces for micro APIs
export interface TeamMembersStats {
  total: number;
  active: number;
  new_this_month: number;
  inactive_count: number;
  roles: {
    admin: number;
    user: number;
    google_user: number;
  };
  most_active_users: Array<{
    username: string;
    email: string;
    role: string;
    activity_count: number;
    last_activity: string;
  }>;
  activity_trend: {
    current_week: number;
    previous_week: number;
    trend: number;
    trend_percentage: number;
    direction: string;
  };
}

export interface BotsStats {
  total: number;
  active: number;
  inactive: number;
  recent_creations: Array<{
    id: string;
    name: string;
    media_type: string;
    created_date: string;
    created_by_id__username: string;
  }>;
  by_media_type: Array<{
    media_type: string;
    count: number;
    total_messages: number;
    trained_count: number;
  }>;
  trained_bots: number;
  performance_breakdown: Array<{
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

export interface FilesStats {
  total_files: number;
  total_size_mb: number;
  avg_file_size_mb: number;
  largest_file_mb: number;
  recent_uploads: Array<{
    id: string;
    file_name: string;
    file_size: number;
    file_type: string;
    created_date: string;
    bot__name: string;
    created_by_id__username: string;
  }>;
  files_by_type: Array<{
    file_type: string;
    count: number;
    total_size: number;
    avg_size: number;
  }>;
  storage_trend: {
    current_mb: number;
    growth_mb: number;
    growth_percentage: number;
    trend: string;
  };
  upload_frequency: {
    avg_daily_uploads: number;
    max_daily_uploads: number;
    total_uploads: number;
  };
}

export interface StorageUsage {
  total_usage_mb: number;
  usage_by_bot: Array<{
    bot__name: string;
    file_count: number;
    total_size: number;
    size_mb: number;
  }>;
  growth_metrics: {
    current_month_mb: number;
    previous_month_mb: number;
    monthly_growth_mb: number;
    monthly_growth_percentage: number;
  };
  optimization_suggestions: string[];
}

export interface TrainingStats {
  total: number;
  completed: number;
  failed: number;
  success_rate: number;
  avg_duration_seconds: number;
  avg_duration_minutes: number;
  recent_sessions: Array<{
    id: string;
    status: string;
    message: string;
    created_date: string;
    total_training_duration_seconds: number;
    files_processed: number;
    chunks_created: number;
    embeddings_generated: number;
    bot__name: string;
    created_by_id__username: string;
  }>;
  success_by_bot: Array<{
    bot__name: string;
    total: number;
    completed: number;
    success_rate: number;
  }>;
  frequency_trend: Array<{
    date: string;
    count: number;
  }>;
}

export interface ConversationStats {
  total_messages: number;
  user_messages: number;
  bot_messages: number;
  unique_sessions: number;
  active_conversations_today: number;
  conversation_metrics: {
    avg_length: number;
    max_length: number;
    min_length: number;
  };
  response_metrics: {
    avg_response_time_ms: number;
    avg_response_time_seconds: number;
    avg_confidence: number;
    success_rate: number;
  };
  peak_usage_hours: Array<{
    hour: number;
    message_count: number;
  }>;
  recent_activity: Array<{
    session_uuid: string;
    message_count: number;
    last_activity: string;
    user_message_count: number;
  }>;
  engagement_rate: number;
}

export interface SystemHealth {
  api_performance: {
    total_requests: number;
    error_requests: number;
    success_rate: number;
  };
  training_health: {
    total_jobs: number;
    success_rate: number;
  };
  message_health: {
    total_messages: number;
    failed_messages: number;
    success_rate: number;
  };
  storage_health: {
    status: string;
    message: string;
    current_usage_mb: number;
    suggestion: string;
  };
  uptime_metrics: {
    success_rate: number;
    estimated_uptime: number;
    recent_errors: number;
    total_requests: number;
  };
}

export interface UserEngagement {
  activity_timeline: Array<{
    date: string;
    active_users: number;
    total_actions: number;
  }>;
  feature_usage: Array<{
    module: string;
    action: string;
    usage_count: number;
    unique_users: number;
  }>;
  retention_metrics: {
    total_users: number;
    active_this_month: number;
    new_users: number;
    returning_users: number;
    retention_rate: number;
  };
  adoption_rate: {
    bot_creation_rate: number;
    file_upload_rate: number;
    training_initiation_rate: number;
  };
}

export interface RecentActivity {
  id: string;
  type: string;
  module: string;
  title: string;
  description: string;
  user: string;
  user_email: string | null;
  timestamp: string;
  metadata: Record<string, unknown>;
  }

// Original comprehensive interface (for backward compatibility)
export interface DashboardStats {
  team_members: TeamMembersStats;
  bots: BotsStats;
  conversations: ConversationStats;
   performance: Record<string, unknown>;
   recent_activity: RecentActivity[];
  storage_usage: StorageUsage;
  user_engagement: UserEngagement;
  system_health: SystemHealth;
}

export interface AnalyticsData {
  messages?: Array<{
    date: string;
    count: number;
    user_messages: number;
    bot_messages: number;
  }>;
  files?: Array<{
    date: string;
    count: number;
    total_size: number;
  }>;
  trainings?: Array<{
    date: string;
    count: number;
    completed: number;
    failed: number;
  }>;
  users?: Array<{
    date: string;
    active_users: number;
    total_actions: number;
  }>;
  bot_usage?: {
    dates: string[];
    series: Array<{
      name: string;
      data: number[];
    }>;
  };
  storage?: Array<{
    date: string;
    total_size_mb: number;
  }>;
}

class DashboardService {
  // Individual micro APIs
  async getTeamMembersStats(): Promise<TeamMembersStats> {
    const response = await api.get('/dashboard/team-members/stats/');
    return response.data;
  }

  async getBotsStats(): Promise<BotsStats> {
    const response = await api.get('/dashboard/bots/stats/');
    return response.data;
  }

  async getBotPerformance(botId?: string): Promise<Record<string, unknown>> {
    const url = botId 
      ? `/dashboard/bots/performance/${botId}/`
      : '/dashboard/bots/performance/';
    const response = await api.get(url);
    return response.data;
  }

  async getFilesStats(): Promise<FilesStats> {
    const response = await api.get('/dashboard/files/stats/');
    return response.data;
  }

  async getStorageUsage(): Promise<StorageUsage> {
    const response = await api.get('/dashboard/storage/usage/');
    return response.data;
  }

  async getTrainingStats(): Promise<TrainingStats> {
    const response = await api.get('/dashboard/training/stats/');
    return response.data;
  }

  async getConversationStats(): Promise<ConversationStats> {
    const response = await api.get('/dashboard/conversations/stats/');
    return response.data;
  }

  async getSystemHealth(): Promise<SystemHealth> {
    const response = await api.get('/dashboard/system/health/');
    return response.data;
  }

  async getUserEngagement(): Promise<UserEngagement> {
    const response = await api.get('/dashboard/user/engagement/');
    return response.data;
  }

  async getRecentActivity(): Promise<RecentActivity[]> {
    const response = await api.get('/dashboard/recent-activity/');
    return response.data;
  }

  // Original comprehensive API (for backward compatibility)
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/stats/');
    return response.data;
  }

  async getAnalytics(metric: string, period: string = '7d'): Promise<AnalyticsData> {
    const response = await api.get('/dashboard/analytics/', {
      params: { metric, period }
    });
    return response.data;
  }

  async getAuditLogs(days: number = 7, page: number = 1, pageSize: number = 50) {
    const response = await api.get('/dashboard/audit-logs/', {
      params: { days, page, page_size: pageSize }
    });
    return response.data;
  }
}

export const dashboardService = new DashboardService();