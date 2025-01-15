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
    question: "Što označuju boje na kalendaru učitelja?",
    answer: (
      <>
        Plava - slobodna lekcija <br />
        Narančasta - rezervirana lekcija <br />
        Zelena - dogovorena lekcija <br />
        Siva - završena lekcija
      </>
    ),
  },
  {
    question: "Rezervirao sam lekciju. Kako znam kada je prihvaćena?",
    answer:
      "Kada Vaša lekcija bude prihvaćena od učitelja, pojavit će Vam se obavijest na 'Zahtjevi' te ćete imati uvid u prihvaćene lekcije.",
  },

  {
    question: "Gdje vidim svoje lekcije?",
    answer:
      "Sve svoje lekcije možete vidjeti na Vašem kalendaru, a završene lekcije pod 'Arhiva'.",
  },
  {
    question: "Mogu li otkazati lekciju?",
    answer:
      "Lekciju kao učenik možete otkazati samo dok još nije prihvaćena. Kao učitelj imate mogućnost odbijanja zahtjeva za lekcijom te brisanja postojećih, ako nisu dogovorene ili završene.",
  },
  {
    question: "Kako mogu stupiti u kontakt s učiteljem?",
    answer:
      "Kada se Vaš zahtjev za lekcijom prihvati, otvara Vam se mogućnost Chat-a s tim učiteljem.",
  },
  {
    question: "Mogu li ocijeniti učitelja nakon lekcije?",
    answer:
      "Da, nakon svake odrađene lekcije možete ocijeniti učitelja na njihovim profilima i ostaviti povratnu informaciju, što pomaže drugim korisnicima pri odabiru.",
  },
  {
    question: "Učitelj sam, što da radim?",
    answer:
      "Kao učitelj, možete postaviti svoj raspored, prihvaćati ili odbijati zahtjeve za lekcijom te komunicirati s učenicima.",
  },
  {
    question: "Učitelj mi ne odgovara na poruke. Što da radim?",
    answer: "Ukoliko učitelj ne odgovara na poruke, kontaktirajte podršku.",
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
