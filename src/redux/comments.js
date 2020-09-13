import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload; // This I got from ActionCreators(object which contains the value of a new comment)
      comment.id = state.length;
      comment.Date = new Date().toISOString(); // This i am creating a date and adding into comment object as property
      //comment.Date = "2014-09-05T17:57:28.556094Z";
      console.log("Comment: ", comment);
      return state.concat(comment); // or I can write like this return [...state, comment]
    //The above statement create a new object array by adding comment object to state object array into it and than returns it
    default:
      return state;
  }
};
