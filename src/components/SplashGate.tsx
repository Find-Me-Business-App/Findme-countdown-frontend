"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <Image
          src="/animate-logo.svg"
          alt="FindMe loading"
          width={200}
          height={200}
          priority
        />
      </div>
    );
  }

  return <>{children}</>;
}

