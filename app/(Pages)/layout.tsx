import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Script from "next/script";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar></Navbar>        
    <div className="flex overflow-hidden bg-white pt-16">
      <Sidebar></Sidebar>
      <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
      <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 mt-10">
        {children}
      </div>
    </div>
    <Script
        src="https://buttons.github.io/buttons.js"
        strategy="lazyOnload"
        async
        defer
    />
    <Script
        src="https://demo.themesberg.com/windster/app.bundle.js"
        strategy="afterInteractive"
    />   
    </div>
  );
}