import React from "react";
import path from "path";
import db from "./../model/database";

import Config from "./../controller/Config";

import TopicsSelect from "./TopicsSelect";

export default class TopicSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  save(topicId) {
    const name = document.getElementById("name").value;
    let image = document.getElementById("image").value;
    let sortOrder = document.getElementById("sort-order").value;
    let parentId = parseInt(document.getElementById("parent").value);

    if (image === "") {
      image = null;
    }

    if (sortOrder === "") {
      sortOrder = null;
    }

    if (parentId === 0) {
      parentId = null;
    }

    if (topicId === 0) {
      db.createTopic(name, image, sortOrder, parentId);
    } else {
      db.updateTopic(topicId, name, image, sortOrder, parentId);
    }
    this.goBack();
  }

  cancel() {
    this.goBack();
  }

  goBack() {
    this.props.history.goBack();
  }

  render(props) {
    const topicId = parseInt(this.props.match.params.topic_id);
    const topic = topicId !== 0 ? db.getTopic(topicId) : null;

    return (
      <div>
        <h2>{topic ? topic.name : "Create topic"}</h2>
        {topic ? <h4>Edit</h4> : null}

        <label htmlFor="name">Name</label>
        <input type="text" id="name" defaultValue={topic ? topic.name : ""} />

        <label htmlFor="image">Image</label>
        <input type="text" id="image" defaultValue={topic ? topic.image : ""} />

        <label htmlFor="sort-order">Sort order</label>
        <input
          type="text"
          id="sort-order"
          defaultValue={topic ? topic.sort_order : ""}
        />

        <TopicsSelect topic_id={topicId} />

        <input
          onClick={() => this.save(topicId)}
          type="submit"
          className="button-primary float-left"
          value="Save"
        />

        <input
          onClick={() => this.cancel()}
          type="submit"
          className="button-primary float-right"
          value="Cancel"
        />
      </div>
    );
  }
}
