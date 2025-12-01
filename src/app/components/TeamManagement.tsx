// src/app/components/TeamManagement.tsx - UPDATED
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Crown, User, Trash2, AlertCircle } from 'lucide-react';

interface TeamMember {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  phone: string;
  created_date: string;
  is_active: boolean;
}

interface InviteError {
  email?: string;
  role?: string;
  general?: string;
}

export function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'user'
  });
  const [inviteErrors, setInviteErrors] = useState<InviteError>({});
  const [successMessage, setSuccessMessage] = useState('');

  const fetchTeamMembers = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace/team-members/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data);
      }
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setInviteErrors({});
    setSuccessMessage('');

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace/team-members/invite/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(inviteData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setInviteData({ email: '', role: 'user' });
        fetchTeamMembers(); // Refresh list

        // Close modal after success
        setTimeout(() => {
          setShowInviteModal(false);
          setSuccessMessage('');
        }, 2000);
      } else {
        // Handle validation errors from backend
        if (data.details) {
          // Backend validation errors
          setInviteErrors({
            email: data.details.email?.[0],
            role: data.details.role?.[0],
            general: data.error
          });
        } else {
          // General error
          setInviteErrors({
            general: data.error || 'Failed to invite team member'
          });
        }
      }
    } catch (error) {
      console.error('Invite error:', error);
      setInviteErrors({
        general: 'Network error: Failed to send invitation'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace/team-members/remove/${memberId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchTeamMembers(); // Refresh list
        // You could add a toast notification here instead of alert
        alert('Team member removed successfully');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to remove team member');
      }
    } catch (error) {
      console.error('Remove error:', error);
      alert('Failed to remove team member');
    }
  };

  const clearErrors = () => {
    setInviteErrors({});
    setSuccessMessage('');
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Clear errors when modal opens/closes or when user starts typing
  useEffect(() => {
    if (showInviteModal) {
      clearErrors();
    }
  }, [showInviteModal, inviteData.email, inviteData.role]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4 text-yellow-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-yellow-100 text-yellow-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600 mt-1">Manage team members and their permissions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInviteModal(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </motion.button>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Team Members ({teamMembers.length})</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {teamMembers.map((member) => (
            <div key={member.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {(member.first_name?.[0] || member.username?.[0] || 'U').toUpperCase()}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">
                      {member.first_name && member.last_name
                        ? `${member.first_name} ${member.last_name}`
                        : member.username
                      }
                    </h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRoleColor(member.role)}`}>
                      {getRoleIcon(member.role)}
                      <span className="capitalize">{member.role}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{member.email}</p>
                  <p className="text-gray-500 text-xs">
                    Joined {new Date(member.created_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Mail className="w-4 h-4" />
                </button>

                {member.role !== 'admin' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members yet</h3>
            <p className="text-gray-600 mb-4">Invite team members to collaborate on your workspace</p>
            <button
              onClick={() => setShowInviteModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Invite Your First Member
            </button>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Invite Team Member</h3>
              <button
                onClick={() => {
                  setShowInviteModal(false);
                  clearErrors();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              {/* Success Message */}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2"
                >
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm">{successMessage}</span>
                </motion.div>
              )}

              {/* General Error */}
              {inviteErrors.general && !successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{inviteErrors.general}</span>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteData.email}
                  onChange={(e) => {
                    setInviteData({ ...inviteData, email: e.target.value });
                    if (inviteErrors.email) {
                      setInviteErrors({ ...inviteErrors, email: undefined });
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${inviteErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  placeholder="team.member@gmail.com"
                  required
                />
                {inviteErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-red-600 text-xs mt-1 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{inviteErrors.email}</span>
                  </motion.p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Only Gmail accounts are allowed
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={inviteData.role}
                  onChange={(e) => {
                    setInviteData({ ...inviteData, role: e.target.value });
                    if (inviteErrors.role) {
                      setInviteErrors({ ...inviteErrors, role: undefined });
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${inviteErrors.role ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {inviteErrors.role && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-red-600 text-xs mt-1 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{inviteErrors.role}</span>
                  </motion.p>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowInviteModal(false);
                    clearErrors();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Invite'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}