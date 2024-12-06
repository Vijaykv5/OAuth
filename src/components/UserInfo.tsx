import React from "react";

interface User {
  name: string;
  email: string;
}

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome, {user.name} 👋
      </h2>
      <p className="text-gray-600 text-lg">
        Email: <span className="font-medium text-gray-900">{user.email}</span>
      </p>
    </div>
  );
};

export default UserInfo;
