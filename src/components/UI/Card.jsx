import React from "react";
import styles from "../../Styles/UI/Card.module.css";
function Card(props) {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__content"]}>
        <img src={props.img} alt={props.breed} />

        <h4>
          {props.name} ({props.breed})
        </h4>
        <div className={styles["age__zip"]}>
          <h5>{props.age} years</h5>
          <h5>{props.zip_code}</h5>
        </div>
      </div>
    </div>
  );
}

export default Card;
