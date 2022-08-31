import './App.css';
import Questions from './Questions';
import {BrowserRouter as Router, Switch, Route, Routes}  from 'react-router-dom';


function Result({faq, index, toggleFAQ}) {

  
  return (
    <div>
     <h1>FAQ Page</h1>

     {/* <div
			className={"faq " + (faq.open ? 'open' : '')}
			key={index}
			onClick={() => toggleFAQ(index)}
		>
			<div className="faq-question">
				{faq.question}
			</div>
			<div className="faq-answer">
				{faq.answer}
			</div>
		</div> */}

    </div>
  );
}

export default Result;
