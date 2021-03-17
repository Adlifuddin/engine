import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function Breadcrumbs(props) {
  const { tableName, fieldName } = props;
  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/data-model" }}>
        <span className="database">{tableName}</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>
        <span className="datasource">{fieldName}</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
