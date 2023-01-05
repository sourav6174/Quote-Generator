const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const linkedinBtn = document.getElementById('linkedin');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show new Quote
function newQuote(){
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //Check if the author field is blank and replace with 'Unkown'
    //if(!quote.author){
    //    authorText.textContent = 'Unkown';
    //} else{
    //    authorText.textContent = quote.author;
    //}

    //Check quote length to determine styling
    if(quote.text.length > 60){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

//Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        //console.log(apiQuotes[15]);
        newQuote();
    }catch(error){
        //Catch error here
    }
}

//Adding quotes to bookmark
function addToFav(){
    var button = document.querySelector(".bookmark");
    if(typeof(localStorage.bookmark) == "undefined"){
        localStorage.bookmark = quote.text;
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}`;
    window.open(twitterUrl, `_blank`);
    //- ${authorText.textContent}
}
function linkedinQuote()
{
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url={url}`;
    window.open(linkedinUrl, `_blank`);
}
function facebookQuote(){
    const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=example.org';
    window.open(facebookUrl, '_blank');
}
//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
linkedinBtn.addEventListener('click', linkedinQuote);
facebookBtn.addEventListener('click', facebookQuote);
getQuotes();