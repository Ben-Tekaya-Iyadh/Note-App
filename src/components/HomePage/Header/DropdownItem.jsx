import { Link } from "react-router-dom";
import classes from "./DropdownItem.module.css";

function DropdownItem({ children, icon, link, style, ...props}) {
  const content = link ? (
    <Link to={link}>
      {icon}
      <p>{children}</p>
    </Link>
  ) : (
    <>
      {icon}
      <p>{children}</p>
    </>
  );
  return (
    <div {...props} className={classes.dropdown_item} style={style}>
      {content}
    </div>
  );
}

export default DropdownItem;
