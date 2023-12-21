import React, { useEffect, useState, useCallback } from 'react'
import { apiEndpoints, httpMethods } from '../../constants'
import apiConnection from '../../apiConnection'
import Button from 'react-bootstrap/Button';
import useRazorpay from "react-razorpay";


export default function Cart() {

  const [items,setItems] = useState([]);
  const [total,setTotal] = useState(0);
  const [Razorpay] = useRazorpay();

    
  const getCartitems = async () => {
     const data = await apiConnection(`${apiEndpoints.FETCH_CART_ENDPOINT}/${JSON.parse(sessionStorage.getItem('user_data'))._id}`,httpMethods.GET)
        if(data.status === 200){
            const newItems = data.data.data.items.map(item => item.productId)
            const newTotal = newItems.reduce((acc,item)=>acc + item.discountedPrice,0)
            console.log('Set new total value', newTotal)
            setTotal(newTotal)
            console.log(newItems)
            setItems([...newItems])
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
            customerId: JSON.parse(sessionStorage.getItem('user_data'))._id,
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

  const orderFromCart = async (razorpayRes) => {
    try {
        let orderFromCartPayload = {
            customerId: JSON.parse(sessionStorage.getItem('user_data'))._id,
            total,
            ...razorpayRes
        }
        const data = await apiConnection(apiEndpoints.ORDER_FROM_CART_ENDPOINT,httpMethods.POST,orderFromCartPayload)
        console.log(data)
        if(data.status === 201 || 200){
            console.log(data)
            setItems([])
            setTotal(0)
        } else {
            console.log(data)
        }
    }
    catch(err) {
        console.log(err)
    }
  }

  const createOrder = async () => {
    try {
        let orderFromCartPayload = {
            total
        }
        console.log(total)
        console.log(items)

        const data = await apiConnection(apiEndpoints.CREATE_ORDER_ID_ENDPOINT,httpMethods.POST,orderFromCartPayload)
        console.log(data)
        if(data.status === 201 || 200){
            console.log(data)
            return data.data.orderId
        } else {
            console.log(data)
        }
    }
    catch(err) {
        console.log(err)
    }
  }

  const handlePayment = async () => {

    console.log('Reached here')
    const orderId = await createOrder();

    const options = {
      key: "rzp_test_YSG0qPKkfSv38n",
      amount: `${total}00`,
      currency: "INR",
      name: "Shopping App",
      description: "Test Transaction",
      image: "https://summitsoft.com/wp-content/uploads/2020/05/Icon-graphic-ADVANTAGES.png",
      order_id: orderId,
      handler: (res) => {
        console.log(res);
        orderFromCart(res)
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }
    
  useEffect(()=>{
    getCartitems()
  },[])

  return (
    <div className='p-3'>
        <h2>Cart</h2>
        {items.length > 0 && items.map((item,index) => {
                return <div key={index} className="card mb-3">
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
        <Button variant="warning" className='me-2' onClick={handlePayment}>Checkout {total}</Button>
    </div>
  )
}