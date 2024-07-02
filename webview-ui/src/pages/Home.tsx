import React from 'react';
import NavBar from '../NavBar';

const Home: React.FC = () => {
    return (
        <>
        <NavBar />
        <div>
            <h1>Welcome to My Website</h1>
            <p>This is the home page.</p>
        </div>
        </>
    );
};

export default Home;