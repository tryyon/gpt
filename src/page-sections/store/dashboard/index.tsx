"use client";

import { useAuth } from "@/hooks/useTenantAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardPageView = () => {
  const { user } = useAuth();
  const [isPending, setIsPending] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsPending(false);
    } else {
      router.push("/store/login");
    }
  }, [user]);
  console.log(user);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <div>DashboardPageView</div>;
};

export default DashboardPageView;
