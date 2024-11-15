import React, { useState } from "react";
import styles from "./css_modules/Item.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Item({content}) {
const [check , setCheck] = useState(false);


console.log(content)
  function edit() {}

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        
        <div className={styles.checkbox}>
          <input type="checkbox" onChange={()=>{
            setCheck(!check);
          }}/>
        </div>
        <div className={check ? styles.strikethrough : null}>
        {content.task}
        </div>
      </div>
      <div className={styles.options}>
        <div className={styles.edit} onClick={edit}>
          <MdEdit size={20} />
        </div>
        <div>
          <MdDelete size={20} />
        </div>
      </div>
    </div>
  );
}

export default Item;
