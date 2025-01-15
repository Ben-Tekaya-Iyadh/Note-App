import { CaretLeft, Trash } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { endSelection } from "../lib/features/selectionSlice";
import { fetchData } from "../util/fetcher";
import { useNavigate } from "react-router-dom";
import ReturnBtn from "./ReturnBtn";

function SelectionMenu({ size, color }) {
  const { selectedItems } = useSelector((state) => state.selection);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function handleDelete() {
    if (selectedItems.length === 0) {
      return dispatch(endSelection());
    }

    const response = await fetchData(
      "notes",
      "DELETE",
      {
        deleteList: selectedItems,
      }
    );
 
    dispatch(endSelection());
    const nav = await navigate(".", {replace: true});
  }

  function handleCancel() {
    dispatch(endSelection());
  }

  return (
    <>
      <ReturnBtn size={size} color={color} action={handleCancel} />
      <Trash
        size={size}
        color={color}
        weight="bold"
        onClick={handleDelete}
        style={{ padding: "15px" }}
      />
    </>
  );
}

export default SelectionMenu;
