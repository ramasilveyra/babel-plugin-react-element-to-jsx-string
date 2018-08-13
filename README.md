<div align="center">
  <a href="https://www.npmjs.com/package/babel-plugin-react-element-to-jsx-string">
    <img src="https://img.shields.io/npm/v/babel-plugin-react-element-to-jsx-string.svg?maxAge=86400" alt="Last npm Registry Version">
  </a>
  <a href="https://travis-ci.org/ramasilveyra/babel-plugin-react-element-to-jsx-string?branch=master">
    <img src="https://travis-ci.org/ramasilveyra/babel-plugin-react-element-to-jsx-string.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://codecov.io/github/ramasilveyra/babel-plugin-react-element-to-jsx-string?branch=master">
    <img src="https://img.shields.io/codecov/c/github/ramasilveyra/babel-plugin-react-element-to-jsx-string.svg?branch=master" alt="Code coverage">
  </a>
</div>

<h1 align="center">babel-plugin-react-element-to-jsx-string</h1>

<blockquote align="center">Turn a ReactElement into the corresponding JSX string at build time.</blockquote>

<h2 align="center">Table of Contents</h2>

- [Example](#example)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

<h2 align="center">Example</h2>

Mark your React Component with the comment `/* react-element-to-jsx-string */`:

```js
import React from 'react';

/* react-element-to-jsx-string */
const Article = ({ title, content }) => (
  <article>
    <h1>{title}</h1>
    <p>{content}</p>
  </article>
);

export default Article;
```

And the JSX as string will be added next to your React Component:

```js
import React from 'react';

/* react-element-to-jsx-string */
const Article = ({ title, content }) => (
  <article>
    <h1>{title}</h1>
    <p>{content}</p>
  </article>
);
Article.jsxString = "<article>\n  <h1>{title}</h1>\n  <p>{content}</p>\n</article>";

export default Article;
```

<h2 align="center">Install</h2>

**Node.js v8 or newer** is required.

Via the yarn client:

```bash
$ yarn add --dev babel-plugin-react-element-to-jsx-string
```

Via the npm client:

```bash
$ npm install --save-dev babel-plugin-react-element-to-jsx-string
```

<h2 align="center">Usage</h2>

1. Add to your babel config this plugin:

```json
{
  "plugins": ["babel-plugin-react-element-to-jsx-string"]
}
```

2. Add **before** a React Component a comment with `/* react-element-to-jsx-string */`, and the first JSX code will be added as string in a property called `jsxString`.

3. What about changing the default property name? That can be done in two ways:

- Via the flag comment:

```js
/* react-element-to-jsx-string: fooBar */
```

- Via the plugin options:

```json
{
  "plugins": [["babel-plugin-react-element-to-jsx-string", { "id": "fooBar" }]]
}
```

<h2 align="center">Contribute</h2>

Feel free to dive in! [Open an issue](https://github.com/ramasilveyra/babel-plugin-react-element-to-jsx-string/issues/new) or submit PRs.

babel-plugin-react-element-to-jsx-string follows the [Contributor Covenant](https://contributor-covenant.org/version/1/4/) Code of Conduct.

<h2 align="center">License</h2>

[MIT](LICENSE.md)
