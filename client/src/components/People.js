import React,{ Fragment, useState, useEffect} from "react";
import { Button, Form, Input, Table, Alert } from "reactstrap";
import EditPerson from "./EditPerson";

const ListPeople = () => {

    const [person,setPerson] = useState("");
    const [data,setData] = useState([]);
    const [update,setUpdate] = useState(0);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            if(person.match("^[ ]*$")!=null){
                document.getElementById("input").classList.add("iperror");
                setTimeout(function(){ document.getElementById("input").classList.remove("iperror"); }, 2000);
            }else{
            let flag=false;
            data.forEach((e)=>{
                if(e.name.toLowerCase()==person.toLowerCase()){
                    flag=true;
                }
            });
            if(flag==false){
            const body = { person };
            await fetch("/person", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });
              setPerson("");
              setUpdate(update+1);
        }else{
            alert("Person "+person+" already exists!!!");
            setPerson("");
        }
    }
        } catch (err) {
            console.error(err.message);
        }
    }

    
    const getPeople = async () => {
        try {
          const res = await fetch("/person");
          const jsonData = await res.json();
          setData(jsonData);
        } catch (error) {
          console.error(error.message);
        }
      };

      const deletePerson = async (id) => {
          try {
            await fetch(`/person/${id}`, {
                method: "DELETE",
              });
              window.location= "/";
          } catch (error) {
              console.error(error.message);
          }
        
      };
      useEffect(()=>{
        getPeople();
    },[update]);

  

    return(
        <Fragment>
            <h4 className=" mt-5 text">&lt;&gt;People&lt;/&gt;</h4>
            <Form className="d-flex mt-3 mb-3 input-group" onSubmit={onSubmitForm}>
                <Input id="input" style={{marginRight:'20px',borderRadius:'5px'}} type="text" value={person} onChange={e => {
                    if(e.target.value.match("^[a-zA-Z ]*$")!=null)
                    setPerson(e.target.value)}}/>
                <Button style={{borderRadius:'5px'}} className="btn btn-success ">Add Person</Button> 
            </Form>
            <div className="tablebody">
            <Table className="text-center">
            <col width="100"/>
            <col width="100"/>
                <col width="100"/>
                <col width="100"/>
            <tr className="tableheading">
                        <th className="tableheading">ID</th>
                        <th className="tableheading">Name</th>
                        <th className="tableheading">Edit</th>
                        <th className="tableheading">Delete</th>
                    </tr>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr key={item.pid}>
                                <td>{item.pid}</td>
                                <td>{item.name}</td>
                                <td>
                                    <EditPerson 
                                     update={() => window.location="/"}
                                     item={item}
                                    />
                                </td>
                                <td>
                                    <Button
                                    onClick={() => {
                                    deletePerson(item.pid);
                                    }}
                                    color="danger"
                                    >
                                    Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            </div> 
        </Fragment>
    )
}

export default ListPeople;


  