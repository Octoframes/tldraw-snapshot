import { Tldraw, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useState } from "react";

export default function App() {
  const [snapshotData, setSnapshotData] = useState("");

  // This function will be called whenever there is a change in the textarea.
  const handleTextChange = (event) => {
    const newText = event.target.value;
    try {
      const snapshot = JSON.parse(newText);
      // Make sure to validate if the newText is a valid JSON and has the right structure for Tldraw
      // Assuming here it is valid, we update the snapshotData state.
      setSnapshotData(newText);
    } catch (error) {
      // If JSON.parse fails, it means the text is not valid JSON
      // Depending on how you want to handle this, you may want to show an error to the user
      console.error('Invalid JSON:', error);
    }
  };

  // A function to load snapshot from the textarea
  const loadSnapshotFromString = (editor, snapshotString) => {
    try {
      const snapshot = JSON.parse(snapshotString);
      editor.store.loadSnapshot(snapshot);
    } catch (error) {
      console.error('Failed to load snapshot:', error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: 500, height: 500 }}>
        <Tldraw>
          <SaveButton onSave={setSnapshotData} />
          <LoadButton onLoad={(editor) => loadSnapshotFromString(editor, snapshotData)} />
        </Tldraw>
      </div>
      <div style={{ marginLeft: 20, flex: 1 }}>
        <textarea
          style={{ width: "100%", height: 500 }}
          value={snapshotData}
          onChange={handleTextChange}  // Add the onChange event listener
          // Removing readOnly since we want to be able to edit the text
        />
      </div>
    </div>
  );
}

function SaveButton({ onSave }) {
  const editor = useEditor();

  return (
    <button
      style={{ position: "absolute", zIndex: 1000, right: 10, top: 10, backgroundColor: "lightblue" }}
      onClick={() => {
        const snapshot = editor.store.getSnapshot();
        const stringified = JSON.stringify(snapshot);
        localStorage.setItem("my-editor-snapshot", stringified);
        console.log("Saved!");
        console.log(stringified);
        onSave(stringified);
      }}
    >
      Save
    </button>
  );
}

function LoadButton({ onLoad }) {
  const editor = useEditor();

  return (
    <button
      style={{ position: "absolute", zIndex: 1000, right: 10, top: 50, backgroundColor: "lightgreen" }}
      onClick={() => {
        onLoad(editor);
      }}
    >
      Load
    </button>
  );
}
