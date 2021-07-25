import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, Input, Table, Col, Row } from "reactstrap";
import EditRelation from "./EditRelation";

const ListRelations = () => {
  const [people, setPeople] = useState([]);
  const [tags, setTags] = useState([]);
  const [fperson, setFperson] = useState("");
  const [sperson, setSperson] = useState("");
  const [tag, setTag] = useState("");
  const [update, setUpdate] = useState(0);
  const [update2, setUpdate2] = useState(0);
  const [relations, setRelations] = useState([]);

  useEffect(() => {
    getPeople();
    getTags();
  }, [update]);

  useEffect(() => {
    getRelations();
  }, [update2]);

  const getPeople = async () => {
    try {
      const res = await fetch("/person");
      const jsonData = await res.json();
      setPeople(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  const getTags = async () => {
    try {
      const res = await fetch("/tags");
      const jsonData = await res.json();
      setTags(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  const getRelations = async () => {
    try {
      const res = await fetch("/relations");
      const jsonData = await res.json();
      setRelations(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteRelation = async (id) => {
    try {
      await fetch(`/relations/${id}`, {
        method: "DELETE",
      });
      setUpdate2(update2 + 1);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (fperson == "" || sperson == "" || tag == "") {
        if (fperson == "") {
          document.getElementById("input3").classList.add("iperror");
          setTimeout(function () {
            document.getElementById("input3").classList.remove("iperror");
          }, 2000);
        }
        if (sperson == "") {
          document.getElementById("input4").classList.add("iperror");
          setTimeout(function () {
            document.getElementById("input4").classList.remove("iperror");
          }, 2000);
        }
        if (tag == "") {
          document.getElementById("input5").classList.add("iperror");
          setTimeout(function () {
            document.getElementById("input5").classList.remove("iperror");
          }, 2000);
        }
      } else {
        let flag = false;
        relations.forEach((e) => {
          if (
            (e.firstperson.toLowerCase() == fperson.toLowerCase() &&
              e.secondperson.toLowerCase() == sperson.toLowerCase()) ||
            (e.firstperson.toLowerCase() == sperson.toLowerCase() &&
              e.secondperson.toLowerCase() == fperson.toLowerCase())
          )
            flag = true;
        });
        if (flag == false) {
          const body = { person1: fperson, person2: sperson, tag: tag };
          await fetch("/relations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          setFperson("");
          setSperson("");
          setTag("");
          setUpdate2(update2 + 1);
        } else {
          alert(
            "Relation between " +
              fperson +
              " and " +
              sperson +
              " already exists!!!"
          );
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h4 className="text" style={{ marginTop: "70px" }}>
        &lt;&gt;Relations&lt;/&gt;
      </h4>
      <Form
        style={{ maxheight: "200px" }}
        className="mt-3"
        onSubmit={onSubmitForm}
      >
        <Row>
          <Col md="4" className="d-flex">
            <Input
              id="input3"
              value={fperson}
              onChange={(e) => setFperson(e.target.value)}
              onClick={() => setUpdate(update + 1)}
              name="first person"
              type="select"
            >
              <option value="">Select Person 1</option>
              {people
                .filter((person) => person.name !== sperson)
                .map((item) => (
                  <option key={item.pid} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </Input>
          </Col>
          <Col md="4" className="d-flex">
            <Input
              id="input4"
              value={sperson}
              onChange={(e) => setSperson(e.target.value)}
              onClick={() => setUpdate(update + 1)}
              name="second person"
              type="select"
            >
              <option value="">Select Person 2</option>
              {people
                .filter((person) => person.name !== fperson)
                .map((item) => (
                  <option key={item.pid} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </Input>
          </Col>
          <Col md="2" className="d-flex">
            <Input
              id="input5"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onClick={() => setUpdate(update + 1)}
              name="tag"
              type="select"
            >
              <option value="">Choose a Tag</option>
              {tags.map((item) => (
                <option key={item.tid} value={item.tag}>
                  {item.tag}
                </option>
              ))}
            </Input>
          </Col>
          <Col md="2" className="d-flex">
            <Button
              style={{ borderRadius: "5px", width: "100%" }}
              className="btn btn-success "
            >
              Add Relation
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="tablebody">
        <Table className="text-center">
          <col width="100" />
          <col width="100" />
          <col width="100" />
          <col width="100" />
          <col width="100" />
          <col width="100" />
          <tr className="tableheading">
            <th className="tableheading">ID</th>
            <th className="tableheading">Person 1</th>
            <th className="tableheading">Person 2</th>
            <th className="tableheading">Relation</th>
            <th className="tableheading">Edit</th>
            <th className="tableheading">Delete</th>
          </tr>
          <tbody>
            {relations.map((item) => {
              return (
                <tr key={item.rid}>
                  <td>{item.rid}</td>
                  <td>{item.firstperson}</td>
                  <td>{item.secondperson}</td>
                  <td>{item.tag}</td>
                  <td>
                    <EditRelation
                      update={() => setUpdate2(update2 + 1)}
                      item={item}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        deleteRelation(item.rid);
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
  );
};

export default ListRelations;
