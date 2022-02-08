import './App.css';
import React from "react";
import SVG3 from './images/svg3.png';
import SVG19 from './images/svg19.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      symbol
    }
  }
`;

function GetCurrencies() {
  const { loading, error, data } = useQuery(GET_CURRENCIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return(<select name="currencies" id="currencies">
      {data.currencies.map(({ symbol }) => (
        <option key={symbol} value={symbol}>{symbol}</option>
    ))};
  </select>)

}


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <nav>
              <Link to="/">Women</Link>
              <Link to="/men">Men</Link>
              <Link to="/kids">Kids</Link>
            </nav>
          </div>
          <div>
            <nav>
              <div>
                <Link to="/home">
                  <img src={SVG3} className='' alt='logo' />
                  <img src={SVG19} className='' alt='logo' />
                </Link>
              </div>
            </nav>
          </div>
          <div>
            <ApolloProvider client={client}>
              <GetCurrencies />
            </ApolloProvider>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </div>

          {/* <Switch>
            <Route path="/men" component={Men} />
            <Route path="/kids" component={Kids} />
            <Route path='/cart' component={cart} />
            <Route path='/home' component={Women} />
            <Route path="/" component={Women} />
          </Switch> */}
        </div>
      </Router>
    )
  };
}

export default App;
