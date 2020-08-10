import React, { Fragment, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';


const App = lazy(() => import('./App'));

const LoadingMessage = () => "I'm loading...";

const Index = () => (
  <Suspense fallback={<LoadingMessage />}>
    <App />
  </Suspense>
);
const rootElement = document.getElementById('root');
ReactDOM.render(<Index />, rootElement);

//Attach root container
// debugContextDevtool(rootElement);
