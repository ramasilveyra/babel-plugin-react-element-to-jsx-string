import React from 'react';

class Article extends React.Component {
  /* react-element-to-jsx-string */
  aSomethingElse() {
    return <div>asd</div>;
  }
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
