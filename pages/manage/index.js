import { useState } from "react";
import { useForm } from "react-hook-form";
import ManagerSidebar from "../../components/ManagerSidebar";
import ModalLogin from "../../components/ModalLogin";

export default function Login() {
  const { register, handleSubmit, errors, reset } = useForm();

  const [login, setlogin] = useState(true);

  return (
    <>
      <ManagerSidebar />
      <ModalLogin open={login} onClose={() => setlogin(false)} />
    </>
  );
}
