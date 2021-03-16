import React from "react";
import { Container, Row, Col, Tabs, Tab, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import Breadcrumbs from "../Breadcrumbs";
//import api
import api from "../../../api/metabaseApi";

export default function DateFormat(props) {
  const { status, index } = props;

  const [field, setField] = useState([]);
  const [id, setId] = useState("");

  const [dateStyle, setDateStyle] = useState("");
  const [dateSeparator, setDateSeparator] = useState("");
  const [dateAbbreviate, setDateAbbreviate] = useState("");
  const [timeEnabled, setTimeEnabled] = useState("");
  const [timeStyle, setTimeStyle] = useState("");

  const [table, setTable] = useState("");
  const [name, setName] = useState("");

  //to get database table and display fields
  useEffect(() => {
    api
      .getTableIDMeta(status)
      .then((res) => {
        console.log(res);

        res.data.fields.map((x, i) => {
          if (i == index) {
            setField(x);
            setId(x.id);
            //get initial value for fields
            setDateStyle(x.settings.date_style);
            setDateSeparator(x.settings.date_separator);
            setTimeEnabled(x.settings.time_enabled);
            setTimeStyle(x.settings.time_style);
            setName(x.display_name);
            setTable(res.data.display_name);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeDateStyle = (e) => {
    setDateStyle(e.target.value);
    field.settings.date_style = e.target.value;
    //console.log("new date_style: " + field.settings.date_style);

    //to update date_style
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeDateSeparator = (e) => {
    setDateSeparator(e.target.value);
    field.settings.date_separator = e.target.value;
    //console.log("new date_separator: " + field.settings.date_separator);

    //to update date_separator
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeDateAbbreviate = (e) => {
    let showDateAbbreviate;
    if (e.target.value === "true") {
      showDateAbbreviate = true;
    } else {
      showDateAbbreviate = false;
    }

    setDateAbbreviate(e.target.value);
    field.settings.date_abbreviate = showDateAbbreviate;
    //console.log("new date_abbreviate: " + field.settings.date_abbreviate);
    //to update abbreviate
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeTimeEnabled = (e) => {
    let showTimeEnabled;
    if (e.target.value === "null") {
      showTimeEnabled = null;
    } else {
      showTimeEnabled = e.target.value;
    }

    setTimeEnabled(e.target.value);
    field.settings.time_enabled = showTimeEnabled;
    //console.log("new time_enabled: " + field.settings.time_enabled);
    //to update time_enabled
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeTimeStyle = (e) => {
    setTimeStyle(e.target.value);
    field.settings.time_style = e.target.value;
    //console.log("new time_style: " + field.settings.time_style);

    //to update time_style
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let optionDateSeparator;
  if (
    dateStyle === "MMMM D, YYYY" ||
    dateStyle === "D MMMM, YYYY" ||
    dateStyle === "dddd, MMMM D, YYYY" ||
    dateStyle === "M/D/YYYY"
  ) {
    optionDateSeparator = (
      <>
        <option value="/">M/D/YYYY</option>
        <option value="-">M-D-YYYY</option>
        <option value=".">M.D.YYYY</option>
      </>
    );
  } else if (dateStyle === "D/M/YYYY") {
    optionDateSeparator = (
      <>
        <option value="/">D/M/YYYY</option>
        <option value="-">D-M-YYYY</option>
        <option value=".">D.M.YYYY</option>
      </>
    );
  } else {
    optionDateSeparator = (
      <>
        <option value="/">YYYY/M/D</option>
        <option value="-">YYYY-M-D</option>
        <option value=".">YYYY.M.D</option>
      </>
    );
  }

  return (
    <>
      <Container fluid>
        <Row style={{ marginTop: 20, marginLeft: -30 }}>
          <Breadcrumbs
            tableName={table}
            fieldName={name + " - Field Setting"}
          />
        </Row>
        <Row style={{ marginBottom: 50, marginTop: 20 }}>
          <Col>
            <Row>
              {/*Date style*/
              /*date_style*/}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Date style</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={dateStyle}
                    onChange={changeDateStyle}
                  >
                    <option value="MMMM D, YYYY">January 7, 2018</option>
                    <option value="D MMMM, YYYY">7 January, 2018</option>
                    <option value="dddd, MMMM D, YYYY">
                      Sunday, January 7, 2018
                    </option>
                    <option value="M/D/YYYY">
                      1/7/2018 (month, day, year)
                    </option>
                    <option value="D/M/YYYY">
                      7/1/2018 (day, month, year)
                    </option>
                    <option value="YYYY/M/D">
                      2018/1/7 (year, month, day)
                    </option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/*Date seperators*/
              /*date_separator*/}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Date seperators</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={dateSeparator}
                    onChange={changeDateSeparator}
                  >
                    {optionDateSeparator}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/*Abbreviate names of days and months*/
              /*date_abbreviate*/}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Abbreviate names of days and months</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={dateAbbreviate}
                    onChange={changeDateAbbreviate}
                  >
                    <option value="true">On</option>
                    <option value="false">Off</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/*Show the time*/
              /*time_enabled*/}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Show the time</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={timeEnabled}
                    onChange={changeTimeEnabled}
                  >
                    <option value="null">Off</option>
                    <option value="minutes">HH:MM</option>
                    <option value="seconds">HH:MM:SS</option>
                    <option value="milliseconds">HH:MM:SS:MS</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/*Time style*/
              /*time_styled*/}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Time style</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={timeStyle}
                    onChange={changeTimeStyle}
                  >
                    <option value="h:mm A">5:24 PM (12-hour clock)</option>
                    <option value="k:mm">17:24 (24-hour clock)</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
