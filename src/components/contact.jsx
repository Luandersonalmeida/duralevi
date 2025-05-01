import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
    
   
    
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY")
      .then(
        (result) => {
          console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="section-title text-center">
            <h2>Entre em Contato</h2>
            <p>
              Estamos à disposição para atender você. Entre em contato através dos canais abaixo:
            </p>
          </div>
          <div className="contact-items">
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <h3>Telefone</h3>
              <p>{props.data ? props.data.phone : "loading"}</p>
            </div>
            <div className="contact-item">
              <FaWhatsapp className="contact-icon" />
              <h3>WhatsApp</h3>
              <p>
                <a 
                  href={`https://wa.me/${props.data ? props.data.phone.replace(/[^0-9]/g, '') : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.data ? props.data.phone : "loading"}
                </a>
              </p>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <h3>E-mail</h3>
              <p>
                <a href={`mailto:${props.data ? props.data.email : ""}`}>
                  {props.data ? props.data.email : "loading"}
                </a>
              </p>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <h3>Endereço</h3>
              <p>{props.data ? props.data.address : "loading"}</p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.instagram : "/"}>
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2023 Issaaf Kattan React Land Page Template. Design by{" "}
            <a href="http://www.templatewire.com" rel="nofollow">
              TemplateWire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
