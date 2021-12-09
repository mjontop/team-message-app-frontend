import { TextField } from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { createNewChannel } from "./helper";

const NewChannel = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    isCreating: false,
    error: false,
  });
  const router = useRouter();
  const handleCreateNewChannel = () => {
    if (values.name.trim() === "") return;
    if (values.description.trim() === "") return;
    setValues((prev) => ({ ...prev, isCreating: true }));
    createNewChannel(values).then((data) => {
      if (!data.error) {
        router.push(`/channel/${data.channel._id}`);
      } else {
        setValues((prev) => ({ ...prev, error: true }));
      }
    });
    setValues((prev) => ({ ...prev, isCreating: false }));
  };

  return (
    <div className="d-flex flex-column">
      {values.error && (
        <b className="text-center text-danger mb-1">Error Creating Channel</b>
      )}
      <TextField
        label="Channel Name"
        variant="filled"
        value={values.name}
        onChange={(e) => {
          setValues({
            ...values,
            name: e.target.value,
          });
        }}
      />

      <TextField
        label="Description"
        variant="filled"
        multiline
        onChange={(e) => {
          setValues({
            ...values,
            description: e.target.value,
          });
        }}
        value={values.description}
        minRows={2}
        className="my-2"
      />

      <button
        className="btn-new outline white-purple"
        onClick={handleCreateNewChannel}
        style={{ height: "3rem" }}
      >
        Create <AddOutlined />
      </button>
    </div>
  );
};

export default NewChannel;
