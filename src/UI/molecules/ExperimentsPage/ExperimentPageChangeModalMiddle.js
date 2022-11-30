import * as React from "react";
import { Box, TextField, Button } from "@mui/material";

export default function ExperimentPageChangeModalMiddle(props) {
  const [name, setName] = React.useState(props.data.name);
  const [manager, setManager] = React.useState(props.data.manager);
  const [content, setContent] = React.useState(props.data.content||'');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleManagerChange = (event) => {
    setManager(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleup = () => {
    if(name == '' || name == null || name == undefined){
      alert('실험 프로토콜 명은 필수 항목입니다.')
    } else if(manager == '' || manager == null || manager == undefined){
      alert('담당자는 필수 항목입니다.')
    } else{
      props.propFunction(props.data.id, name, manager, content)
    }
  }

  return (
    <Box style={{ color: "#CCCCCC", height: 300 }}>
      <Box
        style={{
          padding: "10px 10px 30px 10px",
          marginBottom: 24,
          border: "1px solid black",
          borderRadius: 5,
        }}
      >
        <Box style={{display: "block", height: 37}}>
          <h4 style={{ display: "inline", paddingLeft: "15%",fontFamily: 'GmarketSansMedium' }}>
            실험 프로토콜 명 : 
          </h4>
          <TextField
            value={name}
            size="small"
            style={{
              float: "right",
              width: "40%",
              marginRight: "10%",
              backgroundColor: "white",
            }}
            onChange={handleNameChange}
            inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
          />
        </Box>
        <Box style={{display: "block" , height: 37, marginTop: 10}}>
          <h4 style={{ display: "inline", paddingLeft: "15%",fontFamily: 'GmarketSansMedium' }}>
            담당자 :
          </h4>
          <TextField
            value={manager}
            size="small"
            style={{
              float: "right",
              width: "40%",
              marginRight: "10%",
              backgroundColor: "white",
            }}
            onChange={handleManagerChange}
            inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
          />
        </Box>
        <Box style={{display: "block" , height: 37, marginTop: 10}}>
          <h4 style={{ display: "inline", paddingLeft: "15%",fontFamily: 'GmarketSansMedium' }}>
            상세설명 :
          </h4>
          <TextField
            value={content}
            size="small"
            style={{
              float: "right",
              width: "40%",
              marginRight: "10%",
              backgroundColor: "white",
            }}
            onChange={handleContentChange}
            inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
          />
        </Box>
      </Box>
      <Box>
        <Button
          style={{
            color: "white",
            borderRadius: 10,
            backgroundColor: "#2877b9",
            marginRight: 5,
            float: "right",
            fontFamily: 'GmarketSansMedium'
          }}
          onClick={handleup}
        >
          save
        </Button>
      </Box>
    </Box>
  );
}
