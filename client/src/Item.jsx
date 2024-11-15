import React, { useState } from "react";
import styles from "./css_modules/Item.module.css";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Item({content,key}) {
const [check , setCheck] = useState(content.completed);
const navigate = useNavigate();
function update(){

  const token = localStorage.getItem("token");
  axios
    .put(
      "http://localhost:3000/update",
      { task: content.task, completed: !check,taskid:content._id },
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {console.log("update aDDED")})
    .catch((err) => console.log(err));
}

function deleteone(){
const token = localStorage.getItem("token");

  axios
  .put(
    "http://localhost:3000/delete",
    { taskid: content._id },
    {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
  )
  .then((res) => {console.log("deleted");navigate(0)})
  .catch((err) => console.log( "nah err in axios bruhh",err));


}
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        
        <div className={styles.checkbox}>
          <input type="checkbox"  defaultChecked={check} onChange={ async ()=>{
           await setCheck(!check);
            update();
           
          }}/>
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
