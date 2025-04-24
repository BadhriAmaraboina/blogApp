import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='Fot'> 
        <div className='lav'>
            <p>Email: contact@blogapp.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Blog Street, Tech City, USA</p>
            <p>Follow us: Facebook | Twitter | Instagram</p>
        </div>
        <div className='lav'>
            <p>About Us: A platform for sharing knowledge</p>
            <p>Popular Topics: Tech, Lifestyle, Business</p>
            <p>Contributors: Writers & Enthusiasts Worldwide</p>
            <p>Privacy Policy | Terms of Service</p>
        </div>
    </div>
  );
}

export default Footer;
