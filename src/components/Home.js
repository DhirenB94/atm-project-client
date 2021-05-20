import React from 'react';
import './home.css';

function Home() {
    return (
        <div className="homepage">
            <div className="text-img">
                <div className="home-text">
                    <h1>Welcome to the ATM Map</h1>
                    <h5>Ever been charged extortionate conversion fees whilst on holiday? <br/><br/>Refuse to pay transaction fees? </h5>
                    <p>Register to see where you should and should not <br/> withdraw, and add your own atm machines to alert others </p>
                </div>
                <div className="atm-clipart-img">
                    <img src="../atm-clipart.jpg" className="atm-clipart"/>
                </div>
            </div>
            
        </div>
    )
}


export default Home; 