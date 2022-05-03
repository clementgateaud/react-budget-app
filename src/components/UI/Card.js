import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${classes.card} ${props.className
        .split(" ")
        .map((e) => classes[e])
        .join(" ")}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
