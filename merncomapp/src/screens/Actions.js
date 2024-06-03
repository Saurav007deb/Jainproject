import React from 'react';
import { useCard, useDispatchCard } from '../components/Contextreducer';

export default function Actions() {
    let data = useCard();
    let dispatch = useDispatchCard();

    if (data.length === 0) {
        return (

            <div className='container m-auto mt-5 text-warning' style={{ textAlign: 'center' }}>No New Projects added</div>

        )

    }


    const handleConfirm = async () => {


        let userEmail = localStorage.getItem("userEmail");

        let response = await fetch("http://localhost:5000/api/Orderdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        }
        );
        if (response.status === 200) {
            alert("Thank You for Volunturing, You will be send an email on your registering email with details of the project")
            dispatch({ type: "DROP" })
        }
        else {
            console.log(data)
            alert("Error in Saving")
        }
    }

    return (
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((project, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td><button type="button" className="btn p-0" onClick={() => {

                                dispatch({ type: "REMOVE", index: index });
                            }}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className='btn bg-success mt-5' onClick={handleConfirm} >Check Out</button>
            </div>
        </div>
    );
}