import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginForm({ data, error, handleChange, handleSubmit, t }) {
  const cn = bem("LoginForm");
  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h3 className={cn("title")}>{t("loginForm.title")}</h3>
      <label className={cn("label")}>
        {t("loginForm.login")}
        <input
          type="text"
          className={cn("input")}
          onChange={handleChange}
          value={data.login}
          name="login"
        />
      </label>
      <label className={cn("label")}>
        {t("loginForm.password")}
        <input
          type="password"
          className={cn("input")}
          onChange={handleChange}
          value={data.password}
          name="password"
        />
      </label>
      {error && <div className={cn("error")}>{error}</div>}
      <button type="submit">{t("loginForm.enter")}</button>
    </form>
  );
}

LoginForm.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  handleChange: () => {},
  handleSubmit: () => {},
  t: (text) => text,
};

export default memo(LoginForm);
