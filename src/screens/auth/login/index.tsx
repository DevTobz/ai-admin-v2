import React from "react";
import TextInput from "../../../components/elements/forms/TextInput";
import { FaRegEnvelope, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/elements/forms/SubmitButton";
import img from "../../../constant";
import { ILogin, ILoginError } from "../../../store/types/auth";
import { auth_user } from "../../../services/api/auth";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { get_cookie } from "../../../config/cookie";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(({ loading }) => loading.loading);
  const [show, showSet] = React.useState<"password" | "text">("password");
  const [data, dataSet] = React.useState<ILogin>({
    email: "",
    password: "",
  });
  const [error, errorSet] = React.useState<ILoginError>({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dataSet((prev) => ({ ...prev, [name]: value }));
    errorSet((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmitHandler = async () => {
    let validate: boolean = false;
    if (!data.email) {
      validate = true;
      errorSet((prev) => ({ ...prev, email: "warning" }));
    }
    if (!data.password) {
      validate = true;
      errorSet((prev) => ({ ...prev, password: "warning" }));
    }
    if (validate) return;
    const serial = await auth_user(data, dispatch, navigate);
    localStorage.setItem("@serial", serial);
    navigate("/");
  };

  const onLoad = React.useCallback(() => {
    if (get_cookie("@serial")) navigate("/");
  }, [navigate]);

  React.useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <div className="md:flex font-abel md:py-10 md:flex-row bg-[#F7F7F7] md:justify-center md:items-center h-screen">
      <div className="bg-[white] px-4 py-10 items-center md:mx-5 w-full md:max-w-[456px] border-none rounded-lg md:px-4 md:pt-8 md:pb-10 md:my-10">
        <div className="text-center w-full">
          <div className="flex justify-center w-full">
            <img src={img.logo} alt="logo" />
          </div>
          <h3 className="md:text-[28px] text-[22px]">Log In</h3>
          {/* <span className='text-lg font-[700] text-[#aaaaaa]'> to continue</span> */}
        </div>
        <div className="h-[100%] w-full mx-auto py-4 px-4 flex justify-center items-center">
          <div className="w-[100%] max-w-[400px]">
            <div>
              <TextInput
                label="EMAIL ADDRESS"
                placeholder="Enter Email"
                name="email"
                status={error.email}
                value={data.email}
                onChange={onChangeHandler}
                right_icon={
                  <FaRegEnvelope
                    size={20}
                    className="cursor-pointer"
                    color="#667185"
                  />
                }
              />
              <TextInput
                label="PASSWORD"
                placeholder="Enter Password"
                name="password"
                type={show}
                status={error.password}
                value={data.password}
                onChange={onChangeHandler}
                container="my-3"
                right_icon={
                  show === "text" ? (
                    <FaRegEyeSlash
                      size={20}
                      className="cursor-pointer"
                      onClick={() => showSet("password")}
                      color="#667185"
                    />
                  ) : (
                    <FaRegEye
                      size={20}
                      className="cursor-pointer"
                      onClick={() => showSet("text")}
                      color="#667185"
                    />
                  )
                }
              />
              <div className="flex justify-between items-center my-7 align-center">
                <label className="text-[15px]">
                  <input
                    type="checkbox"
                    className="text-secondary checked:bg-blue-500"
                  />{" "}
                  Remember me
                </label>
                <Link to="/login" className="text-secondary text-[14px]">
                  Forgot Password?
                </Link>
              </div>
              <div className="w-[100%]">
                <SubmitButton
                  title="Log into Account"
                  onSubmitHandler={onSubmitHandler}
                  loading={loading}
                  className="font-[400] text-white md:hover:bg-[white] md:hover:text-secondary hover:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
