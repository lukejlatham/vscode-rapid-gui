const dummyLayout =
  '[{"id":"ROOT","type":"Background","nodes":["ContainerID"]},{"id":"ContainerID","type":"Container","nodes":["Rows1"]},{"id":"Rows1","type":"Rows","numberOfRows":3,"linked_nodes":{"row-0":"Row1","row-1":"Row2","row-2":"Row3"}},{"id":"Row1","type":"Row","nodes":["Columns1"]},{"id":"Columns1","type":"Columns","numberOfColumns":5,"linked_nodes":{"column-0":"Column1","column-1":"Column2","column-2":"Column3","column-3":"Column4","column-4":"Column5"}},{"id":"Column1","type":"Column","nodes":["Button1"]},{"id":"Button1","type":"Button"},{"id":"Column2","type":"Column","nodes":["Button2"]},{"id":"Button2","type":"Button"},{"id":"Column3","type":"Column","nodes":["Button3"]},{"id":"Button3","type":"Button"},{"id":"Column4","type":"Column","nodes":["Button4"]},{"id":"Button4","type":"Button"},{"id":"Column5","type":"Column","nodes":["Button5"]},{"id":"Button5","type":"Button"},{"id":"Row2","type":"Row","nodes":["Columns2"]},{"id":"Columns2","type":"Columns","numberOfColumns":2,"linked_nodes":{"column-0":"Column6","column-1":"Column7"}},{"id":"Column6","type":"Column","nodes":["Textbox1"]},{"id":"Textbox1","type":"Textbox"},{"id":"Column7","type":"Column","nodes":["Image1"]},{"id":"Image1","type":"Image"},{"id":"Row3","type":"Row","nodes":["Columns3"]},{"id":"Columns3","type":"Columns","numberOfColumns":5,"linked_nodes":{"column-0":"Column8","column-1":"Column9","column-2":"Column10","column-3":"Column11","column-4":"Column12"}},{"id":"Column8","type":"Column","nodes":["Textbox2"]},{"id":"Textbox2","type":"Textbox"},{"id":"Column9","type":"Column","nodes":["Image2"]},{"id":"Image2","type":"Image"},{"id":"Column10","type":"Column","nodes":["Textbox3"]},{"id":"Textbox3","type":"Textbox"},{"id":"Column11","type":"Column","nodes":["Button6"]},{"id":"Button6","type":"Button"},{"id":"Column12","type":"Column","nodes":["Label1"]},{"id":"Label1","type":"Label"}]';

const getLayoutDescriptionToolJson = {
  type: "function",
  function: {
    name: "getLayoutDescription",
    description: "Gives the layout of the current UI as a json tree",
    parameters: {},
  },
};

async function getDescriptionTool(): Promise<string> {
  // This is a dummy implementation. Replace this with your actual implementation.
  return dummyLayout;
}

export { getLayoutDescriptionToolJson, getDescriptionTool };
