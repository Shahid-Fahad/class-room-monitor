import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useStableCallback } from "@tanstack/react-router";
import type { Session } from "better-auth";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const [session, setSession] = useState<Session>();

  const navigate = Route.useNavigate();

  const privateData = useQuery(trpc.privateData.queryOptions());

  useEffect(() => {
    authClient.getSession().then((res) => {
      const sessionData = res?.data?.session;

      if (!sessionData) {
        navigate({
          to: "/login",
        });
      } else {
        setSession(sessionData);
      }
    });
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {privateData.data?.user?.name}</p>
      <p>privateData: {privateData.data?.message}</p>
      <button
        onClick={() => {
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                navigate({
                  to: "/login",
                });
              },
            },
          });
        }}
      >
        logout
      </button>
    </div>
  );
}
