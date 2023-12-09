import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function MainMenu({ home, homeLink }) {
  const cn = bem("Main-menu");
  return (
    <div className={cn()}>
      <Link to="/" onClick={homeLink()} className={cn("home")}>
      {home}
      </Link>
    </div>
  );
}

MainMenu.propTypes = {
  home: PropTypes.string,
  homeLink: PropTypes.func,
};

MainMenu.defaultProps = {
  homeLink: () => {},
}

export default memo(MainMenu);
