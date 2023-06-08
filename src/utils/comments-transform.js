export default function transformComments(comments) {
  // Фильтруем комментарии по типу parent и сортируем их по дате создания
  const parentComments = comments
    ?.filter((comment) => comment.parent._type === "article")
    .sort((a, b) => new Date(a.dateCreate) - new Date(b.dateCreate));
  const childComments = comments
    ?.filter((comment) => comment.parent._type === "comment")
    .sort((a, b) => new Date(a.dateCreate) - new Date(b.dateCreate));

  let transformedComments = [];

  // Проходим по родительским комментариям и ищем их дочерние комментарии
  parentComments?.forEach((parentComment, i) => {
    const childCommentsArr = childComments?.filter(
      (childComment) => childComment.parent._id === parentComment._id
    );

    // Добавляем родительский комментарий
    transformedComments.push(parentComment);

    // Добавляем дочерние комментарии 30px от правого края родительского комментария
    childCommentsArr?.forEach((childComment, j) => {
      childComment.paddingLeft = `${30 * (j + 1)}px`;
      transformedComments.push(childComment);
    });
  });

  return transformedComments;
}