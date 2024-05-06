import { Routes, Route, useNavigate } from "react-router-dom";
import { router } from "./routes/index";
import { Layout } from "./layouts/index";
import { useAuth } from "./contexts/AuthContext";
import { useEffect, useLayoutEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  console.log("auth ~ ", auth);
  useEffect(() => {
    const cookies_auth = Cookies.get("auth")
      ? JSON.parse(Cookies.get("auth"))
      : undefined;
    console.log("cookies auth - ", cookies_auth);
    setAuth(cookies_auth);
    // if (cookies_auth) {
    //   navigate("/");
    // } else {
    //   navigate("/login");
    // }
  }, [navigate, setAuth]);
  return (
    <Routes>
      <Route
        element={
          <Layout
            hideHeaderPaths={[
              "/login",
              "/signup",
              "/forgot-password",
              "/reset-password",
              "/admin",
            ]}
          />
        }
      >
        {router.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            ></Route>
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;
