import React from 'react';

/* react-element-to-jsx-string */
class Article extends React.Component {
  render() {
    return (
      <article>
        <h1>{title}</h1>
        <p>{content}</p>
      </article>
    );
  }
}

export default Article;
