"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// 테스트 중에는 1분
//const IDLE_TIMEOUT = 1 * 60 * 1000;

// 실제 사용 시 예: 4시간
const IDLE_TIMEOUT = 4 * 60 * 60 * 1000;

const LAST_ACTIVITY_KEY = "admin_last_activity";
const ACTIVITY_UPDATE_INTERVAL = 60 * 1000;

export default function AdminIdleTimeout() {
  const pathname = usePathname();
  const router = useRouter();

  const lastRecordedRef = useRef(0);
  const loggingOutRef = useRef(false);

  const isAdminLoginPage = pathname === "/admin";

  const isProtectedAdminArea =
    pathname.startsWith("/admin/") ||
    pathname === "/workspace" ||
    pathname.startsWith("/workspace/");

  useEffect(() => {
    // /admin 로그인 페이지는 보호 대상에서 제외
    if (!isProtectedAdminArea) {
      return;
    }

    const logout = async () => {
      if (loggingOutRef.current) return;

      loggingOutRef.current = true;

      try {
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        await supabase.auth.signOut();
      } catch (error) {
        console.error("Automatic logout failed:", error);
      } finally {
        router.replace("/admin");
        router.refresh();
      }
    };

    const checkSessionAndTimeout = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session check failed:", error);
      }

      // 세션 없으면 보호된 관리자 페이지 접근 금지
      if (!session) {
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        router.replace("/admin");
        router.refresh();
        return;
      }

      const storedValue = localStorage.getItem(LAST_ACTIVITY_KEY);

      if (!storedValue) {
        const now = Date.now();

        localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
        lastRecordedRef.current = now;
        return;
      }

      const lastActivity = Number(storedValue);

      if (
        !Number.isFinite(lastActivity) ||
        Date.now() - lastActivity >= IDLE_TIMEOUT
      ) {
        await logout();
      }
    };

    const recordActivity = () => {
      const now = Date.now();

      if (
        now - lastRecordedRef.current <
        ACTIVITY_UPDATE_INTERVAL
      ) {
        return;
      }

      localStorage.setItem(
        LAST_ACTIVITY_KEY,
        String(now)
      );

      lastRecordedRef.current = now;
    };

    void checkSessionAndTimeout();

    const existingValue =
      localStorage.getItem(LAST_ACTIVITY_KEY);

    if (existingValue) {
      lastRecordedRef.current =
        Number(existingValue) || 0;
    }

    const activityEvents = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "pointerdown",
    ];

    activityEvents.forEach((eventName) => {
      window.addEventListener(
        eventName,
        recordActivity,
        { passive: true }
      );
    });

    const handleStorage = (
      event: StorageEvent
    ) => {
      if (
        event.key === LAST_ACTIVITY_KEY &&
        event.newValue
      ) {
        lastRecordedRef.current =
          Number(event.newValue) || 0;
      }

      // 다른 탭에서 로그아웃된 경우
      if (
        event.key === LAST_ACTIVITY_KEY &&
        event.newValue === null
      ) {
        router.replace("/admin");
        router.refresh();
      }
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    const timer = window.setInterval(() => {
      void checkSessionAndTimeout();
    }, 60 * 1000);

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible"
      ) {
        void checkSessionAndTimeout();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      activityEvents.forEach((eventName) => {
        window.removeEventListener(
          eventName,
          recordActivity
        );
      });

      window.removeEventListener(
        "storage",
        handleStorage
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.clearInterval(timer);
    };
  }, [isProtectedAdminArea, pathname, router]);

  return null;
}