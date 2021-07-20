import React, { useState, Fragment } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
  Row,
  Col,
} from "reactstrap";

const EditRelation = ({ item, update }) => {
  const [tag, setTag] = useState(item.tag);
  const [modal, setModal] = useState(false);
  const [tags, setTags] = useState([]);
  const toggle = () => setModal(!modal);

  const getTags = async () => {
    try {
      const res = await fetch("/tags");
      const jsonData = await res.json();
      setTags(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateTag = async (e) => {
    e.preventDefault();
    try {
      const body = { tag };
      await fetch(`/relations/${item.rid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      update();
    } catch (error) {
      console.error(error.message);
    }
    toggle();
  };
  return (
    <Fragment>
      <Button
        onClick={() => {
          toggle();
          getTags();
        }}
        color="warning"
      >
        Edit
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Change Relation</ModalHeader>
        <Form onSubmit={updateTag}>
          <ModalBody>
            <FormGroup>
              <Row>
                <Col>
                  <Label>First Person</Label>
                </Col>
                <Col>
                  <Label>Choose Relation</Label>
                </Col>
                <Col>
                  <Label>Second Person</Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input type="text" value={item.firstperson} disabled></Input>
                </Col>
                <Col>
                  <Input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    name="tag"
                    type="select"
                  >
                    {tags.map((item) => (
                      <option key={item.tid} value={item.tag}>
                        {item.tag}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col>
                  <Input type="text" value={item.secondperson} disabled></Input>
                </Col>
              </Row>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="warning">
              Edit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EditRelation;
