import path from 'path';
import pluginTester from 'babel-plugin-tester';
import babelPluginReactElementToJsxString from '../src';

pluginTester({
  plugin: babelPluginReactElementToJsxString,
  fixtures: path.join(__dirname, 'fixtures/default-opts'),
  filename: __filename,
  babelOptions: {
    parserOpts: {
      sourceType: 'module',
      plugins: ['jsx']
    }
  },
  tests: [
    {
      fixture: 'fixtures/custom-opts/id/code.js',
      outputFixture: 'fixtures/custom-opts/id/output.js',
      pluginOptions: {
        id: 'fooBar'
      }
    }
  ]
});
