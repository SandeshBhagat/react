import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import deleteSVG from "../img/delete-icon.svg";
import iconSVG from "../img/pencil-icon.svg";

const Cards = () => {
  const [apiData, setapiData] = useState([]);

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [pageName, setPageName] = useState("");
  const [label, setLabel] = useState("");
  const [blurbContent, setBlurbContent] = useState("");
  const [addNew, setAddNEw] = useState(false);
  const [id, setId] = useState(null);
  const [add, setAdd] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let randomID = Math.floor(Math.random() * 200);
 
  const [newData, setNewData] = useState({
    rule_id: randomID,
    title: "",
    page_name: "",
    page_url: "",
    rules: "",
    blurb_content: ""
  });
  

  // add new data

  const addNewData = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData)
    };
    fetch("http://localhost:4000/api/plugindata/", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  // fetch edit details to form

  const handleEdit = (id) => {
    setId(id);
    apiData.forEach((item) => {
      if (item._id === id) {
        setTitle(item.title);
        setPageName(item.page_name);
        setLabel(item.rules);
        setBlurbContent(item.blurb_content);
      }
    });
    // console.log('dattttta', id)
  };

  // update details


  let updateData = () => {
   
    const data = {
      title: title,
      page_name: pageName,
      rules: label,
      blurb_content: blurbContent
    };
    // sending PATCH request with fetch API in javascript
    fetch("http://localhost:4000/api/plugindata/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PATCH",

      // Fields that to be updated are passed
      body: JSON.stringify(data)
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        setapiData(data)
        setAdd(true)
        // console.log(data);
      });
  };

  // handle delete

  const handleDelete = (id) => {
    fetch('http://localhost:4000/api/plugindata/'+ id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
    setAdd(false)
  }

  useEffect(() => {
    fetch("http://localhost:4000/api/plugindata")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setapiData(data);
      });
      setAdd(false);
  }, [add]);

  console.log(apiData)

  return (
    <>
      <Button
        variant="primary"
        className="addBlurb"
        onClick={() => {
          handleShow();
          setAddNEw(true);
        }}
      >
        Add Blurb
      </Button>

      {addNew ? (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter Blurb Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete='off'
                  onChange={(e) =>
                    setNewData((item) => ({ ...item, title: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Page URL</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete='off'
                  onChange={(e) =>
                    setNewData((item) => ({
                      ...item,
                      page_url: e.target.value
                    }))
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Page Name</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete='off'
                  onChange={(e) =>
                    setNewData((item) => ({
                      ...item,
                      page_name: e.target.value
                    }))
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Label</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete='off'
                  onChange={(e) =>
                    setNewData((item) => ({ ...item, rules: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Blurb Content</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete='off'
                  onChange={(e) =>
                    setNewData((item) => ({
                      ...item,
                      blurb_content: e.target.value
                    }))
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={() => {addNewData();setAdd(true);handleClose()}}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter Blurb Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete='off'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Page Name</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete='off'
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Label</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete='off'
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Blurb Content</Form.Label>
                <Form.Control
                  type="text"
                  value={blurbContent}
                  onChange={(e) => setBlurbContent(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => {
                updateData();
                handleClose();
                setAdd(true)
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {apiData && apiData.length > 0 ? (
        <ul className="cardContainer">
          {apiData.map((obj) => (
            <li className="li" key={obj._id}>
              <div className="titleContainer">
                <p className="card-title">{obj.title}</p>
                <div className="buttons">
                  <img
                    src={iconSVG}
                    alt="pencil icon"
                    className="editBtn"
                    onClick={() => {
                      handleShow();
                      setAddNEw(false);
                      handleEdit(obj._id);
                    }}
                  />
                  <img
                    src={deleteSVG}
                    alt="trash can icon"
                    className="deleteBtn"
                    onClick={() => {handleDelete(obj._id);setAdd(true)}}
                  />
                </div>
              </div>

              <table>
                <thead>
                </thead>
                <tbody>
                <tr>
                  <td className="contentTitle">
                    URL <span>:</span>
                  </td>
                  <td className="contentData">{obj.page_url}</td>
                </tr>
                <tr>
                  <td className="contentTitle">
                    Page Name <span>:</span>
                  </td>
                  <td className="contentData">{obj.page_name}</td>
                </tr>
                <tr>
                  <td className="contentTitle">
                    Label <span>:</span>
                  </td>
                  <td className="contentData">{obj.rules}</td>
                </tr>
                <tr>
                  <td className="contentTitle">
                    Blurb Content <span>:</span>
                  </td>
                  <td className="contentData">
                    <div className="contentDataBrb">{obj.blurb_content}</div>
                  </td>
                </tr>
                </tbody>
                <tfoot></tfoot>
              </table>
            </li>
          ))}
        </ul>
      ) : (
          <div className="noData">No Data To Show!</div>
      )}
    </>
  );
};

export default Cards;
