import "./login.css"
import { FaUserAlt } from 'react-icons/fa';
import { useEffect, useState, useContext } from "react";
import { useNavigate, Route } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const validPw = async (e) => {
        e.preventDefault();
        const user = { username, password };

        fetch("https://localhost:5001/api/authentication", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(data => {
                const token = data;
                if (token === "Error") {
                    throw Error("Is not in db");
                }
                document.cookie = 'jwt=${token};max-age=604800;domain=';
                if (data !== "Error") {
                    fetch("https://localhost:5001/api/authentication/getUserDTOFromToken/" + token)
                        .then(response => response.json())
                        .then(data => {
                            const user = data;
                            if (data !== "Error") {
                                if (user.item2 === "Admin") {
                                    navigate("../admin-home", { state: { user: user.item1 } });
                                } else {
                                    navigate("../home", { state: { user: user.item1 } });
                                }
                            }
                        }).catch(function (error) {
                            console.log("ERROR FETCHING USER FROM TOKEN");
                            console.log(error);
                        });
                } else alert("Wrong username or password!");
            }).catch(function (error) {
                console.log(error);
                alert("Wrong username or password!");
            });
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <body>
                <div class="login-dark">
                    <form method="post">
                        <h2>Secret Santa</h2>
                        <h3 class="sr-only">Login</h3>
                        <div class="illustration"><FaUserAlt /></div>
                        <div class="form-group">
                            <input class="form-control" type="username" name="username" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="password" name="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div class="form-group"><button class="log-btn" type="submit" onClick={validPw}>Log In</button></div></form>
                </div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
            </body>
        </div>
    );
}

export default Login;