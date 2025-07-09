import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PredictFuture from '../components/student/PredictFuture';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'predict-future',
        element: <PredictFuture />,
      },
      // ... existing routes ...
    ],
  },
]); 