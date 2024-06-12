export default async function translate(texts, lang) {
    let translatedTexts = {};
  
    for (let key in texts) {
      if (lang === 'pl') {
        translatedTexts[key] = texts[key];
      } else {
        // Najpierw tłumacz tekst na angielski
        const responseEn = await fetch(`http://localhost:3000/translate?text=${encodeURIComponent(texts[key])}&lang=en`);
        const resultEn = await responseEn.json();
        let textEn = resultEn.translatedText;
  
        // Następnie tłumacz tekst na wybrany język
        const response = await fetch(`http://localhost:3000/translate?text=${encodeURIComponent(textEn)}&lang=${lang}`);
        const result = await response.json();
        translatedTexts[key] = result.translatedText;
      }
    }
  
    return translatedTexts;
  }
  