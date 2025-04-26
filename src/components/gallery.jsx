// src/components/gallery.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Componente Lightbox
const Lightbox = ({ image, title, onClose }) => {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          <FaTimes />
        </button>
        <img src={image} alt={title} className="lightbox-image" />
        {title && <div className="lightbox-title">{title}</div>}
      </div>
    </div>
  );
};

// Componentes das setas do carrossel
const NextArrow = ({ onClick }) => (
  <div className="arrow-wrapper next" onClick={onClick}>
    <div className="arrow-overlay"></div>
    <FaChevronRight className="arrow-icon" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="arrow-wrapper prev" onClick={onClick}>
    <div className="arrow-overlay"></div>
    <FaChevronLeft className="arrow-icon" />
  </div>
);

// Componente de Carrossel
const GalleryCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div className="custom-dots">
        <ul>{dots}</ul>
      </div>
    )
  };

  return (
    <div className="gallery-carousel-container">
      <Slider {...settings}>
        {images.map((item, index) => (
          <div key={`carousel-${index}`} className="carousel-slide">
            <img
              src={item.largeImage}
              alt={item.title}
              className="carousel-image"
            />
            {item.title && (
              <div className="carousel-caption">
                <h4>{item.title}</h4>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Componente Principal
export const Gallery = (props) => {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    image: '',
    title: ''
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  const openLightbox = (image, title) => {
    setLightbox({
      isOpen: true,
      image,
      title
    });
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      image: '',
      title: ''
    });
  };

  // Agora usando a nova estrutura de dados
  const carouselImages = props.data?.carousel || [];
  const products = props.data?.products || [];

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Nossos Produtos</h2>
          <p>Conheça nossa linha completa de produtos</p>
        </div>

        {/* Carrossel Superior */}
        {carouselImages.length > 0 && <GalleryCarousel images={carouselImages} />}

        {/* Grid de Produtos */}
        <div className="row">
          {products.map((d, i) => (
            <div key={`${d.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
              <div className="portfolio-item">
                <div className="hover-bg" onClick={() => openModal(d)}>
                  <img
                    src={d.smallImage}
                    className="img-responsive"
                    alt={d.title}
                  />
                  <div className="hover-text">
                    <h4>{d.title}</h4>
                    <p>{d.brief || "Clique para mais detalhes"}</p>
                    <button className="btn-details">Ver Detalhes</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal do Produto */}
        {selectedProduct && (
          <div className="product-modal active" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <FaTimes className="modal-close" onClick={closeModal} />
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={selectedProduct.largeImage}
                    className="img-responsive"
                    alt={selectedProduct.title}
                  />
                </div>
                <div className="col-md-6 text-left">
                  <h2>{selectedProduct.title}</h2>
                  <p className="product-description">
                    {selectedProduct.description || "Descrição do produto não disponível"}
                  </p>
                  <div className="product-details">
                    <h4>Especificações:</h4>
                    <ul>
                      {selectedProduct.specifications?.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      )) || (
                        <li>Especificações não disponíveis</li>
                      )}
                    </ul>
                  </div>
                  <div className="product-cta">
                    <a 
                      href={`https://wa.me/${props.whatsapp}?text=Olá! Gostaria de saber mais sobre o produto: ${selectedProduct.title}`}
                      className="btn btn-custom btn-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Solicitar Orçamento
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <Lightbox
          image={lightbox.image}
          title={lightbox.title}
          onClose={closeLightbox}
        />
      )}

      {/* Estilos CSS */}
      <style jsx>{`
        /* Estilos do Carrossel */
        .gallery-carousel-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto 40px;
        }
        
        .carousel-slide {
          position: relative;
          height: 500px;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .carousel-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          color: white;
          text-align: left;
        }
        
        /* Estilos das setas */
        .arrow-wrapper {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 50px;
          height: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .arrow-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          border-radius: 50%;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }
        
        .arrow-icon {
          position: relative;
          color: white;
          font-size: 1.5rem;
          z-index: 2;
          transition: all 0.3s ease;
        }
        
        .arrow-wrapper:hover .arrow-overlay {
          background: rgba(0,0,0,0.7);
        }
        
        .arrow-wrapper:hover .arrow-icon {
          transform: scale(1.2);
        }
        
        .prev {
          left: 20px;
        }
        
        .next {
          right: 20px;
        }
        
        /* Estilos do Lightbox */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s forwards;
        }
        
        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          animation: zoomIn 0.3s forwards;
        }
        
        .lightbox-image {
          max-height: 80vh;
          max-width: 100%;
          object-fit: contain;
        }
        
        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: transparent;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        .lightbox-title {
          color: white;
          text-align: center;
          margin-top: 15px;
          font-size: 1.2rem;
        }
        
        /* Estilos do Grid */
        .portfolio-item {
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 30px;
        }
        
        .portfolio-item:hover {
          transform: scale(1.03);
        }
        
        .hover-bg {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }
        
        .hover-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .portfolio-item:hover .hover-text {
          opacity: 1;
        }
        
        .hover-text h4 {
          color: #fff;
          font-size: 18px;
        }
        
        /* Animações */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes zoomIn {
          from { transform: scale(0.9); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};