"use client";

import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-indigo-900">
                Selamat Datang di BahasaKita!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user && (
                <div className="space-y-2">
                  <p className="text-lg">Halo, <strong>{user.name}</strong>!</p>
                  <p className="text-gray-600">Email: {user.email}</p>
                  {user.level && <p className="text-gray-600">Level: {user.level}</p>}
                  {user.xp && <p className="text-gray-600">XP: {user.xp}</p>}
                </div>
              )}
              
              <div className="pt-4">
                <Button 
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isLoading ? 'Logging out...' : 'Logout'}
                </Button>
              </div>

              <div className="pt-4 text-center text-gray-600">
                <p>Dashboard ini akan dikembangkan lebih lanjut dengan fitur-fitur pembelajaran bahasa.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}