import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [theme, setTheme] = useState('dark');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "123456") {
      console.log("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const colors = {
    dark: {
      bg: '#121212',
      card: '#1E1E1E',
      textPrimary: '#E0E0E0',
      textSecondary: '#B3B3B3',
      inputBg: '#121212',
      inputBorder: '#424242',
      accent: '#A948C9',
      disabledBg: '#333333',
      disabledText: '#B3B3B3',
    },
    light: {
      bg: '#F8F9FA',
      card: '#FFFFFF',
      textPrimary: '#212529',
      textSecondary: '#6C757D',
      inputBg: '#F8F9FA',
      inputBorder: '#DEE2E6',
      accent: '#A948C9',
      disabledBg: '#E9ECEF',
      disabledText: '#6C757D',
    }
  };

  const currentColors = colors[theme];

  return (
    <div className={`flex items-center justify-center min-h-screen transition-colors duration-300`} style={{ backgroundColor: currentColors.bg }}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      <div className={`p-8 rounded-lg shadow-lg w-full max-w-md transition-colors duration-300`} style={{ backgroundColor: currentColors.card, color: currentColors.textPrimary }}>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login into account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg p-2 outline-none focus:ring focus:ring-2"
              style={{
                backgroundColor: currentColors.inputBg,
                borderColor: currentColors.inputBorder,
                color: currentColors.textPrimary,
                borderWidth: '1px', // Tailwind border property isn't dynamic, so we use inline style
                '--tw-ring-color': currentColors.accent
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: currentColors.textSecondary }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg p-2 outline-none focus:ring focus:ring-2"
              style={{
                backgroundColor: currentColors.inputBg,
                borderColor: currentColors.inputBorder,
                color: currentColors.textPrimary,
                borderWidth: '1px',
                '--tw-ring-color': currentColors.accent
              }}
              required
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm hover:underline" style={{ color: currentColors.accent }}>
              Forget password?
            </a>
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-2 rounded-2xl transition-colors duration-300`}
            style={{
              backgroundColor: currentColors.accent,
              color: 'white'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}