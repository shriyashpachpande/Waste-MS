// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();
// export default AuthContext;

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ------------------------------------------------
//   // CHECK LOGGED IN USER
//   // ------------------------------------------------
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = await res.json();

//         if (data.user) {
//           setUser(data.user);
//         } else {
//           setUser(null);
//         }
//       } catch (err) {
//         setUser(null);
//       }

//       setLoading(false);
//     };

//     fetchUser();
//   }, [token]);

//   // ------------------------------------------------
//   // LOGIN
//   // ------------------------------------------------
//   const login = async (email, password) => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (data.token) {
//         setToken(data.token);
//         localStorage.setItem("token", data.token);
//         setUser(data.user);
//       }

//       return data;
//     } catch (error) {
//       return { error: "Network error" };
//     }
//   };

//   // ------------------------------------------------
//   // LOGOUT
//   // ------------------------------------------------
//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         login,
//         logout,
//         loading,
//         setUser,
//         setToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };






import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Named export — ye hi use karo import ke liye
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------
  // CHECK LOGGED IN USER
  // ------------------------------------------------
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  // ------------------------------------------------
  // LOGIN
  // ------------------------------------------------
  const login = async (email, password) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setUser(data.user);
      }
      return data;
    } catch (error) {
      return { error: "Network error" };
    }
  };

  // ------------------------------------------------
  // LOGOUT
  // ------------------------------------------------
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
