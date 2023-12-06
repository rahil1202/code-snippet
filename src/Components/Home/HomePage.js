import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { SnippetsData } from "../../App";
import NewSnippet from "./NewSnippet";

const HomePage = () => {
  const { snipData, updateSnip } = React.useContext(SnippetsData);


  const removeSnip = (id) => {
    let i = snipData.length;
    let copySnips = [...snipData];
    while (i--) {
      if (snipData[i] && snipData[i].id === id) {
        copySnips.splice(i, 1);
      }
    }
    updateSnip(copySnips);
  };

  return (
    <>
      <Grid container spacing={4} justifyContent={"center"} sx={{padding:"8px"}}>
        {snipData.map((snippet, i) => {
          return (
            <Grid item xs={6} sm={4} md={3} key={snippet.id} sx={{}}>
              <Card
                sx={
                  {
                    maxWidth: 300,
                  }
                }
              >
                <CardContent
                  sx={{
                    maxWidth: 300,
                    minHeight: "150px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    to={"snippet/" + snippet.id}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="mainContent"
                      style={{
                        display: "flex",
                        flex: "1 0 auto",
                        alignItems: "flex-start",
                        justifyContent: "start",
                        flexDirection: "column",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {snippet.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                        }}
                      >
                        <b>{snippet.description}</b>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          marginTop: "16px",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {snippet.language}
                      </Typography>
                    </div>
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "16px",
                    }}
                  >
                    <Button onClick={() => removeSnip(snippet.id)} variant={"outlined"} color="error">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <NewSnippet />
    </>
  );
};

export default HomePage;
