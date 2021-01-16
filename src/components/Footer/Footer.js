import React from 'react';
import { Link } from 'react-router-dom';

import facebook from '../../images/footer__nav-icon_facebook.svg';
import github from '../../images/footer__nav-icon_github.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__width">
        <p className="footer__copyright">&copy; Danny Demosi, Powered by News API</p>
        <nav className="footer__navbar">
          <div className="footer__navlink-container">
            <Link to='/' className="footer__navlink">Home</Link>
            <a href="https://practicum.yandex.com/" className="footer__navlink">Practicum by Yandex</a>
          </div>
          <div className="footer__nav-icon-container">
            <a href="https://github.com/ddemosi/news-explorer-frontend" target="_blank" rel="noopener noreferrer" className="footer__nav-icon footer__nav-icon_github"><img alt="Github logo" src={github}></img></a>
            <a href="https://www.facebook.com/YPracticum/" target="_blank" rel="noopener noreferrer" className="footer__nav-icon footer__nav-icon_facebook"><img alt="Facebook logo" src={facebook}></img></a>
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;