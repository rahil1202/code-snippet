import React, { useEffect } from "react";
import Editor from "./EditorLayout";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { loader } from "@monaco-editor/react";
import monacoThemes from "monaco-themes/themes/themelist";
import { LANGUAGES } from "../../Others/Editor/constants";
import { useParams } from "react-router-dom";
import { SnippetsData } from "../../App";

const CodeSnippetLayout = () => {

  // getting Context Reference
  const {snipData,updateSnip} = React.useContext(SnippetsData);
  
  // getting ID
  const ID = useParams();

  // get Exsiting or new
  const currentSnippet = snipData.filter((snippet)=>snippet.id===ID.id)[0];
  
  // console.log(currentSnippet);

  const [language, setLanguage] = React.useState(currentSnippet.language);
  const [theme, setTheme] = React.useState(currentSnippet.theme);
  const [code, setCode] = React.useState(currentSnippet.code);
  const [description, setDescription] = React.useState(currentSnippet.description);
  
  useEffect(()=>{
    handleThemeChange(currentSnippet.theme)
  },[])
  
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  
  
  let newTheme = (themeKey, themeVal) => {
    return new Promise((res) => {
      Promise.all([
        loader.init(),
        import(`monaco-themes/themes/${themeKey}.json`),
      ]).then(([monaco, themeData]) => {
        monaco.editor.defineTheme(themeVal, themeData);
        res();
      });
    });
  };

  const handleThemeChange = (value) => {
    const val = value;
    const key = monacoThemes[val];

    if (["light", "vs-dark"].includes(val)) {
      setTheme(val);
    } else {
      newTheme(key, val).then(() => setTheme(val));
    }
  };

  const commitChanges = () => {
    const newSnippets = snipData.map((snip)=>{
      if (snip.id === ID.id){
        return {...snip,language:language,code:code,theme:theme,description:description}
      }
      return snip;
    })

    // console.log(newSnippets,updateSnip)
    updateSnip(newSnippets)

  }
  

  

  return (
    <>
      <div style={{padding:"8px"}}>

          <Grid container  justifyContent="space-around" spacing={2} sx={{}} >  
            
            <Grid item xs={12} md={8} order={{xs:2,md:1}}>
              <Editor language={language} theme={theme} code={code} setCode={setCode} />
            </Grid>

            <Grid item xs={12} md={4} order={{xs:1,md:2}}>
              <Grid container spacing={0}  sx={{height:"60%"}} alignItems="center" justifyContent="center">
                {/* language DropDown */}
                <Grid item xs={6} sx={{height:"10%",display:"flex"}} justifyContent="center" alignItems="center">
                  <FormControl sx={{ m: 1, minWidth: 120, color: "black" }} >
                    <InputLabel id="language-label">Language</InputLabel>
                    <Select
                      labelId="language-label"
                      id="lang"
                      value={language}
                      onChange={handleLanguageChange}
                      label="Language"
                    >
                      {LANGUAGES.map((language, i) => (
                        <MenuItem value={language} key={language + String(i)}>
                          {language}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Themes Dropdown */}
                <Grid item xs={6} sx={{height:"10%",display:"flex"}}  alignItems="center">
                  <FormControl sx={{ m: 1, minWidth: 120, color: "black" }}>
                    <InputLabel id="theme-label">Themes</InputLabel>
                    <Select
                      labelId="theme-label"
                      id="theme"
                      value={theme}
                      onChange={(e)=>handleThemeChange(e.target.value)}
                      label="Theme"
                    >
                      <MenuItem value={"light"} key={"light001"}>
                        light
                      </MenuItem>
                      <MenuItem value={"vs-dark"} key={"dark001"}>
                        Dark
                      </MenuItem>
                      {Object.entries(monacoThemes).map((theme, i) => (
                        <MenuItem value={theme[0]} key={theme[1] + String(i)}>
                          {theme[1]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid container
                  sx={{height:"30%",display:"flex"}} justifyContent="center" alignItems="center">
                  <TextField
                    label="Description"
                    multiline rows={3} variant="outlined" sx={{width:450}}
                    onChange={(e)=>setDescription(e.target.value)}
                    value={description}
                    placeholder="Enter description for snippet"
                  />
                </Grid>
              </Grid>


              <Grid container textAlign={"center"} sx={{height:"10%",marginTop:"5%", '@media (max-width: 900px)': {
      marginTop:"8%",'@media (max-width: 550px)': {
        marginTop:"15%"
      }
    }}} justifyContent="center" alignItems="center">
                <Button onClick={commitChanges} variant="outlined" sx={{color:"#013A63",fontWeight:700,"&:hover":{background:"#013A63",color:"white"}}}> save </Button>
              </Grid>

            </Grid>
          </Grid>
      </div>  

    </>
  );
};

export default CodeSnippetLayout;
