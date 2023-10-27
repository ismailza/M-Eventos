// import Link from "next/link";
// import { useRouter } from "next/router";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [burger, setBurger] = useState(false);
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };
  return (
    <div className={burger ? "_pc _lock" : "_pc"}>
      <div className="menuWraper">
        <div className="upperPannel">
          <div className="menuContainer">
            <img src="img/logo/logo_noir_trans.png" id="logo" alt="logo" />
            <div className="upperMenu menu">
              <div
                onClick={() => setBurger(!burger)}
                className={burger ? "menuIcon _active" : "menuIcon"}
              >
                <span></span>
              </div>
              <nav className={burger ? "menuBody _active" : "menuBody"}>
                <ul className="menuList">
                  <li>
                    <Link to={'/'} className={`nav-link ${location.pathname === '/' ? 'active menuLink doubleLine active' : 'menuLink doubleLine'}`} aria-current="page">ACCUEIL</Link>
                  </li>
                  <li className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Link to={'/services'} className={`nav-link ${location.pathname === '/services' ? 'active menuLink doubleLine active' : 'menuLink doubleLine'}`} data-goto=".page__section_1" aria-current="page">SERVICES</Link>
                    {/* <div className={`absolute end-0 z-10 mt-2 rounded-md border border-gray-100 bg-white shadow-lg ${isActive ? 'block' : 'hidden'}`} role="menu">
                      <ul className="p-2 min-w-[250px] ">
                        <li><a href="#" className="menuSubLink singleLine">Wedding Planner</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Photographer</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Deejay</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Animations</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Décorations</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Papèterie</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Beauté</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Traiteurs</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Salles</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Lieux d'exception</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Videaste</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Danseurs</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Photobox</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Location voitures mariage</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Bien-être</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Cadeaux</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Robes & Costumes</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Prestige</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Alliances Prestige</a></li>
                        <li><a href="#" className="menuSubLink singleLine">Alirances</a></li>
                      </ul>
                    </div> */}
                  </li>
                  <li>
                    <Link to={'/bons-plans'} className={`nav-link ${location.pathname === '/bons-plans' ? 'active menuLink doubleLine active' : 'menuLink doubleLine'}`} data-goto=".page__section_2" aria-current="page">BONS PLANS</Link>
                  </li>
                  <li>
                    <Link to={'/actualites'} className={`nav-link ${location.pathname === '/actualites' ? 'active menuLink doubleLine active' : 'menuLink doubleLine'}`} data-goto=".page__section_3" aria-current="page">ACTUALITES</Link>
                  </li>
                  <li>
                    <Link to={'/contact'} className={`nav-link ${location.pathname === '/contact' ? 'active menuLink doubleLine active' : 'menuLink doubleLine'}`} data-goto=".page__section_3" aria-current="page">CONTACT</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
