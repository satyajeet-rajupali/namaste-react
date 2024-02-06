/**
 * 
 * <div id="parent">
 *      <div id="child1">
 *          <h1 id="heading1">Heading h1 from child1</h1>
 *          <h2 id="heading2">Heading h from child1</h2>
 *      </div>
 *      <div id="child2">
 *          <h1 id="heading3">Heading h1 from child1</h1>
 *          <h2 id="heading4">Heading h from child1</h2>
 *      </div> 
 * </div>
 * 
 * 
 * **/

const parent = React.createElement("div", {id:"parent"}, [
    React.createElement("div", {id:"child1"}, [
        React.createElement("h1", {id:"heading1"}, "Heading h1 from child1"),
        React.createElement("h2", {id:"heading2"}, "Heading h2 from child1")
    ]),
    React.createElement("div", {id:"child2"}, [
        React.createElement("h1", {id:"heading3"}, "Heading h1 from child2"),
        React.createElement("h2", {id:"heading4"}, "Heading h2 from child2")
    ])
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);