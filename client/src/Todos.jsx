import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import styles from "./css_modules/Todos.module.css";
import Item from "./Item.jsx";
import axios from "axios";

function Todos() {
  const navigate = useNavigate();

  const [todos, settodos] = useState([]);
  const [name, setnames] = useState("NULL");
  const [input, setinput] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = axios
      .get("http://localhost:3000/gettodos", {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.todos.todos, "      ", res.data.name);
        settodos(res.data.todos.todos);
        setnames(res.data.name);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(todos, name);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("objectid");
    navigate("/");


  }
  function update() {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3000/addone",
        { task: input },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setinput("");
        settodos((e) => [...e, { task: input, completed: false }]);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className={styles.maincontainer}>
        <navbar>
          <div className={styles.navbar}>
            <div className={styles.logocontainer}> TODO-Master</div>
            <div className={styles.logout} onClick={logout}>
              Logout
            </div>
          </div>
        </navbar>
        <div className={styles.name}>{`hello ${name}`}</div>
        <div className={styles.todocontainer}>
          <div className={styles.enter}>
            <div className={styles.task}>
              <input
                type="text"
                id="input1"
                className={styles.textInput}
                value={input}
                placeholder="Enter your next task"
                onChange={(e) => setinput(e.target.value)}
              />
            </div>
            <div className={styles.done} onClick={update}>
              +
            </div>
          </div>
          <div className={styles.container}>
            {todos.map((todo, index) => (
              <Item content={todo} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todos;
