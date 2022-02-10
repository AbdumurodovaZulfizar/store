import'./App.css';
import React, { Component } from 'react';
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

const GET_CATEGORIES = gql`
{
  categories {
    name
  }
}
`;

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
    return (<div>
      <ApolloProvider client={client}>
        <GetCategories click={this.handleClick}/>
      </ApolloProvider>
    </div>);
  }
}
