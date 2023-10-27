// import HomeBannerSlider from "../components/HomeBannerSlider"

import { Link } from "react-router-dom"
import Header from "../components/Header"

const Home = () => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="relative">
          <div id="screen">
            <div id="firstScreen">
              {/* <HomeBannerSlider /> */}
            </div>
          </div>
          <div className="container d-flex align-items-center justify-content-center flex-column"
            style={{
              position: 'absolute',
              backgroundSize: 'cover',
              fontFamily: 'Jaapokki-regular, serif',
              zIndex: 2,
              marginTop: 'calc(526px + (590 - 526) * ((100vh - 533px) / (631 - 533)))',
              marginLeft: '50%',
              top: '-40%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100vh',
              opacity: 1,
              transition: 'opacity 1.5s ease-out',
            }}
          >
            <div className="rectangle">
              <div className="logoWraper">
                <img className="logoRectangle" src="img/logo/logo_noir_trans.png" alt="logo" />
              </div>
              <span>TOUT POUR VOTRE EVENEMENT</span>
            </div>
            <div className="login">
              <Link to="/provider/login" className="cursor-pointer">CLIENTS</Link>
              <Link to="/provider/login" className="cursor-pointer">PRESTATAIRES</Link>
            </div>
          </div>
        </div>
        <hr />
        <div id="presentation">
          <div id="presentationText">
            <h2>Pourquoi M Events ?</h2>
            <p>
              Vas-tu te <span>marier</span>? Célébrer{" "} 
              <span>l'anniversaire</span> de votre enfant ? Vous organisez une{" "}
              <span>soirée d'entreprise</span> ? Nous vous aiderons à trouver
              les <span>meilleurs professionnels</span> !
            </p>
            <p>
              Vous souhaitez immortaliser les <span>moments importants</span> de
              votre vie ? trouvez le meilleur <span>photographe</span> ou{" "}
              <span>caméraman</span> parmi nos partenaires !
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur{" "}
              <span>adipiscing elit</span>. Vivamus varius sodales{" "}
              <span>purus ut tempus</span>. Integer ac tempor est, sed ultricies
              dui. Morbi sagittis <span>varius</span> turpis. In{" "}
              <span>viverra</span> nibh nec nisi consequat, sed volutpat leo
              convallis. <span>vivamus</span> a pretium diam, vel tempor justo.
              Integer lobortis ultrices <span>congue</span>. Cras sed orci sit
              amet turpis semper congue ut <span>sit amet ante</span>. Sed{" "}
              <span>maximus</span> sollicitudin tortor, sit amet posuere dolor{" "}
              <span>sollicitudin</span> ac. Cras at porta ante.
            </p>
          </div>

          <div className="gallery">
            <figure className="gallery__item gallery__item--1">
              <img src="img/intro_01.jpg" alt="Gallery image 1" className="gallery__img"/>
            </figure>
            <figure className="gallery__item gallery__item--2">
              <img src="img/intro_02.jpg" alt="Gallery image 2" className="gallery__img"/>
            </figure>
            <figure className="gallery__item gallery__item--3">
              <img src="img/intro_03.jpg" alt="Gallery image 3" className="gallery__img"/>
            </figure>
            <figure className="gallery__item gallery__item--4">
              <img src="img/intro_04.jpg" alt="Gallery image 4" className="gallery__img"/>
            </figure>
            <figure className="gallery__item gallery__item--5">
              <img src="img/intro_05.jpg" alt="Gallery image 5" className="gallery__img"/>
            </figure>
            <figure className="gallery__item gallery__item--6">
              <img src="img/intro_06-grid.jpeg" alt="Gallery image 6" className="gallery__img"/>
            </figure>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home