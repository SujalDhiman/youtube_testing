import { useState } from "react";
import { FileUpload } from "./FileUpload";
export function Modal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open
      </button>

      {modalOpen && <FileUpload setOpenModal={setModalOpen} />}
    </div>
  );
}
