"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initMixpanel, trackPageView } from "@/lib/mixpanel";

export function MixpanelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Mixpanel with your token
    // Replace with your actual Mixpanel token or use environment variable
    const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "";
    
    if (mixpanelToken) {
      initMixpanel(mixpanelToken);
    } else {
      console.warn("Mixpanel token not found. Set NEXT_PUBLIC_MIXPANEL_TOKEN in your .env file");
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname, {
        timestamp: new Date().toISOString(),
      });
    }
  }, [pathname]);

  return <>{children}</>;
}
