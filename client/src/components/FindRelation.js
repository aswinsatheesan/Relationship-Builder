import React, { useState, useEffect } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const FindRelation = () => {
  const [relations, setRelations] = useState([]);
  const [people, setPeople] = useState([]);
  const [fperson, setFperson] = useState("");
  const [sperson, setSperson] = useState("");
  const [update, setUpdate] = useState(0);
  const [output, setOutput] = useState("");

  useEffect(() => {
    getPeople();
    getRelations();
  }, [update]);

  const getRelations = async () => {
    try {
      const res = await fetch("/relations");
      const jsonData = await res.json();
      setRelations(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getPeople = async () => {
    try {
      const res = await fetch("/person");
      const jsonData = await res.json();
      setPeople(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  let p1 = "";
  let p2 = "";
  let ptemp = "";
  let tempArray = [];
  let i = 0;
  let relationsTemp = [];
  let flag=false;

  const outputrel = () => {
      if(i==1) return;
    relations.forEach((e) => {
        if(i==1) return;
      if (e.firstperson == p1 && e.secondperson == sperson) {
        if (tempArray[tempArray.length - 1] != p1) {
          tempArray.push(p1);
        }
        tempArray.push(e.secondperson);
        i = 1;
        return;
      } else if (e.secondperson == p1 && e.firstperson == sperson) {
        if (tempArray[tempArray.length - 1] != p1) {
          tempArray.push(p1);
        }
        tempArray.push(e.firstperson);
        i=1;
        return;
      }
    });
if(i==1) return;

    relations.forEach((e) => { 
        if(i==1) return;
      if (
        e.firstperson == p1 &&
        e.secondperson != p2 &&
        e.secondperson != fperson
      ) {
        relationsTemp.forEach((e1)=>{
          if((e.firstperson==e1.firstperson&&e.secondperson==e1.secondperson)||(e.secondperson==e1.firstperson&&e.firstperson==e1.secondperson)){
            flag=true;
          }
        })
        if(flag==false){
          p1 = e.secondperson;
            p2 = e.firstperson;
            tempArray.push(p1);
            relationsTemp.push(e);
            outputrel();
        }
        p2=p1;
        p1=tempArray[tempArray.length-1];
        flag=false;
      } else if (
        e.secondperson == p1 &&
        e.firstperson != p2 &&
        e.firstperson != fperson
      ) {
        relationsTemp.forEach((e1)=>{
          if((e.firstperson==e1.firstperson&&e.secondperson==e1.secondperson)||(e.secondperson==e1.firstperson&&e.firstperson==e1.secondperson)){
            flag=true;
          }
        })
        if(flag==false){
          p1 = e.firstperson;
            p2 = e.secondperson;
            tempArray.push(p1);
            relationsTemp.push(e);
            outputrel();
        }
        p2=p1;
        p1=tempArray[tempArray.length-1];
        flag=false;
      }
      
    });
    if(i==1) return;
    ptemp = p1;
      p1 = p2;
      p2 = ptemp;
      tempArray.pop();
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(fperson==sperson){
        setOutput(fperson+" = "+sperson);
    }else{
    getRelations();
    p1 = fperson;
    p2 = "";
    i=0;
    tempArray=[];
    relationsTemp=[];
    flag=false;
    tempArray.push(fperson);
    ptemp="";
    outputrel();
    let out="";
    if(tempArray.length==0){
        setOutput("No relation exists between "+fperson+" and "+sperson+" !");
    }else{
    for(let i=0;i<tempArray.length;i++){
        if(i==tempArray.length-1){
            out+=tempArray[tempArray.length-1];
        }else{
            out+=tempArray[i]+" > ";
        }
    }
    setOutput(out);
}
    }
  };

  return (
    <>
      <h4 className="text" style={{marginTop:"70px"}}>&lt;&gt;Find Relation&lt;/&gt;</h4>
      <Form
        style={{ height: "200px" }}
        className="mt-3"
        onSubmit={onSubmitForm}
      >
        <Row>
          <Col md="4" className="d-flex">
            <Input
              value={fperson}
              onChange={(e) => setFperson(e.target.value)}
              onClick={() => setUpdate(update + 1)}
              name="first person"
              type="select"
            >
              <option value="null">Select Person 1</option>
              {people.map((item) => (
                <option key={item.pid} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Input>
          </Col>
          <Col md="4" className="d-flex">
            <Input
              value={sperson}
              onChange={(e) => setSperson(e.target.value)}
              onClick={() => setUpdate(update + 1)}
              name="second person"
              type="select"
            >
              <option value="null">Select Person 2</option>
              {people.map((item) => (
                <option key={item.pid} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Input>
          </Col>
          <Col md="4" className="d-flex">
            <Button
              style={{ borderRadius: "5px", width: "100%" }}
              className="btn btn-success "
            >
              Find Relation
            </Button>
          </Col>
        </Row>
        <center style={{margin:"50px"}}>
          <h3>{output}</h3>
          </center>
      </Form>
      
    </>
  );
};

export default FindRelation;
