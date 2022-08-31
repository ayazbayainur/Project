import './App.css';
import { useState } from 'react';
import React from "react";
import { useNavigate } from "react-router-dom";


function Home() { 
    const navigate = useNavigate();
    
    const [text, setText] = useState("");
    const [text2, setText2] = useState("");
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        event.preventDefault();
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const handleSubmission = () => {
        const formData = new FormData();
        formData.append("name", "name");
		formData.append("files", selectedFile);

        fetch("http://localhost:5000/extract-text", {
            method: "POST",
            body: formData
        }).then(response =>{
            return response.text();
        }).then(extractedText =>{
            let oper = [];
            let txt = extractedText;
            let final = "";
            let arr = txt.split("\n");
            let i = 0;
            let totalSum = 0;
            let operations = 0;
            for(let it of arr){
                operations++;
                if(!isNaN(parseInt(it.trim().charAt(0)))) { 
                    let line = it.split(" ");
                    let finLine = "";
                    let ch = false;
                    // console.log("line: " + line);
                    let helper = "";
                    for(let word of line){
                        if(word == "") continue;
                        if(ch){
                            // console.log("help  " + helper);
                            helper =helper + word;
                            // console.log("helper" + helper);
                            if(word == line[line.length -1]) finLine = finLine + helper;
                        }
                        else if(word == "Покупка" || word == "Пополнение" || word == "Перевод"){
                            finLine = finLine + word + " ";
                            ch = true;
                        }
                        else finLine = finLine + word + " ";
                    }
                    let finArr = finLine.split(" ");
                    console.log(finArr);
                    let sign = finArr[0][8];
                    let dt = finArr[0].slice(0,-1);
                    let sm;
                    let numSum = 0;
                    let crr; let opr; let dtl;
                    if(finArr.length == 5){
                        sm = sign + finArr[1];
                        numSum = parseInt(finArr[1]);
                        if(sign == "-") numSum = (-1) * numSum;
                        crr = finArr[2] + "        ";
                        opr = finArr[3];
                        dtl = finArr[4];
                    }
                    else if(finArr.length == 6){
                        sm = sign + finArr[1] + " " + finArr[2];
                        // console.log(finArr[2]);
                        numSum = parseInt(finArr[1]) * 1000 + parseInt(finArr[2]);
                        if(sign == "-") numSum = (-1) * numSum;
                        crr = finArr[3] + "      ";
                        opr = finArr[4];
                        dtl = finArr[5];
                    }
                    else if(finArr.length == 7){
                        sm = sign + finArr[1] + " " + finArr[2] + " " + finArr[3];
                        numSum = parseInt(finArr[1]) * 1000000 + parseInt(finArr[2]) * 1000 + parseInt(finArr[3]);
                        if(sign == "-") numSum = (-1) * numSum;
                        crr = finArr[4] + " ";
                        opr = finArr[5];
                        dtl = finArr[6];
                    }
                    
                    finArr[1] = sign + finArr[1];
                    finLine = dt +  "    " + sm + " " + crr + "    " + opr + "    " + dtl;
                         
                    final += finLine + "\n";
                    let obj = {
                        date: dt,
                        sum: numSum,
                        curr: crr,
                        operation: opr,
                        detail: dtl,
                    }
                    totalSum += numSum;
                    console.log(obj);
                }
            }
            console.log(totalSum);
            let resulltTotalSum = "Total Balance: " + totalSum;
            let numberOfOperations = "Number of total operations: " + operations;
            let final2 = resulltTotalSum + "\n"+ numberOfOperations;
            
            setText(final);
            setText2(final2);
        });
    }
  return (
    <div>
     <h1>Home Page</h1>
    <input id='fileid' type='file' name="file" onChange={changeHandler} style={{width:'280px'}} />
        <button onClick={handleSubmission}>Upload</button>
        <button onClick={()=> navigate("/process")}>Process</button>
        <br/>
        <br/>
        <textarea id="resultText" style={{width:'1200px', height:'150px', marginLeft: '20px',}} placeholder="your pdf text..." value={text}></textarea>
        <br/>
        <br/>
        <textarea id="resultText" style={{width:'1200px', height:'150px', marginLeft: '20px',}} placeholder="your pdf text..." value={text2}></textarea>
    </div>

  );
}

export default Home;
