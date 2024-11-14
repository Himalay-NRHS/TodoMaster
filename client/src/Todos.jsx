import React from "react";
import styles from "./Todos.module.css";
function Todos() {
let name = "jake"

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
    </div>
 </div>

    </div>
    
    
    </>
  );
}

export default Todos;
