import "./Checkbox.css";
import trashIcon from "../img/trash.svg";
import { CheckboxProps } from "../types";

const Checkbox = ({ label, checked, handleChange, handleClick }: CheckboxProps) => {
    return (
        <div className="checkbox-wrapper">
            <img src={trashIcon} alt="trashcan icon" onClick={handleClick} />
            <label className="checkbox-label">
                <input type="checkbox" checked={checked} onChange={handleChange} />
                <div>{label}</div>
            </label>
        </div>
    );
};
export default Checkbox;