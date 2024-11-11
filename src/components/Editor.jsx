import React, { useState } from 'react';

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/javascript-hint";

import { Controlled as ControlledEditor } from 'react-codemirror2';

import { CgMaximizeAlt } from "react-icons/cg";
import { MdTransitEnterexit } from 'react-icons/md';

export default function Editor({ language, title, value, onChange }) {
  const [open, setOpen] = useState(false);

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <div className={`editor-container ${open ? "collapsed" : ""}`}>
      <div className='editor-title'>
        {title}
        <button onClick={() => setOpen((prevOpen) => !prevOpen)} className='expand-collapse-button'>
          {open ? <MdTransitEnterexit /> : <CgMaximizeAlt />}
        </button>
      </div>
       
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
          extraKeys: { "Ctrl-Space": "autocomplete" }, // Enable autocomplete with Ctrl-Space
          hintOptions: { completeSingle: false }, // Show multiple suggestions
        }}
        editorDidMount={(editor) => {
          // Trigger autocomplete on alphanumeric or dot input
          editor.on("inputRead", (instance, change) => {
            if (change.text[0].match(/[\w.]/)) {
              instance.showHint();
            }
          });
        }}
      />
      
    </div>
  );
}
