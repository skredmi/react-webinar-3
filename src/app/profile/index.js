import { memo, useEffect, useState } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import ProfileInfo from "../../components/profile-info";
import { useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";

function Profile() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    user: state.profile.user,
    isLogin: state.login.isLogin,
    waiting: state.profile.waiting,
  }));

  useInit(async () => {
    await store.actions.profile.getUser();
  }, []);

  useEffect(() => {
    if (!select.isLogin) navigate("/login");
  }, [select.isLogin]);

  return (
    <PageLayout>
      <Auth />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileInfo user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
