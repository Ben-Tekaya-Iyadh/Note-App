import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";


function ReturnBtn({color, size, action}) {
    const navigate = useNavigate()

    return (       
    <CaretLeft
        size={size}
        color={color}
        weight="bold"
        onClick={action ? action : ()=> navigate("/")}
        style={{ padding: "15px" }}
      /> );
}

export default ReturnBtn;