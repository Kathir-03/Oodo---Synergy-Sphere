import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Here you can call your API (e.g., fetch/axios)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login into account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-orange-500 hover:underline">
              Forget password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-400 text-white font-semibold py-2 rounded-2xl hover:bg-gray-500"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="#" className="font-medium text-indigo-600 hover:underline">
            signup instead
          </a>
        </p>
      </div>
    </div>
  );
}
