import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, Input, Table } from "reactstrap";
import EditTag from "./EditTag";

const ListTags = () => {
  const [tag, setTag] = useState("");
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(0);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (tag.match("^[ ]*$") != null) {
        document.getElementById("input2").classList.add("iperror");
        setTimeout(function () {
          document.getElementById("input2").classList.remove("iperror");
        }, 2000);
      } else {
        let flag = false;
        data.forEach((e) => {
          if (e.tag.toLowerCase() == tag.toLowerCase()) flag = true;
        });
        if (flag == false) {
          const body = { tag };
          if (tag !== "") {
            await fetch("/tags", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            setTag("");
            setUpdate(update + 1);
          }
        } else {
          alert("Tag " + tag + " already exists!!!");
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTags();
  }, [update]);

  const getTags = async () => {
    try {
      const res = await fetch("/tags");
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTag = async (id) => {
    try {
      await fetch(`/tags/${id}`, {
        method: "DELETE",
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h4 className="  text" style={{ marginTop: "70px" }}>
        &lt;&gt;Tags&lt;/&gt;
      </h4>
      <Form className="d-flex mt-3 mb-3 input-group" onSubmit={onSubmitForm}>
        <Input
          id="input2"
          style={{ marginRight: "20px", borderRadius: "5px" }}
          type="text"
          value={tag}
          onChange={(e) => {
            if (e.target.value.match("^[]?[a-zA-Z]*$") != null)
              setTag(e.target.value);
          }}
        />
        <Button style={{ borderRadius: "5px" }} className="btn btn-success ">
          Add Tag
        </Button>
      </Form>
      <div className="tablebody">
        <Table className="text-center">
          <col width="100" />
          <col width="100" />
          <col width="100" />
          <col width="100" />
          <tr className="tableheading">
            <th className="tableheading">ID</th>
            <th className="tableheading">Tag</th>
            <th className="tableheading">Edit</th>
            <th className="tableheading">Delete</th>
          </tr>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.tid}>
                  <td>{item.tid}</td>
                  <td>{item.tag}</td>
                  <td>
                    <EditTag
                      update={() => (window.location = "/")}
                      item={item}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        deleteTag(item.tid);
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

export default ListTags;
