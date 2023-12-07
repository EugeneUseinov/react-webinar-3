import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import BasketTool from "../../components/basket-tool";
import MainMenu from "../../components/main-menu";

function MenuBox(props) {
  const cn = bem("Menu-box");
  return (
    <div className={cn()}>
      <MainMenu home={props.home} />
      <BasketTool
        sum={props.sum}
        amount={props.amount}
        onOpen={props.onOpen}
        inBasket={props.inBasket}
        oneProduct={props.oneProduct}
        fewProduct={props.fewProduct}
        manyProduct={props.manyProduct}
        emptyBasket={props.emptyBasket}
        goTo={props.goTo}
      />
    </div>
  );
}

MenuBox.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  inBasket: PropTypes.string,
  oneProduct: PropTypes.string,
  fewProduct: PropTypes.string,
  manyProduct: PropTypes.string,
  emptyBasket: PropTypes.string,
  goTo: PropTypes.string,
};

MenuBox.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(MenuBox);
