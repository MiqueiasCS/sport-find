import { Container, InputContainer } from "./styles";
import { IconType } from "react-icons";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface IInputProps {
  label: string;
  icon?: IconType;
  register: UseFormRegister<FieldValues>;
  name: string;
  error: string;
  type?: string;
  placeholder?: string;
}

const Input = ({
  label,
  icon: Icon,
  register,
  name,
  error,
  type,
  placeholder,
}: IInputProps) => {
  return (
    <Container>
      <div>
        {label} {!!error && <span> - {error}</span>}
      </div>
      <InputContainer isErrored={!!error}>
        {Icon && <Icon size={20} />}
        <input type={type} placeholder={placeholder} {...register(name)} />
      </InputContainer>
    </Container>
  );
};

export default Input;
