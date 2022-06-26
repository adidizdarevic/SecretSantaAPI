import './home.css';
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    const [person, setPerson] = useState("");
    const location = useLocation();

    const logout = async () => {
        navigate("../login", { replace: true });
    }

    useEffect(() => {
        console.log("Kaze ovdje user je");
        console.log(location.state.user);
        fetch("https://localhost:5001/api/UserModels/byUsername/" + location.state.user, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1NjMyMjI1NH0.TWEfoAM7f1RIsytuJeRILcTnFwnqxcTPbwAWqf_nCxzdXNRH682zcyA8OjYzMSaule-pg6PhFVTQQ0eGFkXi5A"
            }
        }).then(response => response.json())
            .then(data => {
                console.log("Ovo je vraceno:");
                console.log(data.id);
                fetch("https://localhost:5001/api/PairModels/" + data.id, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "bearer " + "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1NjMyMjI1NH0.TWEfoAM7f1RIsytuJeRILcTnFwnqxcTPbwAWqf_nCxzdXNRH682zcyA8OjYzMSaule-pg6PhFVTQQ0eGFkXi5A"
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Korisnik za preuzeti ");
                        console.log(data);
                        setPerson(data.username);
                    }).catch(function (error) {
                        console.log("GRESKA");
                        console.log(error);
                    });
            }).catch(function (error) {
                console.log(error)
                alert("Neka sklj greska");
            });
    }, []);

    return (
        <div>
            <body>
                <div className="container">
                    <div className="container-inner">
                        <button class="logout-btn" onClick={logout}></button>
                        <div class="details">
                            <h1 class="title">Hello {location.state.user}</h1>
                            <p class="description"> Your Secret Santa Gift goes to:</p>
                        </div>

                        <p class="text-y">{person}</p>

                    </div>
                </div>
            </body>
        </div>
    );
}

export default Home;