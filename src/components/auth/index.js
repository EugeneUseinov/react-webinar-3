import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";

import "./style.css";

function Auth({ errors, onLogIn, t }) {
  const navigate = useNavigate();
  const [authInfo, setAuthInfo] = useState({ login: "", password: "" });
  const handleChangeName = (e) => {
    setAuthInfo({ ...authInfo, login: e.target.value });
  };
  const handleChangePassword = (e) => {
    setAuthInfo({ ...authInfo, password: e.target.value });
  };
  const callbacks = {
    onLogIn: () => onLogIn(authInfo, callbacks.changeRouteBySuccess),
    changeRouteBySuccess: () => {
      navigate("/");
    },
  };
  const cn = bem("Auth");
  return (
    <div className={cn()}>
      <div className={cn("header")}>{t("auth.header")}</div>
      <div className={cn("login")}>{t("auth.login")}</div>
      <input
        className={cn("input")}
        placeholder={t("auth.login-placeholder")}
        value={authInfo.login}
        onChange={handleChangeName}
      />
      <div className={cn("password")}>{t("auth.password")}</div>
      <input
        className={cn("input")}
        placeholder={t("auth.password-placeholder")}
        value={authInfo.password}
        onChange={handleChangePassword}
        type="password"
      />
      {errors?.map((error) => (
        <div className={cn("error")} key={error.message}>
          {error.message}
        </div>
      ))}
      <button onClick={callbacks.onLogIn}>{t("auth.sign-in")}</button>
    </div>
  );
}

Auth.propTypes = {
  errors: PropTypes.array,
  onLogIn: PropTypes.func,
  t: PropTypes.func,
};

Auth.defaultProps = {
  onLogIn: () => {},
  t: (text) => text,
};

export default memo(Auth);
