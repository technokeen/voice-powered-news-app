import React, {useState, useEffect} from 'react'
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/newsCards/NewsCards';
import useStyles from './styles.js'
import wordsToNumbers from 'words-to-numbers'
const alanKey= '20f6809bc8beef77f5cb715bf25b29d92e956eca572e1d8b807a3e2338fdd0dc/stage'

function App() {
  const [newsArticles, setNewsArticles]= useState([]);
  const [activeArticle, setActiveArticle]= useState(-1);
  const classes= useStyles();
  const alanLogoSrc = 'https://alan.app/voice/images/previews/preview.jpg';


  useEffect(() =>{
    alanBtn({
      key:alanKey,
      onCommand:({command, articles, number}) =>{
          if(command === 'newHeadlines'){
           setNewsArticles(articles);
           setActiveArticle(-1);
          }else if(command === 'highlight')
          {
            setActiveArticle((prevActiveArticle)=>prevActiveArticle +1);
          }else if(command === 'open')
          {
            //for ->four 
            const parsedNumber= number.length >2? wordsToNumbers(number, {fuzzy:true}) : number;
            const article= articles[parsedNumber-1];

            if(parsedNumber >20){
              alanBtn().playText('Please try that again.')

            }else if(article)
            {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            }
           
          }
      }
    })
  },[])


  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img src={alanLogoSrc} className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App
