const jsdom = require('jsdom').jsdom;
const doc = jsdom('<div id="app"></div>');
const win = doc.defaultView;
global.window = win;
global.document = doc;
global.navigator = win.navigator;

const React = require('react');
const ReactDOM = require('react-dom');

const facify = require('./index');
const fs = require('fs');
const Mkdir = facify(fs.mkdir);
const WriteFile = facify(fs.writeFile);
const ReadFile = facify(fs.readFile);
const StdoutWrite = facify(process.stdout.write, process.stdout);

const SayHello = (props) => (
  <Mkdir args={['out']}>
    {(err) => err
      ? (
        <StdoutWrite args={[err.toString()]} />
      ) : (
        <WriteFile args={['out/hello.txt', 'Hello World!']}>
          {(err) => err
            ? (
              <StdoutWrite args={[err.toString()]} />
            ) : (
              <ReadFile args={['out/hello.txt']}>
                {(err, data) => err
                  ? (
                    <StdoutWrite args={[err.toString()]} />
                  ) : (
                    <StdoutWrite args={[data]} />
                  )
                }
              </ReadFile>
          )}
        </WriteFile>
      )}
  </Mkdir>
);

ReactDOM.render(<SayHello />, window.document.getElementById('app'));
