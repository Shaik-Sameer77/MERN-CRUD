import React, { useState } from "react";
import { updateTodoApi } from "../../services/api.js";
import { toast } from "react-toastify";

function EditTodoModal({ todo, setRefreshList, closeModal, modalId }) {
  const [editedDesc, setEditedDesc] = useState(todo.desc);

  const handleEditSubmit = async () => {
    if (editedDesc === "") {
      toast("Todo description is required");
      return;
    }

    const result = await updateTodoApi({
      todo_id: todo._id,
      desc: editedDesc,
    });
    console.log(result);
    if (result.status === 200) {
      toast("Todo Updated");
      setRefreshList(new Date());
    } else {
      toast(result.data.message);
    }
  };

  return (
    <div className="modal" id={modalId} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Todo</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea
                className="form-control"
                rows={3}
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
                placeholder="Edit Task"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEditSubmit}
              data-bs-dismiss="modal"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTodoModal;
