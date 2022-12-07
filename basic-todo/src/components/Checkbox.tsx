import "./Checkbox.css";

import { CheckboxProps } from "../types";

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
    // const defaultChecked = checked ? checked : false;
    // const [isChecked, setIsChecked] = useState(defaultChecked);

    return (
        <div className="checkbox-wrapper">
            <label className="checkbox-label">
                <input type="checkbox" checked={checked} onChange={onChange} />
                <span>{label}</span>
            </label>
            {/* <p>{checked.toString()}</p> */}
        </div>
    );
};
export default Checkbox;