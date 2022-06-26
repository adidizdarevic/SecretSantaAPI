import './home.css';
import { useState, useEffect } from 'react';
import { useNavigate, Route, useLocation } from "react-router-dom";

const AdminHome = () => {

    const navigate = useNavigate();
    const [adminId, setAdminId] = useState("");
    const [person, setPerson] = useState("");
    const [listPairs, setListPairs] = useState([]);
    const location = useLocation();

    const logout = async () => {
        navigate("../login", { replace: true });
    }

    const postPairs = async () => {
        fetch("https://localhost:5001/api/PairModels", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1NjMyMjI1NH0.TWEfoAM7f1RIsytuJeRILcTnFwnqxcTPbwAWqf_nCxzdXNRH682zcyA8OjYzMSaule-pg6PhFVTQQ0eGFkXi5A"
            }
        }).then(response => response.json())
            .then(data => {
                console.log("jel ovdje il nije");
                console.log(data);
                setListPairs(data);
                fetch("https://localhost:5001/api/PairModels/" + adminId, {
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
            })
            .catch(function (error) {
                console.log(error);
                alert("Ne Valja");
            });
    }

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch("https://localhost:5001/api/UserModels/byUsername/" + location.state.user, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1NjMyMjI1NH0.TWEfoAM7f1RIsytuJeRILcTnFwnqxcTPbwAWqf_nCxzdXNRH682zcyA8OjYzMSaule-pg6PhFVTQQ0eGFkXi5A"
                }
            });
            const data = await response.json();
            console.log("Response je ");
            console.log(data.id);
            setAdminId(data.id);
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

        }

        const fetchData2 = async () => {
            const response = await fetch("https://localhost:5001/api/PairModels/", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1NjMyMjI1NH0.TWEfoAM7f1RIsytuJeRILcTnFwnqxcTPbwAWqf_nCxzdXNRH682zcyA8OjYzMSaule-pg6PhFVTQQ0eGFkXi5A"
                }
            });
            const data = await response.json();
            console.log("Response je ");
            console.log(data);
            setListPairs(data);
        }

        fetchData();
        fetchData2();

    }, []);

    return (
        <div>
            <body>
                <div className="container">
                    <div className="container-inner">
                        <button class="logout-btn" onClick={logout}></button>
                        <div class="details">
                            <h1 class="title">Hello {location.state.user}</h1>
                            <p class="description"> Your Secret Santa Gift goes to {person}</p>
                        </div>

                        <p class="text-y">Your Secret Santa Gifting list is: </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Person X id</th>
                                    <th>Person Y id</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listPairs.map((item) => (
                                    <tr>
                                        <td>{item.x}</td>
                                        <td>{item.y}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button class="btn" onClick={postPairs}>Generate</button>

                    </div>
                </div>
            </body>
        </div>
    );
}

export default AdminHome;