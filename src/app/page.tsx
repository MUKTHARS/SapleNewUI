// src/app/page.tsx - UPDATED
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScrollSection } from './components/ScrollSection';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { EnterpriseSection } from './components/EnterpriseSection';
// import { UseCasesSection } from './components/UseCasesSection';
import { StatsSection } from './components/StatsSection';
import { CtaSection } from './components/CtaSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { KnowledgeFirstSection } from '@/app/components/KnowledgeFirstSection';

export default function Home() {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('access_token');
      if (token) {
        // Check if user has a workspace
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/workspace/current/`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );

          if (response.ok) {
            // User has workspace, redirect to dashboard
            router.push('/dashboard');
          } else if (response.status === 404) {
            // User doesn't have workspace, stay on home page
            // The UserSection will show the "Create Workspace" button
            setIsChecking(false);
          } else {
            // Other error, stay on home page
            setIsChecking(false);
          }
        } catch (error) {
          console.error('Failed to check workspace:', error);
          setIsChecking(false);
        }
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  // Inject chatbot script after component mounts
  useEffect(() => {
    if (!isChecking) {
      // Create and inject the chatbot script
      const injectChatbotScript = () => {
        // Check if script already exists
        if (document.getElementById('saple-ai-chatbot-script')) {
          return;
        }

        // Create the script element
        const script = document.createElement('script');
        script.id = 'saple-ai-chatbot-script';
        script.innerHTML = `
          (function() {
            console.log('SAPLE.AI Chatbot script loading...');
            var w = window.innerWidth;
            var i = document.createElement("iframe");
            i.src = "https://bot.saple.ai/aeb57465-c9e0-4ce8-8d22-f1d45f85cec6/dbb329eb-b483-4285-a9ea-c033b8bd2fd1";
            i.style.position = "fixed";
            i.style.bottom = "0px";
            i.style.right = "0px";
            i.style.zIndex = "999999";
            i.style.border = "none";
            i.style.boxShadow = "0 0 20px rgba(14, 165, 233, 0.5)";
            
            // Set initial dimensions
            i.width = w >= 600 ? "400" : "350";
            i.height = "600";
            
            // Function to append iframe
            function appendIframe() {
              if (document.body) {
                document.body.appendChild(i);
                console.log('SAPLE.AI Chatbot iframe added to page');
                
                // Listen for resize messages
                window.addEventListener("message", function(e) {
                  if (e.data && e.data.width && e.data.height) {
                    i.width = w >= 600 ? e.data.width : '400px';
                    i.height = e.data.height;
                    console.log('Chatbot resized to:', i.width, 'x', i.height);
                  }
                });
                
                return true;
              }
              return false;
            }
            
            // Try to append immediately
            if (!appendIframe()) {
              // If body not ready, try again
              const interval = setInterval(() => {
                if (appendIframe()) {
                  clearInterval(interval);
                }
              }, 100);
              
              // Give up after 5 seconds
              setTimeout(() => clearInterval(interval), 5000);
            }
          })();
        `;
        
        // Append the script to the document
        document.body.appendChild(script);
        
        // Cleanup function
        return () => {
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
          // Also remove the iframe
          const iframe = document.querySelector('iframe[src*="bot.saple.ai"]');
          if (iframe && document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        };
      };

      // Run the injection
      const cleanup = injectChatbotScript();
      return cleanup;
    }
  }, [isChecking]); // Run when authentication check completes

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <ErrorBoundary>
        <HeroSection />
        <FeaturesSection />
        <ScrollSection /> 
        <EnterpriseSection />
        <KnowledgeFirstSection />
        {/* <UseCasesSection /> */}
        <StatsSection />
        <CtaSection />
      </ErrorBoundary>
      
      {/* Direct script injection as fallback */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Fallback direct injection
            if (typeof window !== 'undefined') {
              setTimeout(function() {
                if (!document.querySelector('iframe[src*="bot.saple.ai"]')) {
                  console.log('Fallback: Injecting SAPLE.AI chatbot');
                  var iframe = document.createElement('iframe');
                  iframe.src = 'https://bot.saple.ai/aeb57465-c9e0-4ce8-8d22-f1d45f85cec6/dbb329eb-b483-4285-a9ea-c033b8bd2fd1';
                  iframe.style.cssText = 'position:fixed;bottom:0;right:0;z-index:999999;border:none;width:400px;height:600px;box-shadow:0 0 20px rgba(14,165,233,0.5);';
                  document.body.appendChild(iframe);
                }
              }, 2000);
            }
          `,
        }}
      />
    </div>
  );
}