// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Loader from "../../components/Loader";
// // import ErrorMessage from "../../components/Error";
// // import styles from "./styles.module.css";

// // interface LoginUserProps {
// //   setLoggedIn: (loggedIn: boolean) => void;
// // }

// // const LoginUser: React.FC<LoginUserProps> = ({ setLoggedIn }) => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string>(""); // Especifica el tipo de error como string
// //   const navigate = useNavigate();

// //   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setEmail(e.target.value);
// //   };

// //   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setPassword(e.target.value);
// //   };

// //   const handleLogin = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           email,
// //           password,
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorMessage = "Failed to login";
// //         throw new Error(errorMessage);
// //       }

// //       const data = await response.json();
// //       localStorage.setItem("accessToken", data.access_token);
// //       setLoggedIn(true);

// //       const accessToken = localStorage.getItem("accessToken");
// //       if (accessToken) {
// //         navigate("/");
// //       }
// //     } catch (error) {
// //       setError(error.message || "Login failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className={styles.container}>
// //       <h2>Login</h2>
// //       {loading ? (
// //         <Loader />
// //       ) : (
// //         <>
// //           {error && <ErrorMessage message={error} />}
// //           {!error && (
// //             <form className={styles.form}>
// //               <div className={styles.inputContainer}>
// //                 <label className={styles.inputLabel}>Email</label>
// //                 <input className={styles.input} type="email" value={email} onChange={handleEmailChange} />
// //               </div>
// //               <div className={styles.inputContainer}>
// //                 <label className={styles.inputLabel}>Password</label>
// //                 <input className={styles.input} type="password" value={password} onChange={handlePasswordChange} />
// //               </div>
// //               <button className={styles.button} type="button" onClick={handleLogin}>
// //                 Login
// //               </button>
// //             </form>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default LoginUser;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Loader from "../../components/Loader";
// import ErrorMessage from "../../components/Error";
// import styles from "./styles.module.css";

// interface LoginUserProps {
//   setLoggedIn: (loggedIn: boolean) => void;
// }

// const LoginUser: React.FC<LoginUserProps> = ({ setLoggedIn }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string>(""); // Especifica el tipo de error como string
//   const navigate = useNavigate();

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       if (!response.ok) {
//         const errorMessage = "Failed to login";
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       localStorage.setItem("loggedInUser", JSON.stringify(data.user));
//       setLoggedIn(true);

//       navigate("/");
//     } catch (error) {
//       setError(error.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Login</h2>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           {error && <ErrorMessage message={error} />}
//           {!error && (
//             <form className={styles.form}>
//               <div className={styles.inputContainer}>
//                 <label className={styles.inputLabel}>Email</label>
//                 <input className={styles.input} type="email" value={email} onChange={handleEmailChange} />
//               </div>
//               <div className={styles.inputContainer}>
//                 <label className={styles.inputLabel}>Password</label>
//                 <input className={styles.input} type="password" value={password} onChange={handlePasswordChange} />
//               </div>
//               <button className={styles.button} type="button" onClick={handleLogin}>
//                 Login
//               </button>
//             </form>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default LoginUser;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";




interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorMessage = "Failed to login";
        throw new Error(errorMessage);
      }

      const data: AuthResponse = await response.json();
      localStorage.setItem("accessToken", data.access_token);

      const user = await getUserProfile(data.access_token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed");
    }
  };

  const getUserProfile = async (accessToken: string): Promise<User> => {
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user profile");
    }

    const user: User = await response.json();
    return user;
  };
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // Si el usuario ya tiene un token de acceso, lo redirigimos a la página principal ("/")
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Email</label>
          <input className={styles.input} type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}>Password</label>
          <input className={styles.input} type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button className={styles.button} type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
