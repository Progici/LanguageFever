import { useEffect } from "react";

const FreeChat = ({ mail, picture, name }) => {
  useEffect(() => {
    // Kreiraj i dodaj skriptu za chat
    const script = document.createElement("script");
    script.src = "https://popupsmart.com/freechat.js";
    script.type = "text/javascript";
    script.async = true;

    // Inicijaliziraj widget nakon što se skripta učita
    script.onload = () => {
      window.start.init({
        title:
          "Čestitamo! Uspješno ste dogovorili lekciju s učiteljem: " + name,
        message: "Pozdrav! Vrijeme je da dogovorimo detalje. Kontaktirajte me!",
        color: "#1C86FA",
        position: "right",
        placeholder: "Unesite svoju poruku",
        withText: "",
        viaWhatsapp: "",
        gty: "Idite na svoj",
        awu: "i pišite nam",
        connect: "Povežite se sada",
        button: "Chat",
        device: "everywhere",
        logo: "https://d2r80wdbkwti6l.cloudfront.net/gHM0G9ha45Fu1GfkxBdTsnM18FLWOME9.jpg",
        person: picture,
        services: [{ name: "mail", content: mail }],
      });
    };
    // Postavi atribute za skriptu
    script.setAttribute("data-chat", "free");
    // Dodaj skriptu u dokument
    document.body.appendChild(script);

    // Ukloni skriptu kada se komponenta demontira
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Komponenta ne renderira ništa izravno
};

export default FreeChat;
