import'./App.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

const GET_CATEGORIES = gql`
{
  categories {
    name
  }
}
`;

const GET_PRODUCTS = gql`
{
  categories {
    products {
      name
      id
      category
      gallery
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
}
`

function GetCategories(props) {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
      <select name="categories" className='category' id="categories" onChange={props.click}>
      {data.categories.map(({ name }) => (
        <option key={name} value={name} >{name.charAt(0).toUpperCase() + name.slice(1)}</option>
    ))};
  </select>
  )

}

function GetProducts(props) {
  const { loading, error, data } = useQuery(GET_PRODUCTS)
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  if (props.category === 'all') {
    return (
      <div className='container'>
        {
          data.categories.map(function(obj) {
            return obj.products.map(item => {
              return (
                
                <div className='element' key={item.id}>
                  <Link to ={`/${item.id}`
                } role='button'>
                    <img src={item.gallery[0]} alt='img'></img>
                    </Link>
                <div>
                  <p className='item_name'>{item.name}</p>
                  {item.prices.map(function (ele) {
                    if (ele.currency.symbol === props.currency) {
                      return (<p className='item_price' key={props.currency}>{ele.currency.symbol} {ele.amount}</p>)
                    } else {
                      return null
                    }
                  })}
                </div>
                  </div>
                  )
            })
          })
        }
      </div>
  )
  } else {
    return (
      <div className='container'>
        {
          data.categories.map(function (obj) {
            return obj.products.map(function(item) {
              if (item.category === props.category) {
                return (
                  
                  <div className='element' key={item.id}>
                    <Link  to ={`/${item.id}`} role='button'>
                      <img src={item.gallery[0]} alt='img'></img>
                      </Link>
                <div>
                  <p className='item_name'>{item.name}</p>
                  {item.prices.map(function (ele) {
                    if (ele.currency.symbol === props.currency) {
                      return (<p className='item_price' key={props.currency}>{ele.currency.symbol} {ele.amount}</p>)
                    } else {
                      return null
                    }
                  })}
                </div>
              </div>)
              } else {
                return null
              }
            })
          })
        }
      </div>
    )
  }

}


export default class Women extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState(() => ({
      category: e.target.value
    }))
  }

  render() {
    console.log(this.state.category)
    return (<div className='main'>
      <ApolloProvider client={client}>
        <GetCategories click={this.handleClick} />
        <GetProducts currency={this.props.currency} category={this.state.category}/>
      </ApolloProvider>
    </div>);
  }
}
