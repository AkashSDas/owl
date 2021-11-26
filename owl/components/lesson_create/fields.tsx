import { useContext, useEffect, useState } from "react";
import { InfoCircle, Play, Document, Camera } from "react-iconly";
import { LessonCreateContext } from "../../lib/context/lesson";
import { FormFieldError, FormLabel } from "../signup/fields";
import btnStyle from "../../styles/components/common/Buttons.module.scss";

export const NameField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(LessonCreateContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Lesson name" htmlFor="name" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Play primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          className="w-full bg-grey1 outline-none text-desktop-body-intro"
          type="text"
          placeholder="The Next Big Thing"
          onBlur={handleBlur}
        />
      </div>
      {errors.name && touched.name ? (
        <FormFieldError text={errors.name} />
      ) : null}
    </div>
  );
};

export const DescriptionField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(LessonCreateContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Description" htmlFor="description" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <InfoCircle primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          name="description"
          value={values.description}
          onChange={handleChange}
          className="w-full bg-grey1 outline-none text-desktop-body-intro"
          type="text"
          placeholder="What's this all about"
          onBlur={handleBlur}
        />
      </div>
      {errors.description && touched.description ? (
        <FormFieldError text={errors.description} />
      ) : null}
    </div>
  );
};

export const NoteField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(LessonCreateContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Note" htmlFor="note" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Document primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          name="note"
          value={values.note}
          onChange={handleChange}
          className="w-full bg-grey1 outline-none text-desktop-body-intro"
          type="text"
          placeholder="Optional field. Add any note if needed"
          onBlur={handleBlur}
        />
      </div>
      {errors.note && touched.note ? (
        <FormFieldError text={errors.note} />
      ) : null}
    </div>
  );
};

export const VideoField = () => {
  const { videoFile, setVideoFile } = useContext(LessonCreateContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Video" htmlFor="video" />
      <label
        className={`${btnStyle["input-file-btn"]} mt-2 space-x-2 cursor-pointer`}
      >
        <Camera primaryColor="hsla(265, 100%, 59%, 1)" />
        <div>Upload video{videoFile ? ` | ${videoFile.name}` : ""}</div>
        <input
          type="file"
          style={{ display: "none" }}
          accept="video/mp4,video/x-m4v,video/*"
          onChange={(e) => {
            const file = Array.from(e.target.files)[0];
            setVideoFile(file);
          }}
        />
      </label>
    </div>
  );
};
