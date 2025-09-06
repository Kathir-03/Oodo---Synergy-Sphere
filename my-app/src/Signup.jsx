import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'; // Import Lucide icons

export default function Signup() {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState('dark');
  
  // Form and validation states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Specific error for password mismatch
  const [passwordMatchError, setPasswordMatchError] = useState("");

  // States for individual password criteria
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  
  // States to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Regex for individual password criteria
  const minLengthRegex = /.{8,}/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/;

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setHasMinLength(minLengthRegex.test(newPassword));
    setHasUpperCase(upperCaseRegex.test(newPassword));
    setHasLowerCase(lowerCaseRegex.test(newPassword));
    setHasNumber(numberRegex.test(newPassword));
    setHasSpecialChar(specialCharRegex.test(newPassword));
    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordMatchError("Passwords do not match!");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (newConfirmPassword && password !== newConfirmPassword) {
      setPasswordMatchError("Passwords do not match!");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordMatchError("");

    const isPasswordStrong = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    if (!isPasswordStrong) {
      setPasswordMatchError("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match!");
      return;
    }

    if (!agreedToTerms) {
      setPasswordMatchError("You must agree to the Terms of use and Privacy Policy.");
      return;
    }

    console.log("Signup successful:", { firstName, lastName, email, password });
    navigate("/login");
  };

  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  const isButtonEnabled =
    firstName &&
    lastName &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    isPasswordValid &&
    agreedToTerms &&
    !passwordMatchError;

  const PasswordCriterion = ({ text, isValid }) => (
    <li className={`flex items-center text-sm ${isValid ? 'text-green-400' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
      {isValid ? (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      ) : (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      )}
      {text}
    </li>
  );

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
    <div className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${theme === 'light' ? 'light-theme' : ''}`} 
  style={{ backgroundColor: currentColors.bg }}>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Create an account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-1" style={{ color: currentColors.textSecondary }}>
              First name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: currentColors.inputBg,
                borderColor: currentColors.inputBorder,
                color: currentColors.textPrimary,
                '--tw-ring-color': currentColors.accent
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1" style={{ color: currentColors.textSecondary }}>
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: currentColors.inputBg,
                borderColor: currentColors.inputBorder,
                color: currentColors.textPrimary,
                '--tw-ring-color': currentColors.accent
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1" style={{ color: currentColors.textSecondary }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: currentColors.inputBg,
                borderColor: currentColors.inputBorder,
                color: currentColors.textPrimary,
                '--tw-ring-color': currentColors.accent
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1" style={{ color: currentColors.textSecondary }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-3 pr-10 rounded-md border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: currentColors.inputBg,
                  borderColor: currentColors.inputBorder,
                  color: currentColors.textPrimary,
                  '--tw-ring-color': currentColors.accent
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                style={{ color: currentColors.textSecondary }}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {password && (
              <ul className="mt-2 text-sm space-y-1">
                <PasswordCriterion text="At least 8 characters" isValid={hasMinLength} />
                <PasswordCriterion text="At least one uppercase letter" isValid={hasUpperCase} />
                <PasswordCriterion text="At least one lowercase letter" isValid={hasLowerCase} />
                <PasswordCriterion text="At least one number" isValid={hasNumber} />
                <PasswordCriterion text="At least one special character" isValid={hasSpecialChar} />
              </ul>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-1" style={{ color: currentColors.textSecondary }}>
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full p-3 pr-10 rounded-md border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: currentColors.inputBg,
                  borderColor: currentColors.inputBorder,
                  color: currentColors.textPrimary,
                  '--tw-ring-color': currentColors.accent
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                style={{ color: currentColors.textSecondary }}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {passwordMatchError && (
              <p className="text-red-500 text-sm mt-2">{passwordMatchError}</p>
            )}
          </div>
          
          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 mr-2 w-4 h-4 rounded-sm"
              style={{ 
                backgroundColor: currentColors.inputBg,
                borderColor: currentColors.inputBorder,
                accentColor: currentColors.accent 
              }}
              required
            />
            <label
              htmlFor="terms"
              className="text-sm leading-tight" style={{ color: currentColors.textSecondary }}
            >
              By creating an account, I agree to our{" "}
              <a href="#" className="underline" style={{ color: currentColors.textSecondary, '--hover-color': currentColors.textPrimary }}>
                Terms of use
              </a>{" "}
              and{" "}
              <a href="#" className="underline" style={{ color: currentColors.textSecondary, '--hover-color': currentColors.textPrimary }}>
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded-md font-bold transition-colors duration-300`}
            style={{
              backgroundColor: isButtonEnabled ? currentColors.accent : currentColors.disabledBg,
              color: isButtonEnabled ? 'white' : currentColors.disabledText,
              cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
              opacity: isButtonEnabled ? '1' : '0.5'
            }}
            disabled={!isButtonEnabled}
          >
            Create an account
          </button><div className="mt-4 text-center">
  <hr className="mb-4" />
  <p className="text-sm" style={{ color: currentColors.textSecondary }}>
    Already have an account?{" "}
    <a
      href="/"
      className="text-lg font-semibold hover:underline"
      style={{ color: currentColors.accent }}
    >
      Login
    </a>
  </p>
</div>
        </form>
      </div>
    </div>
  );
}