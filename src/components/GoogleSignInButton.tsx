"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import { useAuth } from "@/context/AuthContext";

declare global {
  interface Window {
    google?: any;
  }
}

interface Props {
  onSuccess: () => void;
  onError: (message: string) => void;
  text?: "signin_with" | "signup_with" | "continue_with";
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function GoogleSignInButton({ onSuccess, onError, text = "continue_with" }: Props) {
  const { loginWithGoogle } = useAuth();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [rendered, setRendered] = useState(false);

  const renderButton = useCallback(() => {
    if (!window.google || !buttonRef.current) return;

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          try {
            await loginWithGoogle(response.credential);
            onSuccess();
          } catch (err) {
            onError(err instanceof Error ? err.message : "Google sign-in failed");
          }
        },
      });

      buttonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: 360,
        text,
        shape: "rectangular",
      });
      setRendered(true);
    } catch {
      setRendered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // Case 1: script tag loads for the first time on this page
  useEffect(() => {
    if (scriptLoaded) renderButton();
  }, [scriptLoaded, renderButton]);

  // Case 2: script was already loaded by a previous page (Next.js client nav / fast refresh)
  useEffect(() => {
    if (window.google && !rendered) {
      renderButton();
    }
    // Poll briefly in case the global script finishes loading slightly after mount
    const interval = setInterval(() => {
      if (window.google && !rendered) {
        renderButton();
        clearInterval(interval);
      }
    }, 300);
    const timeout = setTimeout(() => clearInterval(interval), 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <button
        type="button"
        disabled
        title="Set NEXT_PUBLIC_GOOGLE_CLIENT_ID to enable Google sign-in"
        className="btn-outline w-full opacity-50"
      >
        Continue with Google
      </button>
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div ref={buttonRef} className="flex min-h-[44px] w-full justify-center [&>div]:!w-full" />
    </>
  );
}