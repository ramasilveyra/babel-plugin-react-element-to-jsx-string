import React from 'react';

/* react-element-to-jsx-string: foo */
const Article = ({ title, content }) => (
  <article>
    <h1>{title}</h1>
    <p>{content}</p>
  </article>
);

export default Article;
