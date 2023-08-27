import React, { useState } from "react";
import { createTodoApi } from "../../services/api.js";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTodoModal({setRefreshList}) {
  const [todoDesc, setTodoDesc] = useState("");

  const handleTodoSubmit = async () => {
    console.log("tododesc", todoDesc);
    if (todoDesc === "") {
      toast("Todo is required");
    }
    const result = await createTodoApi({ desc: todoDesc });
    console.log(result)
    if (result.status === 200 && result.data.status === 200) {
      toast("Todo Added");
      setRefreshList(new Date())
      setTodoDesc("");
    } else {
      toast(result.data.message);
    }
  };

  return (
    <div className="modal mt-5" id="exampleModal">
      
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Add new Todo</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setTodoDesc("");
              }}
            >
              <span arial-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea
                name=""
                className="form-control"
                rows={3}
                onChange={(e) => {
                  setTodoDesc(e.target.value);
                }}
                placeholder="Enter Task"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setTodoDesc("");
              }}
            >
              Close
            </button>
            <button className="btn btn-secondary" onClick={handleTodoSubmit} data-bs-dismiss="modal">
              Save Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoModal;
