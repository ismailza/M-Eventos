import { useState } from "react";

const AddOptionModal = ({ options, onOptionAdded, onClose }) => {
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim() !== "" && !options.includes(newOption)) {
      onOptionAdded(newOption);
    }
    setNewOption("");
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add new option</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <input type="text" value={newOption} onChange={(e) => setNewOption(e.target.value)} className="form-control" placeholder="Enter a new option"/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={handleAddOption}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOptionModal;
