import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './Router/Routes.jsx';
import { Toaster } from 'sonner';
import {QueryClient,  QueryClientProvider} from '@tanstack/react-query'


import 'aos/dist/aos.css'; 
import Aos from 'aos';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';

Aos.init();
const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
      <Toaster richColors position="top-center" />
    <div className="font-urbanist max-w-6xl mx-auto">
   <QueryClientProvider client={queryClient}>
      <AuthProvider>
       <RouterProvider router={router} />
     </AuthProvider>
   </QueryClientProvider>
    </div>

  </StrictMode>,
)
