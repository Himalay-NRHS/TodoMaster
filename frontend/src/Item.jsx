import React, { useState } from "react";
import styles from "./css_modules/Item.module.css";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://todo-backend-git-main-himalays-projects-3e1c1ff1.vercel.app"||process.env.REACT_APP_BACKEND_URL; // Use environment variable for backend URL

function Item({ content }) {
  const [check, setCheck] = useState(content.completed);
  const navigate = useNavigate();

  function update() {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${BASE_URL}/update`, // Use the base URL from environment variables
        { task: content.task, completed: !check, taskid: content._id },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => console.log("Task updated"))
      .catch((err) => console.log("Error updating task", err));
  }

  function deleteone() {
    const token = localStorage.getItem("token");

    axios
      .put(
        `${BASE_URL}/delete`, // Use the base URL from environment variables
        { taskid: content._id },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Task deleted");
        navigate(0); // Refresh the page
      })
      .catch((err) => console.log("Error deleting task", err));
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            defaultChecked={check}
            onChange={async () => {
              await setCheck(!check);
              update();
            }}
          />
        </div>
        <div className={check ? styles.strikethrough : null}>
          {content.task}
        </div>
      </div>
      <div className={styles.options}>
        <div onClick={deleteone}>
          <MdDelete size={20} />
        </div>
      </div>
    </div>
  );
}

export default Item;
