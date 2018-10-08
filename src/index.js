import generator from '@babel/generator';

const NAME = 'react-element-to-jsx-string';
const DEFAULT_ASSIGNMENT_ID = 'jsxString';

export default function babelPluginReactElementToJsxString({ types: t }, options = {}) {
  const visitorNames = 'VariableDeclaration|FunctionDeclaration|ClassDeclaration|ClassMethod';
  return {
    name: NAME,
    visitor: {
      [visitorNames](path) {
        const jsx = getJSX(t, path);
        if (!jsx.has) {
          return;
        }
        const comment = getComment(path);
        if (!comment.has) {
          return;
        }
        const name = getName(t, path);
        if (!name.name) {
          return;
        }
        const userId = options.id;
        const customAssignment = `${NAME}:`;
        const customAssignmentLength = customAssignment.length;
        const customAssignmentIDIndex = comment.value.indexOf(customAssignment);
        const assignmentID =
          customAssignmentIDIndex > -1
            ? comment.value.slice(customAssignmentIDIndex + customAssignmentLength).trim()
            : userId || DEFAULT_ASSIGNMENT_ID;
        const { code } = generator(jsx.path.node);
        const codeWithIndentFixed = hackyIndentFix(code);
        const assignJSXString = t.expressionStatement(
          t.assignmentExpression(
            '=',
            t.memberExpression(t.identifier(name.name), t.identifier(assignmentID)),
            t.stringLiteral(codeWithIndentFixed)
          )
        );
        name.assigntmentRoot.insertAfter(assignJSXString);
      }
    }
  };
}

function getJSX(t, path) {
  let has = false;
  let jsxPath;
  path.traverse({
    JSXElement(childPath) {
      has = true;
      jsxPath = childPath;
      childPath.stop();
    }
  });
  return { has, path: jsxPath };
}

function getComment({ node: { leadingComments } }) {
  if (!leadingComments) {
    return { has: false, value: undefined };
  }
  const found = leadingComments.find(c => c.value.includes(NAME));
  return { has: !!found, value: found ? found.value : undefined };
}

function getName(t, path) {
  if (t.isVariableDeclaration(path)) {
    return { name: path.get('declarations.0').node.id.name, assigntmentRoot: path };
  }
  if (t.isClassMethod(path)) {
    const classDeclarationPath = path.findParent(parentPath => t.isClassDeclaration(parentPath));
    return { name: classDeclarationPath.node.id.name, assigntmentRoot: classDeclarationPath };
  }
  return { name: path.node.id.name, assigntmentRoot: path };
}

function hackyIndentFix(code) {
  const codeArr = code.split('\n');
  const codeLastLineIndex = codeArr.length - 1;
  const codeLastLine = codeArr[codeLastLineIndex];
  const codeLastLineArr = codeLastLine.split('');
  const codeIndent = codeLastLineArr.reduce(
    (acc, char) => {
      if (acc.break === true) {
        return acc;
      }
      if (char === ' ') {
        return Object.assign(acc, { substraction: acc.substraction + 1 });
      }
      return Object.assign(acc, { break: true });
    },
    { substraction: 0, break: false }
  );
  const codeFixed = codeArr
    .map(line => {
      if (line.startsWith(' ')) {
        return line.slice(codeIndent.substraction);
      }
      return line;
    })
    .join('\n');
  return codeFixed;
}
