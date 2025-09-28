import React from 'react';
import Image from 'next/image';

interface UserAvatarProps {
  user?: {
    name?: string;
    profile?: {
      photo?: string;
      photo_url?: string;
    };
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'md', className = '' }) => {
  const getAvatarSize = () => {
    switch (size) {
      case 'sm': return { width: 32, height: 32, text: 'text-sm' };
      case 'lg': return { width: 48, height: 48, text: 'text-lg' };
      default: return { width: 40, height: 40, text: 'text-base' };
    }
  };

  const getAvatarInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const { width, height, text } = getAvatarSize();
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold ${text} ${className}`}>
      {user?.profile?.photo_url ? (
        <Image
          src={user.profile.photo_url}
          alt={user.name || 'User'}
          width={width}
          height={height}
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            // If image fails to load, hide it and show initial
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        getAvatarInitial(user?.name || 'User')
      )}
    </div>
  );
};

export default UserAvatar;