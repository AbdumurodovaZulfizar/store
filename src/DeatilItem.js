import React, { useState } from 'react';
import { useParams } from 'react-router';
import {
  useQuery,
  gql
} from "@apollo/client";


export default function DetailItem(props) {
  const { id } = useParams();
  const GET_DETAILS = gql`
  query GetDetailInfo {
      product(id: "${id}") {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
  }
`;
  const { loading, error, data } = useQuery(GET_DETAILS);
  const [activeImage, setActiveImage] = useState('src')
  if (error) return(<p>Error :(</p>)
  if (loading) return (<p>Loading...</p>)
  let image = ''
  if (activeImage === 'src') {
    image = <img src={data.product.gallery[0]} alt='img'></img>
  } else {
    image = <img src={activeImage} alt='img'></img>
  }
  return (
    <div className='detail_card'>
      <div className='detail_images'>
        {data.product.gallery.map(ele => {
          return <img key={ele} src={ele} alt={ele} role="button"
            onClick={() => setActiveImage(ele)}
          ></img>
        })}
      </div>
      <div className='active_image'>
        {image}
      </div>
      <div>
        <h2><b>{data.product.brand}</b></h2>
        <h2>{data.product.name}</h2>
        {data.product.attributes.map(atr => {
          return (
            <div key={atr.id}>
              <h4><b>{atr.name}:</b></h4>
              <div className='flex_box'>
              {atr.items.map(ele => {
                return <div key={ele.id}>{ele.displayValue}</div>
              })}</div>
            </div>
          )
        })}
        <div>
          <h4><b>Price:</b></h4>
          {data.product.prices.map(function (ele) {
                    if (ele.currency.symbol === props.currency) {
                      return (<p className='item_price' key={props.currency}>{ele.currency.symbol} {ele.amount}</p>)
                    } else {
                      return null
                    }
                  })}
        </div>
        <button className='add_card'>ADD TO CARD</button>
        <p>{ data.product.description } </p>
      </div>
    </div>
    )
  
}

