import React, { useState } from 'react';

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { Controlled as ControlledEditor } from 'react-codemirror2';

import { CgMaximizeAlt } from "react-icons/cg";
import { MdTransitEnterexit } from 'react-icons/md';

export default function Editor({ language, title, value, onChange }) {
  const [open, setOpen] = useState(true);

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className='editor-title'>
        {title}
        <button onClick={() => setOpen((prevOpen) => !prevOpen)} className='expand-collapse-button'>
          {open ? <MdTransitEnterexit /> : <CgMaximizeAlt />}
        </button>
      </div>
      {open && (
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          className='code-mirror-wrapper'
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: "material",
            lineNumbers: true,
          }}
        />
      )}
    </div>
  );
}
