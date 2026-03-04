import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useRefreshGuard() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isRefresh =
        e.key === "F5" ||
        ((e.ctrlKey || e.metaKey) && e.key === "r");

      if (isRefresh) {
        e.preventDefault();
        setShowModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const confirmRefresh = useCallback(() => {
    router.replace("/");
  }, [router]);

  const cancelRefresh = useCallback(() => {
    setShowModal(false);
  }, []);

  return { showRefreshModal: showModal, confirmRefresh, cancelRefresh };
}
