import styles from "../../Styles/UI/Card.module.css";

import PetsIcon from "@mui/icons-material/Pets";
import { LocationOn } from "@mui/icons-material";
function Card(props) {
  return (
    <div
      className={`${styles["card"]}
    ${styles[props.isSelected ? "card__selected" : ""]}
    `}
      onClick={props.onClick}
    >
      <div className={styles["card__content"]}>
        <img src={props.img} alt={props.breed} />
        <div className={styles["dog__info"]}>
          <div className={styles["dog__age"]}>
            {<PetsIcon />}
            <h5>
              {props.name} ({props.breed})
            </h5>
          </div>

          <div className={styles["age__zip"]}>
            <h3>{props.age} yrs</h3>
            <div>
              {<LocationOn />}
              <h5>{props.zip_code}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
