import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import { LandingPage, ToDoPage } from "./pages";
import './App.css';


//=====================//
//      Functions      //
//=====================//

// Creates Apollo Client http link for GraphQL operations
const httpLink = createHttpLink({
  uri: "/graphql"
});

// Sets authentication into context
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
});

// Instantiates the client object and the cache object with some specific options
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({})
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Container fluid>
            <main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/my_todos" element={<ToDoPage />} />
              </Routes>
            </main>
          </Container>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
