import {
  Button,
  FormControl,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SnippetsData } from "../../App";

const NewSnippet = () => {
  const { snipData, updateSnip } = React.useContext(SnippetsData);
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const navigateToSnip = () => {};

  const createReference = () => {
    const timestamp = new Date().getTime().toString();

    const newSnip = {
      name: newName,
      description: newDescription,
      id: timestamp,
      code: "//enter your code here",
      language: "javascript",
      theme: "vs-dark",
    };

    const snips = [...snipData, { ...newSnip }];

    updateSnip(snips);
    navigate(`snippet/${timestamp}`);
  };

  const createNewSnip = () => {
    // create an empty reference
    // timestamp as id
    // store the id
    // using id open the editor
    handleOpen();
  };

  const validateForm = () => {
    if(newName !== "" || newName.length!==0)
      return true;
    alert("Please enter Name");
    return false;
  }

  return (
    <>
      <Tooltip open={true} title="Add" placement="top" arrow>
        <IconButton
          variant="outlined"
          onClick={createNewSnip}
          sx={{
            position: "fixed",
            bottom: 60,
            right: 80,
            zIndex: 2000,
            width: 65,
            height: 65,
            border: "0.25px solid #013A63",
            fontSize: "30px",
            fontWeight:900,
            color:"#013A63","&:hover":{background:"#013A63",color:"white"}
          }}
        >
          +
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          <Typography id="title" variant="h6" component="h2" sx={{marginBottom:3}}>
            Create New Snippet
          </Typography>
          <form>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                // error={!newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
                sx={{ width: 250,marginBottom:1 }}
                required
              />
            </FormControl>
            <br />
            <FormControl>
              <TextField
                label="Description"
                multiline
                rows={3}
                variant="outlined"
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
                sx={{ width: 250,marginBottom:2 }}
              />
            </FormControl>
            <br />

            <div style={{display:'flex',justifyContent:'space-around'}}>
              <Button
                type="submit"
                onClick={() => {
                  if(validateForm())
                  {
                    createReference();
                    handleClose();
                  }
                }}
              >
                Create
              </Button>
              <Button onClick={handleClose}>cancel</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default NewSnippet;
