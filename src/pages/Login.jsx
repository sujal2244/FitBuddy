import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const loginHandle = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message on new login attempt

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                console.log("SignIn successful");
                navigate("/home");
            } else {
                await auth.signOut();
                setErrorMessage("Please verify your email before logging in.");
            }
        } catch (error) {
            setErrorMessage("Invalid email or password. Please try again.");
            console.error("Login error:", error.code, error.message);
        }
    };

    return (
        <div className="home_account">
            <div className="page">
                <h1>Welcome Back</h1>
                <br />
                <input
                    type="email"
                    placeholder="Enter Email"
                    className="info"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    className="info"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button className="login_button" onClick={loginHandle}>
                    Log In
                </button>
                <p>or</p>
                <div className="login_google">Continue with Google</div>
            </div>
        </div>
    );
};

export default Login;