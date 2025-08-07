import './App.css';
import {useRef, useState } from 'react';



function App() {

  const caption = useRef();
  const [catImageUrl, setCatImageUrl] = useState('https://cataas.com/cat');

  const generate = async() => {
    const cap = caption.current.value;

    const url ='https://cataas.com/cat?json=true';

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      if (!cap) {
        const getCatUrl = `https://cataas.com/cat/${data.id}`;
        setCatImageUrl(getCatUrl);
        return;
      }else{
        const getCatUrl = `https://cataas.com/cat/${data.id}/says/${cap}`;
        setCatImageUrl(getCatUrl);
        
      }

    } catch (error) {
      console.log(error);
  }
  }

  const downloadImage = async () => {
    try {
      const response = await fetch(catImageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'cat.jpg';
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };



  return (
      <>
        <h1>Verkefni 10 - Random cat with caption</h1>
        <p>
          Ýttu á Takka til þess að fá kattarmynd af handahófi. Ef þú vilt bæta við texta á mynd, skrifaðu textan í boxið, og ýttu svo á takkan. 
        </p>
        <div className="cat-container">
          <div className='img-container'>
            <img src={catImageUrl} alt="your cat" />
          </div>
          
          <div className='generator-container'>
            <input type="text" placeholder="Texti hér:" ref={caption} />
            <button onClick={generate}>Generate</button>
            {catImageUrl && ( <button onClick={downloadImage}>Download</button> )}
          </div>
        </div>
      </>
  );
}


export default App;


