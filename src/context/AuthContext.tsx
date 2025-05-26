
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app you'd use a backend service
const mockUsers = [
  { id: '1', username: 'testuser', email: 'test@example.com', password: 'password123' }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundUser = mockUsers.find(u => 
        u.email === email && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        setIsLoading(false);
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 500);
  };

  const register = (username: string, email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const existingUser = mockUsers.find(u => u.email === email);
      
      if (existingUser) {
        setError('User with this email already exists');
        setIsLoading(false);
        return;
      }
      
      const newUser = {
        id: `${mockUsers.length + 1}`,
        username,
        email,
      };
      
      // In a real app, you'd add the user to your database here
      mockUsers.push({ ...newUser, password });
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
