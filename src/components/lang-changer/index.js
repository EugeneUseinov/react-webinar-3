import PropTypes from "prop-types";
import "./style.css";

export const LangChanger = ({ onLangChange, lang }) => {
  return (
    <div className="Lang-changer">
      <select value={lang} onChange={onLangChange}>
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

LangChanger.propTypes = {
  lang: PropTypes.string,
  onLangChange: PropTypes.func.isRequired,
};

LangChanger.defaultProps = {
  onLangChange: () => {},
};
