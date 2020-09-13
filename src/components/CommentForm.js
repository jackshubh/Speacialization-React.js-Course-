import React, { Component } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import {
  Button,
  Modal,
  ModalBody,
  Label,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    console.log(values);
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
    // console.log("Current State is: " + JSON.stringify(values));
    // alert("Current State is: " + JSON.stringify(values));
  }

  render() {
    return (
      <div>
        <div className="row m-1">
          <Button outline onClick={this.toggleModal}>
            <i className="fa fa-pencil fa-lg"></i>
            <span> Submit comment</span>
          </Button>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row>
                <Label htmlFor="rating" md="auto">
                  Rating
                </Label>
              </Row>
              <Row>
                <Col>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>--Select--</option>{" "}
                    {/* By default if this is not there
                                        option 1 is not selected while submiting the form. This is one of the way to handle it.*/}
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row>
                <Label htmlFor="yourname" md="auto">
                  Your Name
                </Label>
              </Row>
              <Row>
                <Col>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Label htmlFor="message" md="auto">
                  Your Feedback
                </Label>
              </Row>
              <Row>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={{ size: 10 }} style={{ padding: "15px" }}>
                  <Button
                    type="submit"
                    color="primary"
                    value="submit"
                    style={{ cursor: "pointer" }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default CommentForm;
