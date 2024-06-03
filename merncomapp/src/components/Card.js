import React from 'react'
import {useDispatchCard} from './Contextreducer'





export default function Card(props) {
 let dispatch = useDispatchCard();
let all = props.alldetails

const handlevolunteer = async () => {
    window.alert("Project Added to Action, Please visit My Action page");
await dispatch ({type: "ADD",name: all.name, description : all.description})

}
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "460px" }}>
                <img src={all.img} className="card-img-top" alt={props.project} style={{ height: "120px", objectFit: "cover" }} />
                    <div className="card-body">
                        <h5 className="card-title">{all.name}</h5>
                        
                        <p className="card-text">{all.description}</p>
                        <hr/>
                        <div className='container w-100'>
                            
                        <button type="button" className="btn btn-success" onClick={handlevolunteer}>Volunteer</button>
                        </div>
                    </div>
                </div></div>



        </div>
    )
}
