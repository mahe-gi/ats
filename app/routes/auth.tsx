import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    {
      title: "M-resume | Auth",
    },
    {
      name: "description",
      content: "Log in to your account ",
    },
  ];
};

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next ")[1];
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('./images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-boder shadow-lg">
        <section className="flex flex-col gap-8  bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Login in to continue Your Job Journey </h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p> Log out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p> Log in</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
