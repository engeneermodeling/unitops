'use client';

import { useAuth } from '../../../context/AuthContext.jsx';

export default function TestAuthPage() {
  const { user } = useAuth();
  
  return (
    <div className="p-8">
      <h1>Тест Auth</h1>
      <p>User: {user ? user.email : 'null'}</p>
    </div>
  );
}