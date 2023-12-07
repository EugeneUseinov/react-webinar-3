import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function ItemInfo(props) {
  const {
    description = props.item.description,
    country = props.item.madeIn?.title,
    countryCode = props.item.madeIn?.code,
    category = props.item.category?.title,
    edition = props.item.edition,
    price = props.item.price,
    id,
  } = props;
  const cn = bem("Item-info");
  const callbacks = {
    onAdd: (e) => props.onAdd(id),
  };

  return (
    <div className={cn()}>
      <div className={cn("description")}>{description}</div>
      <div className={cn("description")}>
      {props.countryField}:
        <span className="bold">
          {country}
          {` (${countryCode})`}
        </span>
      </div>
      <div className={cn("description")}>
      {props.categoryField}:<span className="bold">{category}</span>
      </div>
      <div className={cn("description")}>
      {props.editionField}:<span className="bold">{edition}</span>
      </div>
      <div className={cn("price")}>{props.priceField}{`: ${numberFormat(price)} ₽`}</div>
      <button className={cn("button")} onClick={callbacks.onAdd}>
      {props.add}
      </button>
    </div>
  );
}

ItemInfo.propTypes = {
  country: PropTypes.string,
  countryCode: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
  countryField: PropTypes.string,
  categoryField: PropTypes.string,
  editionField: PropTypes.string,
  priceField: PropTypes.string,
  add: PropTypes.string,
};

ItemInfo.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemInfo);
