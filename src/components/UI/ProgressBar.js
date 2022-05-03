import classes from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  return (
    <div className={classes.progressBar}>
      <div
        className={`${classes.progressBarBar} ${classes[props.variant]}`}
        style={{ width: `${(props.now / props.max)*100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
