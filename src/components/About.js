import React from 'react';
import { useSelector } from 'react-redux';
function About () {
    const apiParams = useSelector((state) => state?.passenger?.apiParams);
    console.log("abount apiParams ", apiParams);
    return <div>
        <h2>GeeksforGeeks is a computer science portal for geeks!</h2>
  
        Read more about us at : 
        <a href="https://www.geeksforgeeks.org/about/">
            https://www.geeksforgeeks.org/about/
        </a>
    </div>
}
export default About;