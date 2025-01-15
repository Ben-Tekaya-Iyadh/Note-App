import Header from "../../../ui/page-components/Header";
import ReturnBtn from "../../../ui/ReturnBtn";

function DeletedHeader() {
  return (
    <Header title="Recently Deleted">
      <ReturnBtn />
      <p>actions</p>
    </Header>
  );
}

export default DeletedHeader;
