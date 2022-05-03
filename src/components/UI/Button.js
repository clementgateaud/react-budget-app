import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.button} ${classes[props.variant]}`}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
