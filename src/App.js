import { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const origianlLayouts = JSON.parse(localStorage.getItem("layouts")) || "{}";

function App() {
  const [layouts, setLayouts] = useState(origianlLayouts);
  const [isEditable, setIsEditable] = useState(false);

  const items = [
    { i: "1", x: 0, y: 0, w: 2, h: 2 },
    { i: "2", x: 2, y: 0, w: 2, h: 2 },
    { i: "3", x: 4, y: 0, w: 2, h: 2 },
  ];
  function handleEditable() {
    setIsEditable((prev) => !prev);
  }
  function handleSave() {
    alert("Layouts saved in LocalStorage");
    localStorage.setItem("layouts", JSON.stringify(layouts));
  }
  function handleLayoutChange(layout, layouts) {
    setLayouts(layouts);
  }
  function handleReset() {
    setLayouts([]);
    localStorage.clear();
  }
  return (
    <div>
      <button onClick={handleEditable} style={{ margin: 10 }}>
        Editable
      </button>
      <button onClick={handleSave} style={{ margin: 10 }}>
        Save
      </button>
      <button onClick={handleReset} style={{ margin: 10 }}>
        Reset
      </button>
      <ResponsiveReactGridLayout
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        layouts={layouts}
        isResizable={isEditable}
        isDraggable={isEditable}
        style={{
          border: "1px dashed black",
        }}
        onLayoutChange={handleLayoutChange}
      >
        {items.map(({ i, x, y, w, h }) => (
          <div
            key={i}
            data-grid={{ x, y, w, h }}
            style={{ border: "1px solid black" }}
          >
            <span className="text">{i}</span>
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default App;
