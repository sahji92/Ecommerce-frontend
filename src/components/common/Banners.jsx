import React, { useEffect } from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import apiConnection from '../../apiConnection';
import { apiEndpoints, httpMethods } from '../../constants';

export default function Banners() {

  const [index, setIndex] = useState(0);

  const [banners,setBanners] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getBanners = async () => {
    const data = await apiConnection(apiEndpoints.GET_BANNERS_ENDPOINT,httpMethods.GET)
    if(data.status === 200){
        setBanners([...data.data.data])
    } else {
        console.log("Unable to fetch banners. please try again later.")
    }
  }

  useEffect(()=>{
    getBanners()
  },[])

  return (
    <>
   {(banners.length > 0) && <Carousel activeIndex={index} onSelect={handleSelect} className='m-3'>
        {banners.map((banner, index) => {
            return (
                <Carousel.Item key={index} className='border border-0 rounded'>
                <img src={banner.bannerImageLink} className="d-block w-100 border border-0 rounded-4" style={{height: '400px'}} alt={banner.name}></img>
                </Carousel.Item>
            )
        })}

        {/* <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
        </Carousel.Caption>
        </Carousel.Item> */}
    </Carousel>}
    </>
  )
    }