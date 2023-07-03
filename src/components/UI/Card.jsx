import styles from "../../Styles/UI/Card.module.css";
function Card(props) {
  return (
    <div
      className={`${styles["card"]}
    ${styles[props.isSelected ? "cardSelected" : ""]}
    `}
      onClick={props.onClick}
    >
      <div className={styles["card__content"]}>
        <img src={props.img} alt={props.breed} />
        <h4>
          Name: {props.name} ({props.breed})
        </h4>
        <div className={styles["age__zip"]}>
          <h5>Age: {props.age}</h5>
          <h5>Location: {props.zip_code}</h5>
        </div>
      </div>
    </div>
  );
}

export default Card;
