
import React, {useEffect} from 'react'
import TranslateButton from './TranslateButton';
import countries from '../data';

const Translate = () => 
{
  useEffect(() => 
  {
    const fromText = document.querySelector('.from-text');
    const toText = document.querySelector('.to-text');
    const exchangeIcon = document.querySelector('.exchange');
    const selectTag = document.querySelectorAll('select');
    const icons = document.querySelectorAll('.row i ');
    const translateBtn = document.querySelector('button');

    selectTag.forEach((tag, id) => 
    {
      console.log(tag);
      for(let country_code in countries) 
      {
        console.log(country_code);
        let selected = 
          id == 0 
            ? country_code == "en-GB" 
              ? "selected"
              : "" 
            : country_code == "hi-IN" 
            ? "selected" 
            :  "" ;
        let option = `<option ${selected} value = "${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
      }
    });

    exchangeIcon.addEventListener("click", () => 
    {
      //text exchange code
      let tempText = fromText.value;
      let tempLang = selectTag[0].value;
      fromText.value = toText.value;
      toText.value = tempText;

      //lang exchange code
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempLang;
    });

    //Empty the toText value when fromText is empty
    fromText.addEventListener("keyup", () => 
    {
      if(!fromText.value) {
        toText.value="";
      }
    });

    //translation code
    translateBtn.addEventListener("click", () => 
    {
      let text = fromText.value.trim();
      let translateFrom = selectTag[0].value;
      let translateTo = selectTag[1].value;
      console.log(text, translateFrom, translateTo);

      if(!text) return;

      toText.setAttribute("placeholder", "Translating...");

      //fetching api
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => 
        {
          console.log(data);
          toText.value = data.responseData.translatedText;
        });
        toText.setAttribute("placeholder", "Translation");
    });


    //copy-clipoard and sound code
    icons.forEach((icon) => 
    {
      icon.addEventListener("click", ({target}) => 
      {
        if(!fromText.value || !toText.value) return;

        //copy-to-clipboard code
        if(target.classList.contains("fa-copy")) 
        {
          if(target.id == "from") 
          {
            navigator.clipboard.writeText(fromText.value);
          }
          else 
          {
            navigator.clipboard.writeText(toText.value);
          }
        }
        //sound output code
        else
        {
          let sound;
          if(target.id == "from")
          {
            sound = new SpeechSynthesisUtterance(fromText.value);
            sound.lang = selectTag[0].value;
          }
          else
          {
            sound = new SpeechSynthesisUtterance(toText.value);
            sound.lang = selectTag[1].value;
          }
          speechSynthesis.speak(sound);
        }
      });
    });

  }, []);


  return (
    <div className="container">
      <div className="wrapper">
        <div className="text-input">
          <textarea spellCheck='false' className='from-text' placeholder='Enter your text here...'></textarea>
          <textarea readOnly spellCheck='false' className='to-text' placeholder='Translation'></textarea>
        </div>
        <ul className='controls'>
          <li className='row from'>
            <div className='icons'>
              <i id='from' className='fas fa-volume-up'></i>
              <i id='from' className='fas fa-copy'></i>
            </div>
            <select></select>
          </li>
          <li className='exchange'>
            <i className='fas fa-exchange-alt'></i>
          </li>
          <li className='row to'>
            <select></select>
            <div className='icons'>
              <i id='to' className='fas fa-volume-up'></i>
              <i id='to' className='fas fa-copy'></i>
            </div>
          </li>
        </ul>
      </div>
      <button ripple={"#ffffff"}>Translate</button>
    </div>  
  );
}

export default Translate