import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import CourseForm from './components/CourseForm.component';
import { API_ENDPOINT } from './constants';
import { trpc } from './utils/trpc';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: API_ENDPOINT,
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <CourseForm />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
