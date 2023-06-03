import { memo, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import ProfileInfo from "../../components/profile-info";
import { Navigate } from "react-router-dom";
import useStore from "../../hooks/use-store";

function Profile() {
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector((state) => ({
    user: state.profile.user,
    isLogin: state.login.isLogin,
  }));

  useEffect(() => {
    store.actions.profile.getUser();
  }, []);

  if (!select.isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <PageLayout>
      <Auth />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileInfo user={select.user} t={t} />
    </PageLayout>
  );
}

export default memo(Profile);
