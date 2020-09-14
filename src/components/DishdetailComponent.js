import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import { Loading } from "./LoadingComponent";

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {
    var commentList = comments.map((comment) => {
      return (
        <li key={comment.id}>
          {comment.comment}
          <br />
          <br />
          -- {comment.author},{" "}
          {new Date(comment.date).toLocaleDateString("default", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          ;
          <br />
          <br />
        </li>
      );
    });
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">{commentList}</ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  }
}
function DishDetail(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish !== null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
            {/* //The above parameter: 1. takes all the comments, 2.pass the new comment which needs to be added, 3.Passed the dishId where it needs to be added */}
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default DishDetail;
