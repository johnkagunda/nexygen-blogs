import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await signOut(auth);
      navigate("/");
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed. Try again.");
    }
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    ...(user
      ? [
          { name: "My Blogs", path: `/myblogs/${user.uid}` },
          { name: "Write", path: "/write" },
        ]
      : []),
  ];

  const linkStyle =
    "hover:text-slate-300 transition duration-200 capitalize";

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-3 font-raleway">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer pl-4 text-lg sm:text-3xl"
        >
          Write-it
        </h1>

        <button
          onClick={() => setShow((prev) => !prev)}
          className="mr-3 space-y-1 md:hidden"
        >
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`block h-[2px] w-6 bg-white transition ${
                show && i === 2 ? "opacity-0" : ""
              }`}
            />
          ))}
        </button>

        <nav
          className={`absolute top-12 flex flex-col gap-6 bg-black p-10 text-xl transition-all md:static md:flex-row md:bg-transparent md:p-0 ${
            show ? "left-0 w-full" : "-left-full md:left-0"
          }`}
        >
          {links.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`${linkStyle} ${
                pathname === path ? "highlight" : ""
              }`}
            >
              {name}
            </Link>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              className="rounded-md bg-gradient-to-r from-amber-500 to-pink-500 px-4 py-1 shadow-xl active:scale-95"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/sign-in"
              className={`${linkStyle} ${
                pathname === "/sign-in" ? "highlight" : ""
              }`}
            >
              Sign-in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
