import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import axios from "axios";

const Diarymanager = () => {
  const [show, setShow] = useState(false);
  const [deletebox, setdeletebox] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteInfo, setDeleteInfo] = useState({});
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventData, setEventData] = useState({});
  const [data, setData] = useState([{_id: '64f890dea9016c667c763cfd', id: 1, title: 'hii', start: '2023-09-06T01:30:00.000Z', end: '2023-09-06T03:30:00.000Z'}]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAlert = () => setdeletebox(false);
  const handleShowAlert = () => setdeletebox(true);

  async function getData() {
    try {
      const response = await axios.get("http://localhost:8000/");
      console.log(response.data);
      setData([...response.data]);
    } catch (error) {
      // console.log(error);
      alert(error)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  var handleSelect = async (a) => {
    handleShow();
    var y = {
      start: a.startStr.slice(0, 19),
      end: a.endStr.slice(0, 19),
      // start: a.start,
      // end: a.end,
      allDay: a.allDay,
      startStr:a.startStr.slice(0, 19),
      endStr:a.endStr.slice(0, 19)
    };
    setEventData(y);
    // console.log(y)
    // console.log(a);
  };

  var addevent = async () => {
    handleClose();
    var payload = {
      id: data.length + 1,
      title: eventName,
      location: eventLocation,
      start: eventData.start,
      end: eventData.end,
      startStr:eventData.startStr,
      endStr:eventData.endStr,
      allDay: eventData.allDay,
    };
    try {
      const response = await axios.post("http://localhost:8000/", payload);
      // console.log(response.data);
      // setData(response.data.data)
    } catch (error) {
      // console.log(error);
      alert(error)
    }
    setData([...data, payload]);
    // console.log(payload);
  };

  async function deletingfunction(id) {
    handleCloseAlert();
    // console.log(id);
    try {
      const response = await axios.delete(`http://localhost:8000/${id}`);
      // console.log(response.data);

      setData(response.data.data)
    } catch (error) {
      // console.log(error);
      alert(error)
    }
  }

  function eventdelete(info) {
    
    handleShowAlert();
    setDeleteId(info.event.id);

    setDeleteInfo(info.event);

  }

  return (
    <div>
      {/* Bootstrap modal */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Event Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Event Title"
                onChange={(e) => setEventName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingpassword"
              label="Event Location"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Event Location"
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingpassword"
              label="Event Date & Time"
              className="mb-3"
            >
              <Form.Control
                type="text"
                disabled
                readOnly
                value={eventData.startStr + "  -  " + eventData.endStr}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addevent}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deletebox} onHide={handleCloseAlert} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete this Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>Event Title: </b>
            {deleteInfo.title}
          </p>
          <p>
            <b>Event Start Time: </b>
            {deleteInfo.startStr}
          </p>
          {deleteInfo.endStr ? (
            <p>
              <b>Event End Time: </b>
              {deleteInfo.endStr}
            </p>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deletingfunction(deleteId)}>
            Delete Event
          </Button>
        </Modal.Footer>
      </Modal>

      <FullCalendar
        plugins={[
          dayGridPlugin,
          multiMonthPlugin,
          interactionPlugin,
          bootstrap5Plugin,
          timeGridPlugin,
          listPlugin,
          momentTimezonePlugin,
        ]}
        select={handleSelect}
        eventClick={eventdelete}
        // timeZone="Asia/Kolkata"
        initialView="timeGridDay"
        themeSystem="bootstrap5"
        // theme="Lux"
        headerToolbar={{
          left: "prev,next today listMonth",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear",
        }}
        buttonText={{ list: "Show Events" }}
        selectable={true}
        weekends={true}
        events={data}
      />
    </div>
  );
};

export default Diarymanager;
