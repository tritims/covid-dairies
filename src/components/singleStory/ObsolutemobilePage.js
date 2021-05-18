// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Paper, Typography, Chip } from "@material-ui/core";
// import moment from "moment";
// import Emoji from "../emoji/index";
// import { CircularProgress } from "@material-ui/core";

// var colorArray = [
//   "#FF6633",
//   "#FF33FF",
//   "#00B3E6",
//   "#E6B333",
//   "#3366E6",
//   "#999966",
//   "#B34D4D",
//   "#80B300",
//   "#809900",
//   "#6680B3",
//   "#66991A",
//   "#FF99E6",
//   "#CCFF1A",
//   "#FF1A66",
//   "#E6331A",
//   "#33FFCC",
//   "#66994D",
//   "#B366CC",
//   "#4D8000",
//   "#B33300",
//   "#CC80CC",
//   "#66664D",
//   "#991AFF",
//   "#E666FF",
//   "#4DB3FF",
//   "#1AB399",
//   "#E666B3",
//   "#33991A",
//   "#CC9999",
//   "#B3B31A",
//   "#00E680",
//   "#4D8066",
//   "#809980",
//   "#E6FF80",
//   "#1AFF33",
//   "#999933",
//   "#FF3380",
//   "#CCCC00",
//   "#66E64D",
//   "#4D80CC",
//   "#9900B3",
//   "#E64D66",
//   "#4DB380",
//   "#FF4D4D",
//   "#99E6E6",
//   "#6666FF",
// ];

// const Story = () => {
//   const [story, setStory] = useState();
//   let { id } = useParams();
//   window.scrollTo(0, 0);
//   useEffect(() => {
//     const fetchStory = async () => {
//       const data = await axios.get(`http://localhost:5000/id=${id}`);
//       setStory(data.data);
//     };
//     fetchStory();
//   }, [id]);
//   return (
//     <div className="storiesContainer">
//       {story ? (
//         <Paper elevation={3} className="storyCard" style={{ maxWidth: "90vw" }}>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <div>
//               <span>
//                 {moment(story.dateTime && story.dateTime.$date).format(
//                   "DD MMMM YYYY"
//                 )}
//               </span>

//               {story.cities.length > 0 ? (
//                 <span>
//                   , 📍
//                   {story.cities.map((city, i) => (
//                     <Chip className="storyChip" key={city} label={city} />
//                   ))}
//                 </span>
//               ) : (
//                 ""
//               )}
//             </div>
//             <span
//               style={{ cursor: "pointer", color: "green" }}
//               onClick={() => {
//                 navigator.clipboard.writeText(`${window.location.href}`);
//               }}
//             >
//               Share{" "}
//             </span>
//           </div>
//           <Typography variant="h5" gutterBottom>
//             {story.title}
//           </Typography>
//           <div>
//             <div className="margin">
//               {story &&
//                 story.emotions.map((item, i) => (
//                   <span key={item}>
//                     <Emoji type={item} size="xs" />
//                   </span>
//                 ))}

//               {story &&
//                 story.keywords &&
//                 story.keywords.map((item, i) => {
//                   return (
//                     <Chip
//                       className="storyChip"
//                       key={item}
//                       label={item}
//                       style={{ background: `${colorArray[i]}`, color: "white" }}
//                     />
//                   );
//                 })}
//             </div>
//           </div>

//           <Typography variant="subtitle1" gutterBottom>
//             {story && story.content
//               ? story.content.map((item, i) => (
//                   <div className="singleStoryPara" key={i}>
//                     {item}
//                   </div>
//                 ))
//               : ""}
//           </Typography>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <span>
//               Source :{" "}
//               <a
//                 href={story.link}
//                 target="_blank"
//                 rel="noreferrer"
//                 style={{ textDecoration: "None", color: "grey" }}
//               >
//                 {story.source}
//               </a>
//             </span>
//           </div>
//         </Paper>
//       ) : (
//         <div className="spinnerCentral">
//           <CircularProgress color="primary" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Story;
