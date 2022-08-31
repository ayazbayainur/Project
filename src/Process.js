import './App.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function Process() {
    const navigate = useNavigate();

    const [txt, setTxt] = useState(()=>"");
    setTxt("finished");
  return (
    <div>
     <h1>About Page</h1>
     <p>This website is for analyzing extracts from website</p>
     <br />
     <textarea style={{width:'1200px', height:'150px', marginLeft: '20px',}} placeholder="your pdf text..." value={txt}></textarea>
      <button onClick={() => navigate(-1)}>Go Back</button>
    
    </div>
  );
}

export default Process;
