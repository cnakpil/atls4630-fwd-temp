export type Todo = {
    id: string;
    title: string;
    done: boolean;
}
export type CheckboxProps = {
    key: React.Key;
    label: React.ReactNode;
    checked: boolean
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    handleClick: React.MouseEventHandler;
}