import {memo} from "react";
import PropTypes from "prop-types";
import { LangChanger } from "../../components/lang-changer";
import './style.css';

function Head({title, lang, onLangChange}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LangChanger className='Head-language' lang={lang} onLangChange={onLangChange} />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  onLangChange: PropTypes.func.isRequired,
};

Head.defaultProps = {
  onLangChange: () => {},
};

export default memo(Head);
