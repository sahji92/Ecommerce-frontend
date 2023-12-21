import React, { useEffect, useState } from 'react'
import { apiEndpoints, httpMethods } from '../../constants'
import apiConnection from '../../apiConnection'
import Button from 'react-bootstrap/Button';

export default function Cart() {

  const [items,setItems] = useState([]);
  const [total,setTotal] = useState(0);


  const getCartitems = async () => {
     const data = await apiConnection(`${apiEndpoints.FETCH_CART_ENDPOINT}/dummy`,httpMethods.GET)
        if(data.status === 200){
            console.log(data.data.data)
            const items = data.data.data.items.map(item => item.productId)
            const total = items.reduce((acc,item)=>acc + item.discountedPrice,0)
            setTotal(total)
            console.log(items)
            setItems([...items])
        } else {
            console.log("Unable to fetch banners. please try again later.")
     }
  }

  const deleteFromCart = async (productId) => {
    try {
        let newItems = items.filter(item => item._id !== productId)
        setItems([...newItems])
        const total = newItems.reduce((acc,item)=>acc + item.discountedPrice,0)
        setTotal(total)
        console.log(productId);
        let deleteFromCartPayload = {
            customerId: 'dummy',
            productId: productId
        }
        const data = await apiConnection(apiEndpoints.DELETE_FROM_CART_ENDPOINT,httpMethods.POST,deleteFromCartPayload)
        console.log(data)
        if(data.status === 201 || 200){
            console.log(data)
        } else {
            console.log(data)
        }
    }
    catch(err) {
        console.log(err)
    }
  }

  const orderFromCart = async () => {
    try {
        let orderFromCartPayload = {
            customerId: 'dummy',
            total
        }
        const data = await apiConnection(apiEndpoints.ORDER_FROM_CART_ENDPOINT,httpMethods.POST,orderFromCartPayload)
        console.log(data)
        if(data.status === 201 || 200){
            console.log(data)
        } else {
            console.log(data)
        }
    }
    catch(err) {
        console.log(err)
    }
  }

  useEffect(()=>{
    getCartitems()
  },[])

  return (
    <div className='p-3'>
        <h2>Cart</h2>
        {items.length > 0 && items.map(item => {
                return <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img src={item.productImages.productImage0} style={{maxWidth: '300px'}} className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{item.name}</h3>
                            <p className="card-text">₹{item.discountedPrice}</p>
                            <Button variant="danger" className='me-2' onClick={()=>deleteFromCart(item._id)}>Remove</Button>
                        </div>
                        </div>
                    </div>
                </div>
        })
        }
        <Button variant="warning" className='me-2' onClick={orderFromCart}>Checkout {total}</Button>
    </div>
  )
    }