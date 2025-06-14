import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { contextData } from '@/context/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import PageLoader from '@/components/PageLoader';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, fetching } = contextData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetching) {
      if (!user.isAdmin) {
        navigate('/dashboard');
      }
    }

    const chatCtn = document.getElementById('smartsupp-widget-container');
    if (chatCtn) chatCtn.style.display = 'none';

    return () => {
      if (chatCtn) chatCtn.style.display = 'block';
    };
  }, [fetching, user, navigate]);

  if (fetching || !user.isAdmin) return <PageLoader />;

  return (
    <div className="dark:bg-black dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <AdminHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
