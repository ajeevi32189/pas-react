import React, { useEffect, useRef } from "react";
import SunEditor from "suneditor-react";
import { Card } from "antd";
import "suneditor/dist/css/suneditor.min.css";

const HtmlEditor = ({ value, onChange, label = "Editor", height = 800 }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        const editor = editorRef.current?.editor;
        if (editor?.core?.exitFullScreen) {
          editor.core.exitFullScreen();
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="relative z-40">
      <style>{`
        html, body {
          height: 100%;
          overflow: auto !important;
        }

        .sun-editor .se-btn-select-box {
          max-height: 300px;
          overflow-y: auto;
          z-index: 9999 !important;
          background: white;
          border: 1px solid #e5e7eb;
        }

        .sun-editor {
          z-index: 1000 !important;
        }

        .sun-editor .se-dialog {
          z-index: 9999 !important;
        }

        .se-fullscreen {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 99999 !important;
          background: white !important;
        }

        .se-wrapper,
        .se-wrapper-inner,
        .se-container {
          width: 100% !important;
          max-width: 100vw !important;
          height: 100% !important;
        }

        /* Set dynamic editor height directly */
        .sun-editor .se-wrapper {
          min-height: ${height}px !important;
        }
      `}</style>

      <Card
        title={<span className="text-base font-semibold">{label}</span>}
        bordered={false}
        className="rounded-2xl shadow-md border border-gray-200"
        headStyle={{
          background: "#f5f5f5",
          fontWeight: 600,
          borderRadius: "0.75rem 0.75rem 0 0",
        }}
        bodyStyle={{
          overflow: "visible",
          zIndex: 30,
          padding: "1rem",
        }}
      >
        <div className="rounded-xl overflow-visible">
          <SunEditor
            ref={editorRef}
            setContents={value}
            onChange={onChange}
            setOptions={{
              height: `${height}px`, // Proper dynamic height
              showPathLabel: false,
              charCounter: true,
              charCounterType: "char",
              maxCharCount: 100000,
              buttonList: [
                [
                  "undo",
                  "redo",
                  "font",
                  "fontSize",
                  "formatBlock",
                  "paragraphStyle",
                  "blockquote",
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "fontColor",
                  "hiliteColor",
                  "align",
                  "list",
                  "table",
                  "link",
                  // "image",
                  "codeView",
                  "preview",
                  // "fullScreen",
                ],
              ],
            }}
          />
          <p className="text-sm text-gray-500 mt-3">
            You can use formatting, tables, links, images, code view, and fullscreen.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default HtmlEditor;


// // components/HtmlEditor.jsx
// import React from "react";
// import SunEditor from "suneditor-react";
// import "suneditor/dist/css/suneditor.min.css";

// const HtmlEditor = ({ value, onChange }) => {
//   return (
//     <SunEditor
//       setContents={value}
//       onChange={onChange}
//       setOptions={{
//         height: 300,
//         buttonList: [
//           [
//             "undo",
//             "redo",
//             "bold",
//             "underline",
//             "italic",
//             "strike",
//             "list",
//             "align",
//             "fontSize",
//             "formatBlock",
//             "table",
//             "link",
//             "image",
//             "codeView",
//           ],
//         ],
//       }}
//     />
//   );
// };

// export default HtmlEditor;
