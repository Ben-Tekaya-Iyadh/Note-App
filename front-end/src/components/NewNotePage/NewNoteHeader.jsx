import Header from "../../ui/page-components/Header";

function NewNoteHeader({ title }) {
  return (
    <Header>
      <p
        style={{
          margin: "auto",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {title}
      </p>
    </Header>
  );
}

export default NewNoteHeader;
