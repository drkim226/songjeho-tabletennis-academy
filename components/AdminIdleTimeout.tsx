"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

//const SIX_HOURS = 4 * 60 * 60 * 1000;
const SIX_HOURS = 1 * 60 * 1000;

// localStorage key
const LAST_ACTIVITY_KEY = "admin_last_activity";

// 너무 자주 localStorage에 기록하지 않도록 제한
const ACTIVITY_UPDATE_INTERVAL = 60 * 1000; // 1분

export default function AdminIdleTimeout() {
  const pathname = usePathname();
  const router = useRouter();

  const lastRecordedRef = useRef(0);
  const loggingOutRef = useRef(false);

  const isAdminArea =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/workspace" ||
    pathname.startsWith("/workspace/");

  useEffect(() => {
    if (!isAdminArea) {
      return;
    }

    const logout = async () => {
      if (loggingOutRef.current) {
        return;
      }

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

    const checkTimeout = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // 로그인하지 않은 경우 timeout 기록 불필요
      if (!session) {
        localStorage.removeItem(LAST_ACTIVITY_KEY);
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
        Date.now() - lastActivity >= SIX_HOURS
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

    // 페이지 진입 시 먼저 확인
    void checkTimeout();

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

    // 다른 탭에서 활동/로그아웃한 경우도 반영
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
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    // 일정 간격으로 6시간 초과 여부 확인
    const timer = window.setInterval(() => {
      void checkTimeout();
    }, 60 * 1000);

    // 브라우저 탭으로 다시 돌아왔을 때 즉시 확인
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible"
      ) {
        void checkTimeout();
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
  }, [isAdminArea, pathname, router]);

  return null;
}