import styles from "../Styles/HomePage.module.css";

function Breed({ breed, onClick, isSelected }) {
  return (
    <div
      className={`${styles["breed"]}
      ${styles[isSelected ? "breedSelected" : ""]}
      `}
      onClick={onClick}
    >
      {breed}
    </div>
  );
}

export default Breed;
