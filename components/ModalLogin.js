import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function ModalLogin() {
  const { register, handleSubmit, errors, reset } = useForm();
  const router = useRouter();
  const account = { username: "Jexy", password: "12345" };

  function onSubmitForm(val) {
    console.log(val);
    console.log(account);
    if (
      val.username === account.username &&
      val.password === account.password
    ) {
      router.push("/manage/StockM");
    } else {
      alert("Username or password wrong");
    }
  }

  return (
    <div className="Modal-Overlay">
      <div className="Modal-Login-container">
        <form className="form-login" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="form-input-login">
            <label>ID</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              ref={register}
            />
          </div>
          <div className="form-input-login">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              ref={register}
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
