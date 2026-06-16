import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { TrainTrack, Hexagon, Fingerprint, Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === "admin@sirail.com" && password === "admin123") {
        setSuccess(true);
        localStorage.setItem(
          "sirail_auth",
          JSON.stringify({ email, role: "IT Admin", name: "Administrator" })
        );
        setTimeout(() => {
          setLocation("/dashboard");
        }, 1000);
      } else {
        setError("Invalid email or password");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-foreground">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex w-[60%] relative bg-gradient-to-br from-primary via-blue-900 to-black overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center space-x-3 text-white">
          <Hexagon className="h-10 w-10 text-blue-400" />
          <h1 className="text-4xl font-bold tracking-tight">SIRAIL</h1>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="glass-card bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-semibold text-white mb-4 leading-tight">
              Connecting Industry, Innovation and Mobility
            </h2>
            <p className="text-blue-100 text-lg">
              Secure access to your enterprise workspace. Monitoring critical systems and maintaining operational excellence globally.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center space-x-6 text-white/50 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>SOC 2 Type II</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-8 lg:p-16 relative">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 text-center lg:text-left">
            <div className="flex lg:hidden justify-center mb-6 text-primary">
              <Hexagon className="h-12 w-12" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your enterprise workspace</p>
          </div>

          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
              <TabsTrigger value="standard" className="text-sm">Standard</TabsTrigger>
              <TabsTrigger value="badge" className="text-sm">Badge</TabsTrigger>
              <TabsTrigger value="sso" className="text-sm">SSO</TabsTrigger>
            </TabsList>

            <TabsContent value="standard">
              <form onSubmit={handleLogin} className="space-y-6">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0, x: [-10, 10, -10, 10, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2 border border-destructive/20"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Corporate Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@sirail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      data-testid="input-email"
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        data-testid="input-password"
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal">Remember me on this device</Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 text-base relative overflow-hidden transition-all"
                  disabled={loading || success}
                  data-testid="button-submit"
                >
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-5 w-5" />
                        Success
                      </motion.div>
                    ) : loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Authenticating...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Secure Sign In
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
                
                <div className="text-center text-sm text-muted-foreground mt-6">
                  Demo Credentials: admin@sirail.com / admin123
                </div>
              </form>
            </TabsContent>

            <TabsContent value="badge" className="flex flex-col items-center justify-center py-10 space-y-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-primary/30"
                />
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-2 rounded-full border-2 border-primary/20"
                />
                <div className="relative z-10 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Fingerprint className="h-10 w-10" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-medium text-lg mb-1">Hold your badge near the reader</h3>
                <p className="text-sm text-muted-foreground">Waiting for NFC scan...</p>
              </div>
            </TabsContent>

            <TabsContent value="sso" className="py-6 flex flex-col items-center">
              <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="w-5 h-5"><rect x="1" y="1" width="9" height="9" fill="#f25022"/><rect x="11" y="1" width="9" height="9" fill="#7fba00"/><rect x="1" y="11" width="9" height="9" fill="#00a4ef"/><rect x="11" y="11" width="9" height="9" fill="#ffb900"/></svg>
                <span className="font-semibold text-gray-700">Sign in with Microsoft</span>
              </Button>
              <div className="mt-8 text-center space-y-1">
                <p className="text-sm font-medium text-foreground">Enterprise Single Sign-On</p>
                <p className="text-xs text-muted-foreground">Powered by Azure AD</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
