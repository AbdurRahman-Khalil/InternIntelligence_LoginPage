import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Logo } from "./components/Logo";
import { AuthRoute } from "./routes/AuthRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { LogoutBtn } from "./components/LogoutBtn";
import { NotFound } from "./pages/NotFound";

import rightImg from "./assets/right_img.jpg";

import { TbLogout2 } from "react-icons/tb";



export const App = () => {

  const customToastsStyles = {
    success: {
      style: {
        fontFamily: "inherit",
        color: "#064e3b",
        background: "#d1fae5",
        border: "2px solid #34d399",
      },
      iconTheme: {
        primary: "#35e392", 
        secondary: "#ffffff", 
      },
    },
    error: {
      style: {
        fontFamily: "inherit",
        color: "#7f1d1d",
        background: "#fee2e2",
        border: "2px solid #f87171",
      },
    },
    loading: {
      style: {
        fontFamily: "inherit",
        color: "#374151",
        background: "#e5e7eb",
        border: "2px solid #9ca3af",
      },
    },
  }


  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={customToastsStyles}
      />

      <div className="wrapper min-h-dvh flex">
        <div
          className="left px-[5.25em] py-[2.5em] w-[45%] bg-[hsl(300,8%,97%)] transitions flex gap-[7em] flex-col justify-between
          max-[1124px]:w-[48%] max-[950px]:px-[4.2em] max-[834px]:w-[50%] max-[834px]:px-[4em] max-[768px]:w-[54%]
          max-[730px]:px-[3em] max-[730px]:w-full max-[480px]:px-[2.7em] max-[432px]:px-[2.4em] max-[375px]:px-[2em]
          max-[343px]:px-[1.8em] max-[327px]:px-[1.5em]"
        >
          <Logo logoText={"PEAKIFY"} />

          {/* Show this LogoutBtn only when screen width <= 730px */}
          <LogoutBtn hideSeek="max-[730px]:block hidden" />

          <Routes>
            <Route path="/" element={<Home />} />

            {/* Public Routes - Only accessible when NOT logged in */}
            <Route element={<AuthRoute restricted={true} redirectTo={"/dashboard"} />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Private Routes - Only accessible when logged in */}
            <Route element={<AuthRoute restricted={false} redirectTo={"/login"} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div
          className="right relative max-w-[55%] transitions
          max-[1124px]:max-w-[52%] max-[834px]:max-w-[50%] max-[768px]:max-w-[46%]
          max-[730px]:max-w-full max-[730px]:fixed max-[730px]:inset-0 max-[730px]:-z-20"
        >
          {/* Hide this LogoutBtn when screen width <= 730px */}
          <LogoutBtn hideSeek="max-[730px]:hidden block" />
          <img
            className="max-w-full h-full object-cover transitions"
            src={rightImg}
            alt="right_image"
          />
        </div>
      </div>
    </>
  );
};

