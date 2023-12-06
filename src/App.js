import React,{useCallback,useMemo} from 'react';
import './App.css';
import CodeSnippetLayout from './Components/Editor/CodeSnippetLayout';
import { Route, Routes,useNavigate } from 'react-router-dom';
import { defaultSnippets } from './Others/Editor/demoData';
import HomePage from './Components/Home/HomePage';
import { Box,Typography,Divider,List,ListItem,ListItemButton,ListItemText, AppBar, Toolbar, IconButton, Drawer, Button } from '@mui/material';

export const SnippetsData = React.createContext({snip:{},updateSnip:()=>{}});
SnippetsData.displayName = "CodeSnippets";

function App() {
  
  const getSnippets = () => {

    if(localStorage.getItem("snips") === null){
      localStorage.setItem("snips",JSON.stringify(defaultSnippets));
    }
  const snips = JSON.parse(localStorage.getItem("snips"));
  return snips;
}

const [snipData,setSnipData] = React.useState(getSnippets())
const [mobileOpen, setMobileOpen] = React.useState(false);
const navigate = useNavigate();

  const updateSnip = useCallback((data)=>{
      setSnipData(data);
      localStorage.setItem("snips",JSON.stringify(data));
  },[])

  const contextValue = useMemo(()=>({snipData,updateSnip}),[snipData,updateSnip])
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };  
  
  // console.log(snipData);
  // const [snippet,setSnippet] = useState({defaultSnippets});


  return (
    <>
    <SnippetsData.Provider value={contextValue}>
        
      <AppBar component="nav"
      sx={{position:'relative',marginBottom: "1%",background:"#01497C"}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <img src={"/menu.png"} alt={"Hamburger Menu"} style={{fontSize:"10px"}} width="25" height="25"/> &ensp; Code Snippets
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Code Snippets 
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button key={"home"} sx={{ color: '#fff' }} onClick={()=>navigate("/")}>
              Home
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav"
        sx={{position:'relative',marginBottom: ""}}
      >
        <Drawer
          container= { window !== undefined ? () => window.document.body : undefined }
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none', },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, background:"#014f86",color:"white"},
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center',background:"#014f86", }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              Code Snippets
            </Typography>
            <Divider sx={{color:"white"}}/>
            <List>
                <ListItem key={"home"} disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }} onClick={()=>navigate("/")}>
                    <ListItemText primary={"Home"} />
                  </ListItemButton>
                </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
        <Routes>
          <Route path={"/"} element={<HomePage/>}/>
          <Route path={"/snippet/:id"} element={<CodeSnippetLayout/>}/>
        </Routes>
        
      </SnippetsData.Provider>
    </>
  );
}

export default App;
