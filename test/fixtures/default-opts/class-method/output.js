import React from 'react';
/* react-element-to-jsx-string */

class Article extends React.Component {
  somethingElse() {
    return <article>
        <h1>{title}</h1>
        <p>{content}</p>
      </article>;
  }

}

Article.jsxString = "<article>\n  <h1>{title}</h1>\n  <p>{content}</p>\n</article>";
export default Article;
