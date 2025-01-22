import { Link } from "react-router-dom";
import Header from "../../ui/page-components/Header";
import { CheckCircle, ArrowUUpLeft } from "@phosphor-icons/react";

function DetailsHeader ({changed, save}) {

  return (
    <Header>
      <Link to="../">
        <ArrowUUpLeft size={40} color="#b5b5b5" weight="duotone" />
      </Link>
      {changed && <CheckCircle
        size={40}
        color="#b5b5b5"
        weight="duotone"
        onClick={save}
      />}
    </Header>
  );
}

export default DetailsHeader;
