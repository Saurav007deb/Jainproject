import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'

export default function Myparticipation() {

    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            console.log(userEmail);
            console.log("In part ");

            const response = await fetch("http://localhost:5000/api/myParticipitation", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            setOrderData(responseData);

        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);


    return (
        <>
            <div>
                <Navbar />

            </div>


            <div className='container'>
                <div className='row'>

                    {Object.keys(orderData).length !== 0 ? (
                        Object.values(orderData).map((data, index) => {
                            console.log("Data:", data)
                            return (
                                data.order_data ? (
                                    data.order_data.slice(0).reverse().map((item, itemIndex) => {
                                        return (
                                            item.map((arrayData, arrayIndex) => (
                                                <div key={`${index}-${itemIndex}-${arrayIndex}`}>
                                                    {arrayData.Order_date ? (
                                                        <div className='m-auto mt-5'>
                                                            <div>{arrayData.Order_date}</div>
                                                            <hr />
                                                        </div>
                                                    ) : (
                                                        <div className='col-12 col-md-6 col-lg-3'>
                                                           <div className="card " style={{ width: "52rem", maxHeight: "360px" }}>
                                                                
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.description}</span>
                                                                        
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>

                                                  
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        );
                                    })
                                ) : (
                                    <div className='m-auto mt-5' key={`not-found-${index}`}>
                                        no
                                    </div>
                                )
                            );
                        })
                    ) : ""}
                </div>


            </div>




            <div>
                <Footer />

            </div>
        </>
    )





}




