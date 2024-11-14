import React, { useEffect } from "react";
import styles from "./css_modules/Todos.module.css";
import Item from "./Item.jsx";
import axios from 'axios';



function Todos() {
let name = "jake"
useEffect(
  () => {
    const token = localStorage.getItem('token')
 const decoded= axios.get("http://localhost:3000/gettodos",
    {headers:{
      authorization : `bearer ${token}`
    },}
  ).then(res=>console.log(res.data.todos.todos[0].task))
  .catch(err=>console.log(err))
},[])

  function logout(){ 
  }


  return (
    <>
    <div className={styles.maincontainer}>
      <navbar >
        <div className={styles.navbar}>
          <div className={styles.logocontainer}> TODO-Master</div>
          <div className={styles.logout} onClick={logout}>Logout</div>
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
          placeholder="Enter your next task"
        />
      </div>
      <div className={styles.done}>+</div>
    </div>
    <div className={styles.container}>
<Item />
    </div>
 </div>

    </div>
    
    
    </>
  );
}

export default Todos;
