import React, { useEffect, useRef, useState, useCallback } from 'react'
import Banners from '../common/Banners'
import apiConnection from '../../apiConnection'
import { apiEndpoints, httpMethods } from '../../constants'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useRazorpay from "react-razorpay";

export default function Home() {

  const [products,setProducts] = useState([]);
  const [Razorpay] = useRazorpay();

  const categoryRef = useRef()


  const [category,setCategory] = useState("");

  const [price,setPrice] = useState({
    minPrice: "",
    maxPrice: ""
  });


  const filterByCategory = (e) => {
    setCategory(e.target.value)
  }

  const filterByPrice = (e) => {
    let priceArray = e.target.value.split(",")
    console.log(priceArray)
    setPrice({
        ...price,
        minPrice: priceArray[0],
        maxPrice: priceArray[1]
    })
  }

  const getProducts = async () => {
        const data = await apiConnection(`${apiEndpoints.GET_PRODUCTS_ENDPOINT}?category=${category}&minPrice=${price.minPrice}&maxPrice=${price.maxPrice}`,httpMethods.GET)
        if(data.status === 200){
            setProducts([...data.data.data])
        } else {
            console.log("Unable to fetch products. Please try again later.")
        }
  }

  const resetFilter = () => {
    setCategory("")
    setPrice({
        minPrice: "",
        maxPrice: ""
    })
    console.log(categoryRef.current)
    if(categoryRef.current.checked) {
        categoryRef.current.checked = false
    }
  }

  const addToCart = async (productId) => {
    try {
        console.log(productId);
        let addToCardPayload = {
            customerId: JSON.parse(sessionStorage.getItem('user_data'))._id,
            productId: productId
        }
        const data = await apiConnection(apiEndpoints.ADD_TO_CART_ENDPOINT,httpMethods.POST,addToCardPayload)
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

  const buyNowOrder = async (razorpayRes,total) => {
    try {
        let orderFromCartPayload = {
            customerId: JSON.parse(sessionStorage.getItem('user_data'))._id,
            total,
            ...razorpayRes
        }
        const data = await apiConnection(apiEndpoints.BUY_NOW_ORDER_ENDPOINT,httpMethods.POST,orderFromCartPayload)
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

  const createOrder = async (index) => {
    try {
        let orderFromCartPayload = {
            total: products[index].discountedPrice
        }
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

  const handlePayment = async (index) => {

    console.log('Reached here',products[index])
    
    const orderId = await createOrder(index);

    const options = {
      key: "rzp_test_YSG0qPKkfSv38n",
      currency: "INR",
      name: "Shopping App",
      description: "Test Transaction",
      image: "https://summitsoft.com/wp-content/uploads/2020/05/Icon-graphic-ADVANTAGES.png",
      order_id: orderId,
      handler: (res) => {
        console.log(res);
        buyNowOrder(res,products[index].discountedPrice)
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    options.amount = `${products[index].discountedPrice}00`

    const rzpay = new Razorpay(options);
    rzpay.open();
  }
  

  useEffect(()=>{
    getProducts()
  },[category, price])

  return (
    <div className="home">
        <Banners />
        <div className='d-flex flex-row'>
            <div className='w-25 bg-light m-2 border border-1 d-flex flex-column p-2'>
                <form>
                <b>Category</b>
                <div className="form-check">
                    <input ref={categoryRef} className="form-check-input" type="radio" value="Lifestyle" name="category" id="flexRadioDefault1" onChange={ (e) => filterByCategory(e)}/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        Lifestyle
                    </label>
                </div>
                <b>Price</b>
                <div className="form-check">
                    <input className="form-check-input" value="0,99" type="radio" name="price" id="flexRadioDefault1" onChange={(e) => filterByPrice(e)}/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        0 to 99
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" value="100,199" type="radio" name="price" id="flexRadioDefault1" onChange={(e) => filterByPrice(e)}/>
                    <label className="form-check-label" for="flexRadioDefault1">
                        100 to 199
                    </label>
                </div>
                </form>
                <Button variant="secondary" onClick={resetFilter}>Reset filter</Button>
            </div>
            <div>
                {(products.length > 0) && products.map((item, index)=>{
                    return <Card className='d-inline-block m-1' style={{ width: '18rem' }} key={index}>
                        {item.productImages && <Card.Img variant="top" src={item.productImages.productImage0} style={{height: '150px'}}/>}
                        <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            {item.description}
                        </Card.Text>
                        <p>Price: <s>{item.price}</s></p>
                        <b>Discounted Price: {item.discountedPrice}</b>
                            <Button variant="warning" className='me-2' onClick={()=>addToCart(item._id)}>Add to cart</Button>
                            <Button variant="success" onClick={()=>handlePayment(index)}>Buy now</Button>
                        </Card.Body>
                    </Card>
                })}
            </div>
        </div>
    </div>
  )
}