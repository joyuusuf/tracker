"use client";

interface AuthFormProps {
  type: "login" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-semibold mb-6">
        {type === "login" ? "Welcome back" : "Create an account"}
      </h1>

      <form className="space-y-4">
        {type === "signup" && (
          <input
            type="text"
            placeholder="Full name"
            className="w-full border rounded-lg px-4 py-2"
          />
        )}

        <input
          type="email"
          placeholder="Email address"
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-2"
        />

        <button className="w-full bg-black text-white rounded-lg py-2">
          {type === "login" ? "Log in" : "Sign up"}
        </button>
      </form>
    </div>
  );
}
