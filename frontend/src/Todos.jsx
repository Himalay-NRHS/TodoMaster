import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./css_modules/Todos.module.css";
import Item from "./Item.jsx";
import axios from "axios";

const BASE_URL = "https://todo-backend-git-main-himalays-projects-3e1c1ff1.vercel.app"||process.env.REACT_APP_BACKEND_URL; //dont know why but .env variables arent working for me here, so i hardcoded all the variables here


function Todos() {
  const navigate = useNavigate();

  const [todos, settodos] = useState([]);
  const [name, setnames] = useState("NULL");
  const [input, setinput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}/gettodos`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        settodos(res.data.todos.todos);
        setnames(res.data.name);
      })
      .catch((err) => console.log(err));
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("objectid");
    navigate("/");
  }

  function update() {
    const token = localStorage.getItem("token");
    if (input.length === 0) {
      alert("Enter something");
      return;
    }
    axios
      .post(
        `${BASE_URL}/addone`,
        { task: input },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setinput("");
        settodos((e) => [...e, { task: input, completed: false }]);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className={styles.maincontainer}>
        <div className={styles.navbar}>
          <div className={styles.logocontainer}>TODO-Master</div>
          <div className={styles.logout} onClick={logout}>
            Logout
          </div>
        </div>
        <div className={styles.name}>{`Hello ${name}`}</div>
        <div className={styles.todocontainer}>
          <div className={styles.enter}>
            <div className={styles.task}>
              <input
                type="text"
                id="input1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    update();
                  }
                }}
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
            {todos.map((todo, key) => (
              <Item content={todo} key={key} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todos;
