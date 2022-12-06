export type Todo = {
    id: string;
    title: string;
    done: boolean;
}
export type CheckboxProps = {
    key: React.Key;
    label: React.ReactNode;
    checked: boolean
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}