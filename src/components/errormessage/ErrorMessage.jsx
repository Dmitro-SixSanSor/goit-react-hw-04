import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className={css.message}>
      <h3 className={css.title}>{message}</h3>
      <p className={css.text}>
        When entering words, please put spaces between them and use the layout
        with the input language.
      </p>
    </div>
  );
};
export default ErrorMessage;