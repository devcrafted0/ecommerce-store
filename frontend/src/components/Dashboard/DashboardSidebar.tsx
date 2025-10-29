'use client'
import { useEffect, useState } from 'react';
import { Menu, X, Upload , PackagePlus, Store, Clapperboard } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@/context/userContext';
import Loader from '../main/Loader';

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('add-products');

  const {user , loadingUser} = useUser();

  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(()=>{
    const currentPathname = menuItems.find(f=>f.link === pathname.split("/").filter(Boolean).pop());
    setActiveItem(currentPathname?.id!);
  }, [])

  const menuItems = [
    { id: 'my-products', label: 'My Products', icon: Store   , link : 'my-products'},
    { id: 'my-videos', label: 'My Videos', icon: Clapperboard   , link : 'my-videos'},
    { id: 'add-products', label: 'Add Products', icon: PackagePlus , link : 'add-products'},
    { id: 'upload-video', label: 'Upload Video', icon: Upload , link : 'upload-video'},
  ];

  const routerHandeler = (route:  string) => {
    router.push(`/users/dashboard/${route}`)
  }

  const handleMenuClick = (itemId : string) => {
    setActiveItem(itemId);
    setIsOpen(false);
  };

  if(loadingUser){
    return <Loader/>
  }

  return (
    <div className="flex bg-white min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isOpen ? <X size={24} style={{ color: '#B6349A' }} /> : <Menu size={24} style={{ color: '#B6349A' }} />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full overflow-y-auto p-6">
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-8 pt-2">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
              <Image src={user?.avatar!} unoptimized={true} alt='user-image' width={100} height={100}/>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{user?.fullName.firstname} {user?.fullName.lastname}</p>
              <p className="text-xs text-gray-500">@{user?.username}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-6" />

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {handleMenuClick(item.id) , routerHandeler(item.link)}}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-50 to-pink-100'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon
                    size={20}
                    style={{ color: isActive ? '#B6349A' : '#999' }}
                    className="transition-colors duration-200"
                  />
                  <span
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <div
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: '#B6349A' }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-6" />
        </div>
      </aside>
    </div>
  );
}