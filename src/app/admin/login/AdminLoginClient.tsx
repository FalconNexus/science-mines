"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function getInitialError(param: string | null) {
  if (param === "unauthorized") {
    return "This account is not an admin. Contact the site owner or run: npm run setup:admin";
  }
  return "";
}

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(getInitialError(searchParams.get("error")));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    let redirecting = false;

    try {
      const supabase = createClient();

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (!data.session) {
        setError("Login succeeded but no session was created. Please try again.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        await supabase.auth.signOut();
        setError(
          "This account is not an admin. Run npm run setup:admin or contact the site owner."
        );
        return;
      }

      // Full page navigation avoids router.push hanging when middleware redirects.
      redirecting = true;
      window.location.assign("/admin/bookings");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Sign in failed. Check your connection and try again."
      );
    } finally {
      if (!redirecting) setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center font-display font-bold text-black text-2xl mx-auto mb-4">
            S
          </div>
          <h1 className="font-display text-2xl font-bold">Admin Login</h1>
          <p className="text-muted text-sm mt-2">ScienceMines Dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl border border-border bg-surface space-y-5"
        >
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@sciencemines.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your password"
          />
          {error && (
            <p className="text-red-400 text-sm leading-relaxed">{error}</p>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted mt-6 leading-relaxed">
          First time? Run{" "}
          <code className="text-primary">npm run setup:admin</code> in the
          project folder to create your admin account.
        </p>
      </div>
    </div>
  );
}
