import './globals.css';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-datepicker/dist/react-datepicker.css';
import SessionProviderContext from '@/contexts/SessionProviderContext';
import { Poppins } from 'next/font/google';
import { BasicDialogsContextProvider } from '@/contexts/BasicDialogsContext';
import { ToastContextProvider } from '@/contexts/ToastContext';
import { VisualMediaModalContextProvider } from '@/contexts/VisualMediaModalContext';
import Sidebar from '../components/Sidebar';
import { CreatePostModalContextProvider } from '@/contexts/CreatePostModalContext';
import { cn } from '@/lib/cn';
import BottomMenu from '@/components/BottomMenu';
import { CountContextProvider } from '@/contexts/CountContext';
import { ResponsiveContainer } from '@/components/ui/ResponsiveContainer';
import { ReactQueryProvider } from '@/contexts/ReactQueryProvider';
import { getServerUser } from '@/lib/getServerUser';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user] = await getServerUser();
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
      <body className={cn('overflow-y-scroll bg-gray-50', poppins.className)}>
        <ToastContextProvider>
          <ReactQueryProvider>
            <SessionProviderContext>
              <BasicDialogsContextProvider>
                <VisualMediaModalContextProvider>
                  <CreatePostModalContextProvider>
                    <CountContextProvider>
                      {user ? (
                        <>
                          <div className="flex justify-center gap-2">
                            <Sidebar />

                            <ResponsiveContainer className="pb-12 md:pb-4">
                              {children}
                            </ResponsiveContainer>
                          </div>
                          <div className="fixed bottom-0 z-[1] block w-full md:hidden">
                            <BottomMenu />
                          </div>
                        </>
                      ) : (
                        children
                      )}
                    </CountContextProvider>
                  </CreatePostModalContextProvider>
                </VisualMediaModalContextProvider>
              </BasicDialogsContextProvider>
            </SessionProviderContext>
          </ReactQueryProvider>
        </ToastContextProvider>
      </body>
    </html>
  );
}
