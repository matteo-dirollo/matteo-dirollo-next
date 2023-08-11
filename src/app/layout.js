"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { persistor, store } from '@/lib/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {children}
      </PersistGate>
      </Provider>
    </html>
  )
}
