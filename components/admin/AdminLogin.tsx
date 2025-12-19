import { FormEvent } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdminLoginProps {
  password: string;
  setPassword: (password: string) => void;
  handleLogin: (e: FormEvent) => boolean;
}

export const AdminLogin = ({ password, setPassword, handleLogin }: AdminLoginProps) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700/50 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
            <Lock size={32} className="text-purple-300" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-gray-400">Enter password to access admin panel</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none transition-all"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300">
            Login
          </button>

          <button type="button" onClick={() => router.push("/guestbook")} className="w-full mt-3 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 text-gray-300 transition-all duration-300">
            Back to Guestbook
          </button>
        </form>
      </motion.div>
    </div>
  );
};
