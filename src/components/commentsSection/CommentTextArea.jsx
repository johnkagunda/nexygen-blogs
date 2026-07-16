/* eslint-disable react/prop-types */

import TextareaAutosize from "react-textarea-autosize";
import Swal from "sweetalert2";

const CommentTextArea = ({
  inputText,
  onChangeHandler,
  auth,
  maxLength = 500,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!auth) {
      Swal.fire({
        title: "Login Required",
        text: "You need to be logged in before posting a comment.",
        icon: "warning",
        confirmButtonText: "Okay",
        confirmButtonColor: "#3085d6",
        background: "#18181b",
        color: "#fff",
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      onChangeHandler(e);
    }
  };

  return (
    <div className="w-full space-y-2">
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700"
      >
        Write a comment
      </label>

      <TextareaAutosize
        id="comment"
        minRows={4}
        maxRows={6}
        value={inputText}
        onClick={handleClick}
        onChange={handleChange}
        disabled={!auth || disabled}
        placeholder={
          auth
            ? "Leave a comment..."
            : "Login to write a comment..."
        }
        className={`
          w-full rounded-lg border p-3 text-zinc-800 outline-none
          transition duration-200
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          ${
            !auth || disabled
              ? "cursor-not-allowed bg-gray-100"
              : "bg-white"
          }
        `}
      />

      <div className="flex justify-end text-sm text-gray-500">
        {inputText.length}/{maxLength}
      </div>
    </div>
  );
};

export default CommentTextArea;
