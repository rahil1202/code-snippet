import React from "react";
import Editor from "@monaco-editor/react";
import { Button} from "@mui/material";
import html2canvas from "html2canvas";
import {useMediaQuery} from "@mui/material";

const EditorLayout = (props) => {
  const editorRef = React.useRef(null);
  const screenshotRef = React.useRef(false);

  const [editorMounted, setEditorMounted] = React.useState(false);
  const [screenshot, setScreenshot] = React.useState("");
  const isSmallScreen = useMediaQuery('(max-width:899.5px)');

  React.useEffect(()=>{
    
    if (!screenshotRef.current)
      return

    editorRef.current.layout();
    const link = document.createElement('a');
    link.href = screenshot;
    link.setAttribute(
      'download',
      `screenshot.png`,
    );
    
    // Append to html link element page
    document.body.appendChild(link);
    
    // Start download
    link.click();
    
    // Clean up and remove the link
    screenshotRef.current = false
    link.parentNode.removeChild(link)

  },[screenshot])

  const handleClick = async () => {
    if (!editorMounted) return;

    // scroll to top
    editorRef.current.setScrollTop(0);
    // Modify the height of the editor to display all of the code
    editorRef.current.layout({
      height: editorRef.current.getContentHeight(),
      width: editorRef.current.getContentWidth() + 200,
    });

    // console.log("clk",editorRef,editorRef.current.getValue(),editorRef.current.getDomNode(),editorRef.current.getContentHeight(),editorRef.current.getContentWidth());
    html2canvas(editorRef.current.getDomNode())
    .then((img) => {
      screenshotRef.current = true
      setScreenshot(img.toDataURL())
    })
     
  };

  const handleCodeChange = (Changedvalue) => {
    props.setCode(Changedvalue);
  };

  return (
    <>

      <div
        style={isSmallScreen?{display:'flex',justifyContent:"center"}:{}}
      >
        <Editor
          value={props.code}
          language={props.language || "javascript"}
          theme={props.theme||"amy"}
          onChange={handleCodeChange}
          className={"myeditor"}
          height={"80vh"}
          width={isSmallScreen?"95vw":"65vw"}
          // onMount={onMountFunc}
          options={{
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
          onMount={(editor) => {
            editorRef.current = editor;
            setEditorMounted(true);
          }}
        />
      </div>
      

      <div style={{ marginTop:"2%",maxWidth:"100%",display: "flex",justifyContent: "center",alignItems: "end"}} >
        <Button onClick={handleClick} variant="outlined" sx={{color:"#013A63",fontWeight:700,"&:hover":{background:"#013A63",color:"white"}}} >Take ScreenShot</Button>
      </div>

      {/* <h2> ScreenShot </h2> */}
      {/* {screenshot && <img src={screenshot} />} */}
    
    </>
  );
};

export default EditorLayout;
