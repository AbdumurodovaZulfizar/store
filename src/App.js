import'./App.css';
import React from "react";
import SVG3 from './images/svg3.png';
import SVG19 from './images/svg19.png';
import VECTOR from './images/Vector.png';
import Women from './Women';
import DetailItem from './DeatilItem';
import { createBrowserHistory } from 'history';
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

window.localStorage.setItem('card', ['emty'])

const buttons = ['Women', 'Men', 'Kids'];

function GetCurrencies(props) {
  const { loading, error, data } = useQuery(GET_CURRENCIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return(<select name="currencies" id="currencies" onChange={props.click}>
      {data.currencies.map(({ symbol }) => (
        <option key={symbol} value={symbol}>{symbol}</option>
    ))};
  </select>)

}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'Women',
      currency: '$',
    }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e) {
    this.setState(() => ({
      currency: e.target.value
    }))
  }

  render() {
    const history = createBrowserHistory();
    return (
      <Router history={history}>
        <div className='navbar'>
          <div>
            <nav>
              {
                buttons.map(function (name) {
                  return (
                    <Link to={{
                      pathname: '/' + name,
                    }} className={name === 'Women' ? 'menu_item active': 'menu_item'} onClick={() => this.setState(() => ({active: name}))} value={name} key={name}>{ name }</Link>
                  )
                })
              }
            </nav>
          </div>
          <div>
            <nav>
              <div>
                <Link to="/" className='menu_item logo'>
                  <img src={SVG3} className='logo_item_1' alt='logo' />
                  <img src={SVG19} className='logo_item_2' alt='logo' />
                </Link>
              </div>
            </nav>
          </div>
          <div>
            <ApolloProvider client={client}>
              <GetCurrencies className='menu_item' click={ this.handleClick }/>
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
          <Route path='/Women' element={<Women currency={ this.state.currency }/>} />
          <Route path="/" element={<Women currency={this.state.currency} />} />
          <Route path="/:id" element={<DetailItem currency={this.state.currency}/>} />
          </Routes>
        
      </Router>
    )
  };
}

export default App;
