import { memo } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

function AuthRequire({ children }) {
  const store = useStore();
  useInit(
    () => {
      store.actions.auth.initUserFromStorage();
    },
    [],
    true
  );
  const select = useSelector((state) => ({
    user: state.auth.userName,
  }));
  return select.user ? children : <Navigate to={"/login"} replace />;
}

AuthRequire.propTypes = {
  children: PropTypes.node,
};

export default memo(AuthRequire);
