import "../css/Faqs.css";
import React, { useState } from "react";

const faqData = [
  {
    question: "Kako mogu započeti koristiti LanguageFever?",
    answer:
      "Želite li punu funkcionalnost stranice, morate se prijaviti. Bez prijave, možete samo pregledavati profile postojećih učitelja.",
  },
  {
    question: "Prijavljen sam. Što sad?",
    answer:
      "Prijavom ste dobili punu funkcionalnost stranice. Uredite svoj profil, nadopunite ga informacijama i spremni ste za uživanje u stranici. Odaberite učitelja po svojim preferencama, a prikazom njegovog profila dobit ćete uvid u njegov raspored na kalendaru. To je to - rezervirajte željenu lekciju!",
  },
  {
    question: "Rezervirao sam lekciju. Kako znam kada je prihvaćena?",
    answer:
      "Kada Vaša lekcija bude prihvaćena od učitelja, pojavit će Vam se obavijest na 'Zahtjevi' te ćete imati uvid u prihvaćene lekcije.",
  },
  {
    question: "Kako mogu stupiti u kontakt s učiteljem?",
    answer:
      "Kada se Vaša lekcija prihvati, otvara Vam se mogućnost Chat-a sa željenim učiteljem.",
  },
  {
    question: "Mogu li otkazati lekciju?",
    answer:
      "Lekciju kao učenik možete otkazati samo dok još nije prihvaćena. Kao učitelj imate mogućnost odbijanja zahtjeva za lekcijom te brisanja postojećih, ako nisu rezervirane ili završene.",
  },
  {
    question: "Gdje vidim svoje lekcije?",
    answer:
      "Osim prikaza lekcija na Vašem kalendaru, možete ih vidjeti i pod 'Arhiva'.",
  },
  {
    question: "Mogu li ocijeniti učitelja nakon lekcije?",
    answer:
      "Da, nakon svake odrađene lekcije možete ocijeniti učitelja na njihovim profilima i ostaviti povratnu informaciju, što pomaže drugim korisnicima pri odabiru.",
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
