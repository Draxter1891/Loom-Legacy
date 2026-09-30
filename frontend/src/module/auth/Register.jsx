import { Link, useNavigate } from "react-router";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useApi from "../../hooks/api.hook";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setCShowPassword] = useState(false);
  const { registerUser } = useApi();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Recieve inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Handle submit action through api
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);

      if (res.status === 201) {
        toast.success("Registered successfully, please login to continue.", {
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
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong, please try later.", {
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
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-[#111114] text-[#e8e0d6]">
      {/* Header */}
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
          Authenticate
        </div>
      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-14">
        <div className="w-full max-w-120">
          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d0ad76]">
              New User
            </span>

            <span className="h-px w-12 bg-[#50483d]" />

            <span className="text-[10px] uppercase tracking-[0.15em] text-[#77736d]">
              No. 05
            </span>
          </div>

          {/* Heading */}
          <div className="mb-9">
            <h1 className="font-serif text-[52px] leading-[0.95] tracking-[-0.03em] text-[#eee7dd] sm:text-[62px]">
              Begin your
              <br />
              <span className="italic text-[#d3ad75]">legacy.</span>
            </h1>

            <p className="mt-6 max-w-102.5 text-[14px] leading-6 text-[#9d9992]">
              Create your account and gain access to our curated collection of
              amazing and limited edition products.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b6afa5]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
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
              <label
                htmlFor="password"
                className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b6afa5]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b6afa5]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showCPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm the password"
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
                  onClick={() => setCShowPassword(!showCPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#77736d] transition hover:text-[#d0ad76]"
                  aria-label={showCPassword ? "Hide password" : "Show password"}
                >
                  {showCPassword ? (
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
                mt-2
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
              Register
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Login */}
          <div className="mt-9 border-t border-[#29292c] pt-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#77736d]">
              Already a member?
            </p>

            <Link
              to="/"
              className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d0ad76] underline decoration-[#5b4a35] underline-offset-4 transition hover:text-[#ead1a6]"
            >
              Login
            </Link>
          </div>

          {/* Footer Detail */}
          <div className="mt-10 flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-[#55535a]">
            <span>Authenticity</span>
            <span>Affordably Premium</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
