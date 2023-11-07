import { Tldraw, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

export default function App() {
  return (
    <div
      style={{
        position: "absolute",
        width: 500,
        height: 500,
        top: 0,
        left: 0,
      }}
    >
      <Tldraw />
      <SaveButton />
    </div>
  );
}

function SaveButton() {
  const editor = useEditor();
  return (
    <button
      onClick={() => {
        const snapshot = editor.store.getSnapshot();
        const stringified = JSON.stringify(snapshot);
        localStorage.setItem("my-editor-snapshot", stringified);
      }}
    >
      Save
    </button>
  );
}
