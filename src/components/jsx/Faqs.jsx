import "../css/Faqs.css";
import React, { useState } from "react";

const faqData = [
  {
    question: "Kako mogu započeti koristiti Language Fever?",
    answer:
      "Da biste započeli, registrirajte se putem e-maila i postavite svoj profil. Nakon toga, možete pretraživati dostupne učitelje ili učenike te započeti lekcije.",
  },
  {
    question: "Koje jezike mogu učiti na Language Fever?",
    answer:
      "Naša platforma nudi širok spektar jezika, uključujući engleski, španjolski, njemački, francuski, talijanski i mnoge druge. Učitelji i učenici mogu birati jezike prema svojim potrebama.",
  },
  {
    question: "Kako mogu postati učitelj na Language Fever?",
    answer:
      "Ako želite postati učitelj, prijavite se putem platforme i dostavite svoj životopis, certifikate i primjere lekcija. Na temelju vaše prijave i iskustva, možete biti prihvaćeni kao učitelj.",
  },
  {
    question: "Koje su cijene lekcija?",
    answer:
      "Cijene lekcija ovise o učitelju, jeziku i trajanju nastave. Svaki učitelj postavlja vlastitu cijenu, koja je jasno prikazana na njegovom profilu.",
  },
  {
    question: "Kako mogu zakazati lekciju?",
    answer:
      "Jednostavno pretražujte učitelje i odaberite onog koji vam odgovara. Zatim, odaberite slobodno vrijeme u njegovom rasporedu i rezervirajte lekciju.",
  },
  {
    question: "Je li moguće otkazati lekciju?",
    answer:
      "Da, možete otkazati lekciju do 24 sata prije početka. Nakon tog vremena, otkazivanje može biti podložno naplati.",
  },
  {
    question: "Kako mogu platiti za lekcije?",
    answer:
      "Plaćanja se vrše putem sigurnih online platformi, uključujući kreditne kartice i PayPal. Detalji o plačanju bit će navedeni prilikom rezervacije lekcija.",
  },
  {
    question: "Mogu li ocijeniti učitelja nakon lekcije?",
    answer:
      "Da, nakon svake lekcije možete ocijeniti učitelja i ostaviti povratnu informaciju, što pomaže drugim korisnicima pri odabiru.",
  },
  {
    question: "Mogu li učiti u grupama?",
    answer:
      "Trenutno su dostupne samo privatne lekcije, ali planiramo u budućnosti dodati opciju za grupno učenje.",
  },
  {
    question: "Što ako imam tehničkih problema tijekom lekcije?",
    answer:
      "Ako dođe do tehničkih problema, odmah se obratite našoj podršci. Pomoći ćemo vam da riješite problem kako bi lekcija mogla nastaviti bez smetnji.",
  },
  {
    question: "Kako mogu kontaktirati podršku?",
    answer:
      "Ako imate bilo kakvih problema ili pitanja, možete kontaktirati naš tim za podršku putem e-maila ili live chat opcije na stranici aplikacije.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="faq-container">
      <div className="faq-list">
        <h1>Često postavljena pitanja (FAQs)</h1>
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <h3>{faq.question}</h3>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <h3>{faq.answer}</h3>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
