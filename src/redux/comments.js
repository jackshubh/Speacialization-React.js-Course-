import * as ActionTypes from "./ActionTypes";

export const Comments = (
  state = {
    errMess: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        errMess: null,
        comments: action.payload,
      };
    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        errMess: action.payload,
        comments: [],
      };
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload; // This I got from ActionCreators(object which contains the value of a new comment)
      comment.id = state.comments.length;
      comment.Date = new Date().toISOString(); // This i am creating a date and adding into comment object as property
      //comment.Date = new Date("September 15, 2020 10:07:32");
      console.log(new Date());
      console.log("Comment: ", comment);
      return { ...state, comments: state.comments.concat(comment) }; //state.concat(comment); // or I can write like this return [...state, comment]
    //The above statement create a new object array by adding comment object to state object array into it and than returns it
    default:
      return state;
  }
};
