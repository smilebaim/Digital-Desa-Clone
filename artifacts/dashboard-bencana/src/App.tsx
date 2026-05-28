import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/admin" component={AdminPage} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
