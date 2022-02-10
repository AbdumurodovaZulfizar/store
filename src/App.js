import'./App.css';
import React from "react";
import SVG3 from './images/svg3.png';
import SVG19 from './images/svg19.png';
import VECTOR from './images/Vector.png';
import Women from './Women';
import {
  BrowserRouter as Router,
  Routes,
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
        <div className='navbar'>
          <div>
            <nav>
              <Link to="/" className='menu_item'>Women</Link>
              <Link to="/men" className='menu_item'>Men</Link>
              <Link to="/kids" className='menu_item'>Kids</Link>
            </nav>
          </div>
          <div>
            <nav>
              <div>
                <Link to="/women" className='menu_item logo'>
                  <img src={SVG3} className='logo_item_1' alt='logo' />
                  <img src={SVG19} className='logo_item_2' alt='logo' />
                </Link>
              </div>
            </nav>
          </div>
          <div>
            <ApolloProvider client={client}>
              <GetCurrencies className='menu_item'/>
            </ApolloProvider>
            <Link to="/cart" className='menu_item'>
              <img src={VECTOR} alt='vector'></img>
            </Link>
          </div>
          </div>
          <Routes>
            {/* <Route path="/men" component={Men} />
            <Route path="/kids" component={Kids} />
            <Route path='/cart' component={cart} /> */}
            <Route path='/women' element={<Women />} />
            <Route path="/" element={<Women />} />
          </Routes>
        
      </Router>
    )
  };
}

export default App;
