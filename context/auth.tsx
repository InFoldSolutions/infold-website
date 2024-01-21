'use client'

import { useState, useEffect, createContext } from 'react'
import { onAuthStateChanged, getAuth, User } from 'firebase/auth'

import app from '@/context/firebase/app'

const auth = getAuth(app)

export const AuthContext = createContext<{ user: User | null }>({
  user: null
})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<null | User>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userState) => {
      if (userState)
        setUser(userState)
      else
        setUser(null)
    });

    return () => unsubscribe()
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};