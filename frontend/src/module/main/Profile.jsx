import { Pencil, LockKeyhole, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/auth.hook";
import { getCurrentUser } from "../../api/auth.api";
import { useEffect } from "react";

const Profile = () => {
  const { user, setUser } = useAuth();

  const fetchUserProfile = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);
      setUser(res.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [setUser]);

  return (
    <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden border border-white/5 bg-[#18191d] text-[#f3eee5] shadow-2xl">
      <div className="relative z-10 p-7 md:p-9">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          {/* Profile */}
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-35 w-35 rounded-full border border-[#a9854f]/40 p-1">
                <img
                  src="https://ik.imagekit.io/udeluwj7a/COHORT-3.0/Loom&Legacy/Loom.png?tr=q-10,f-webp"
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover grayscale-20"
                />
              </div>

              {/* Verified badge */}
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#18191d] bg-[#c49a5a]">
                <span className="text-[9px] font-bold text-[#18191d]">✓</span>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start">
              <h1 className="font-serif text-5xl leading-none tracking-tight text-[#eee9df]">
                {user.name}
              </h1>

              <span className="text-[#b9a98d]">{user.email}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex h-10 shrink-0">
            {/* <button className="flex items-center gap-3 border border-white/5 bg-[#242529] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#ded8ce] transition hover:bg-[#2c2d31]">
              <Pencil size={11} strokeWidth={1.5} />
              Edit Profile
            </button> */}

            <button className="flex items-center gap-3 border-y border-r border-[#f14b21]/30 bg-[#f14b21] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#29241d] transition hover:bg-[#f14b21c7] cursor-pointer">
              <LogOut size={11} strokeWidth={1.5} />
              Log out
            </button>
          </div>
        </div>

        <div className="my-7 h-px bg-white/4" />

        <div className="grid grid-cols-2 gap-y-7 md:grid-cols-4 md:gap-0">
          <Stat
            label="Member"
            value="Since 2023"
            description="Legacy Family Circle"
          />

          <Stat
            label="Acquisitions"
            value="4 Master Weaves"
            description="100% Crystal-Tier"
          />

          <Stat
            label="Archival Reserve"
            value="$3,200"
            description="Pre-allotment Credit"
          />

          <Stat
            label="Dedicated Loom Master"
            value="Kenjiro Nishimura"
            description="Kyoto Atelier Studio"
          />
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value, description }) => {
  return (
    <div className="md:px-6 first:pl-0 last:pr-0">
      <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.14em] text-[#918a7f]">
        {label}
      </p>

      <p className="font-serif text-[20px] leading-none text-[#d8b06c]">
        {value}
      </p>

      <p className="mt-1.5 text-[9px] text-[#8f8b84]">{description}</p>
    </div>
  );
};

export default Profile;
