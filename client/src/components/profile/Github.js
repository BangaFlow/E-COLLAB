/* eslint-disable */
import React, { useState, useEffect } from "react";

import { Media, UncontrolledTooltip, Alert, Button } from "reactstrap";
import Loader from "../../helpers/loader";

const Repo = (item) => {
  const [lang, setlang] = useState([]);

  const fetchLanguages = async (url) => {
    const res = await fetch(url, {
      headers: {
        Authorization:
          "Basic MWE3YjRhZGY3ZDA4ZDQ0ODA1NTA6OGJiNmZlN2NmYTVkZjdlM2M0M2ViNTdlNjA5NTJmOGE2YTQ3NDA1ZA==",
      },
    });
    let lan = await res.json();
    setlang(Object.keys(lan));
  };

  useEffect(() => {
    fetchLanguages(item.languages_url);
  }, []);

  return (
    <Media>
      <div className="mr-3"></div>
      <Media body className="overflow-hidden">
        <h5 className="font-size-15 mt-2 mb-1">
          <a href={item.html_url} className="text-dark" rel="noopener noreferrer" target="_blank">
            {item.name}
          </a>
        </h5>
        <ul className="list-inline font-13 text-sm-right">
          <li className="list-inline-item pr-1" id={`repo-avt-${item.id}`}>
            <i className="uil uil-schedule font-16 mr-1"></i>

            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(item.updated_at))}
          </li>
        </ul>

        <UncontrolledTooltip placement="bottom" target={`repo-avt-${item.id}`}>
          Last update
        </UncontrolledTooltip>
        <p className="text-muted font-size-13 text-truncate mb-0">
          {item.description}
        </p>

        {lang.map((item, idx) => (
          <label className="badge badge-soft-primary mr-1" key={idx}>
            {item}
          </label>
        ))}
      </Media>
    </Media>
  );
};

const Github = ({ repos, username }) => {
  const [Limit, setLimit] = useState(4);
  const LoadMore = () => {
    setLimit(Limit + 4);
  };
  return repos.length > 0 ? (
    <React.Fragment>
      <h5 className="mt-3">Github repositories</h5>

      <ul className="list-unstyled">
        {repos.slice(0, Limit).map((item, idx) => {
          return (
            <li className="py-3 border-bottom" key={idx}>
              <Repo {...item} />
            </li>
          );
        })}
      </ul>

      <div className="text-center">
        {Limit < repos.length && (
          <Button color="white" onClick={LoadMore}>
            <Loader className="icon-dual icon-xs mr-2"></Loader>Load more
          </Button>
        )}
      </div>
    </React.Fragment>
  ) : username === "" ? (
    <React.Fragment>
      <br />
      <Alert color="danger">Please enter you github username !!</Alert>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <br />
      <Alert color="warning"> You don't have any repositories !!</Alert>
    </React.Fragment>
  );
};

export default Github;
