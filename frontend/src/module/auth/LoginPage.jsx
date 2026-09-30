import { Link, Navigate, useNavigate } from "react-router";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/auth.hook";
import useApi from "../../hooks/api.hook";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { setUser, setAccessToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useApi();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      toast.success("Logged in successfully", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      return <Navigate to={"/home"} replace />;
    } catch (error) {
      toast.error("User not found, Please register");
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen bg-[#111114] text-[#e8e0d6]">
      {/* Top Brand Bar */}
      <header className="flex h-18 items-center justify-between border-b border-[#29292c] px-8 lg:px-20">
        <Link to="/" className="flex items-center gap-3">
          <img className="w-12"
            src="https://ik.imagekit.io/udeluwj7a/COHORT-3.0/Loom&Legacy/LOGO-removebg-preview.png"
            alt="Loom & Legacy Logo"
          />

          <span className="font-serif text-[22px] font-semibold tracking-tight">
            Loom & Legacy
          </span>
        </Link>

        <div className="hidden items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#8d8983] sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c9a873]" />
          Private Registry
        </div>
      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-120">
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d0ad76]">
              Atelier Registry
            </span>

            <span className="h-px w-12 bg-[#50483d]" />

            <span className="text-[10px] uppercase tracking-[0.15em] text-[#77736d]">
              No. 04
            </span>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="font-serif text-[52px] leading-[0.95] tracking-[-0.03em] text-[#eee7dd] sm:text-[62px]">
              Welcome
              <br />
              <span className="italic text-[#d3ad75]">back.</span>
            </h1>

            <p className="mt-6 max-w-97.5 text-[14px] leading-6 text-[#9d9992]">
              Enter your registry credentials to access your private collection
              and continue your journey through Loom & Legacy.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b6afa5]"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="
                  w-full
                  border-b
                  rounded-xl
                  border-[#454348]
                  bg-transparent
                  px-4
                  py-3
                  text-[14px]
                  text-[#e8e0d6]
                  outline-none
                  placeholder:text-[#5f5c59]
                  transition
                  focus:border-[#c8a56e]
                "
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b6afa5]"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-[10px] uppercase tracking-[0.12em] text-[#8d8983] transition hover:text-[#d0ad76]"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="
                    w-full
                    border-b
                    rounded-xl
                    border-[#454348]
                    bg-transparent
                    px-4
                    py-3
                    pr-10
                    text-[14px]
                    text-[#e8e0d6]
                    outline-none
                    placeholder:text-[#5f5c59]
                    transition
                    focus:border-[#c8a56e]
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#77736d] transition hover:text-[#d0ad76]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={17} strokeWidth={1.5} />
                  ) : (
                    <Eye size={17} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                group
                flex
                w-full
                rounded-xl
                items-center
                justify-center
                gap-3
                bg-[#e8dfd4]
                px-6
                py-4
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[#151518]
                transition
                hover:bg-[#d2ae78]
              "
            >
              Enter The Archive
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Register */}
          <div className="mt-10 border-t border-[#29292c] pt-7 text-center">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#77736d]">
              New to the archive?
            </p>

            <Link
              to="/register"
              className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d0ad76] underline decoration-[#5b4a35] underline-offset-4 transition hover:text-[#ead1a6]"
            >
              Register Now
            </Link>
          </div>

          {/* Bottom detail */}
          <div className="mt-12 flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-[#55535a]">
            <span>Authenticity</span>
            <span>Affordably Premium</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
