import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import commentsActions from "../../store-redux/comments/actions";
import Comments from "../../components/comments";

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  const [isOpenAnswer, setIsOpenAnswer] = useState();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
      reload: state.comments.reload,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const exists = useSelector((state) => state.session.exists);
  const user = useSelector((state) => state.session.user);

  const { t } = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    addComment: useCallback((text) => {
      dispatch(commentsActions.add(text, "article", params.id));
    }, []),

    addAnswer: useCallback(
      (parentId) => (text) => {
        dispatch(commentsActions.add(text, "comment", parentId));
      },
      []
    ),
    handleChangeOpenAnswer: useCallback((commentId) => {
      setIsOpenAnswer(commentId);
    }, []),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Comments
        comments={select.comments}
        exists={exists}
        user={user}
        addComment={callbacks.addComment}
        addAnswer={callbacks.addAnswer}
        handleChangeOpenAnswer={callbacks.handleChangeOpenAnswer}
        isOpenAnswer={isOpenAnswer}
      />
    </PageLayout>
  );
}

export default memo(Article);
