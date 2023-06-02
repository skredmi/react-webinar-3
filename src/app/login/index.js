import { memo, useCallback, useState } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import Auth from "../../containers/auth";

function Login() {
  const store = useStore();

  const { t } = useTranslate();

  const select = useSelector((state) => ({
    login: state.login.login,
    password: state.login.password,
    error: state.login.error,
  }));

  const callbacks = {
    onLogin: useCallback(
      (login, password) => store.actions.login.login(login, password),
      [store]
    ),
  };

  const [data, setData] = useState({
    login: select.login,
    password: select.password,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { login, password } = data;

    if (!login || !password) {
      return;
    }
    callbacks.onLogin(login, password);
    setData({ login: "", password: "" });
  };

  return (
    <PageLayout>
      <Auth />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        data={data}
        error={select.error}
        t={t}
      />
    </PageLayout>
  );
}

export default memo(Login);
