import React, { useEffect, useState,useCallback } from 'react';
import  { FunctionComponent } from "react";
import axios from 'axios';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { PieChart, Pie, Sector } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { Tooltip } from "recharts";
import './weeklyanalysis.css';
const WeeklyAnalysisChart = () => {
  const [userCount, setUserCount] = useState([]);
  const [postCount, setPostCount] = useState([]);
  const [announcementCount, setAnnouncementCount] = useState([]);
  const [markerCount, setMarkerCount] = useState([]);
  const [pincode, setPincode] = useState('');
  const [submittedPincode, setSubmittedPincode] = useState('');
  const [dataArray, setDataArray] = useState([]);
  const [postsArray,setPostsArray]=useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [topLikedPosts, setTopLikedPosts] = useState([]);
  const [error, setError] = useState(null);
  // const onPieEnter = useCallback(
  //   (_, index) => {
  //     setActiveIndex(index);
  //   },
  //   [setActiveIndex]
  // );
  const colors = scaleOrdinal(schemeCategory10).range();
  useEffect(() => {
    const fetchDatatopposts = async () => {
      try {
        const response = await axios.get('http://localhost:8004/api/top-liked-posts');

        if (response.status !== 200) {
          throw new Error('Request failed');
        }

        const data = response.data;
        console.log(data);
        setTopLikedPosts(data);
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching data. Please try again later.');
      }
    };

    fetchDatatopposts();
  }, []);

  useEffect(()=>{
    async function fetchpostsdata(){
    const postResponse = await axios.get('http://localhost:8004/api/data/post-count-per-week');
    //setPostCount(postResponse.data);
    const postData = {
      name: "Post Count",
      count: postResponse.data,
      context:"postsposted in lastweek"
    };
    const newpostsArray=[postData];
    setPostsArray(newpostsArray);
  }
  fetchpostsdata();
  },[])
  // const renderActiveShape = (props) => {
  //   const RADIAN = Math.PI / 180;
  //   const {
  //     cx,
  //     cy,
  //     midAngle,
  //     innerRadius,
  //     outerRadius,
  //     startAngle,
  //     endAngle,
  //     fill,
  //     payload,
  //     percent,
  //     value
  //   } = props;
  //   const sin = Math.sin(-RADIAN * midAngle);
  //   const cos = Math.cos(-RADIAN * midAngle);
  //   const sx = cx + (outerRadius + 10) * cos;
  //   const sy = cy + (outerRadius + 10) * sin;
  //   const mx = cx + (outerRadius + 30) * cos;
  //   const my = cy + (outerRadius + 30) * sin;
  //   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  //   const ey = my;
  //   const textAnchor = cos >= 0 ? "start" : "end";
  
  //   return (
  //     <g>
  //       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
  //         {payload.name}
  //       </text>
  //       <Sector
  //         cx={cx}
  //         cy={cy}
  //         innerRadius={innerRadius}
  //         outerRadius={outerRadius}
  //         startAngle={startAngle}
  //         endAngle={endAngle}
  //         fill={fill}
  //       />
  //       <Sector
  //         cx={cx}
  //         cy={cy}
  //         startAngle={startAngle}
  //         endAngle={endAngle}
  //         innerRadius={outerRadius + 6}
  //         outerRadius={outerRadius + 10}
  //         fill={fill}
  //       />
  //       <path
  //         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
  //         stroke={fill}
  //         fill="none"
  //       />
  //       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
  //       <text
  //         x={ex + (cos >= 0 ? 1 : -1) * 12}
  //         y={ey}
  //         textAnchor={textAnchor}
  //         fill="#333"
  //       >{`PV ${value}`}</text>
  //       <text
  //         x={ex + (cos >= 0 ? 1 : -1) * 12}
  //         y={ey}
  //         dy={18}
  //         textAnchor={textAnchor}
  //         fill="#999"
  //       >
  //         {`(Rate ${(percent * 100).toFixed(2)}%)`}
  //       </text>
  //     </g>
  //   );
  // };
  const fetchData = async () => {
    try {
      if (submittedPincode) {
        const userResponse = await axios.get(`http://localhost:8004/api/data/user-count-per-week/${submittedPincode}`);
       // setUserCount(userResponse.data);
        const userData = {
          name: "User Count",
          count: userResponse.data,
          context:"users registered in lastweek"
        };
//console.log(typeof(userResponse.data))
      
    

        const markerResponse = await axios.get(`http://localhost:8004/api/data/marker-count-per-week/${submittedPincode}`);
      //  setMarkerCount(markerResponse.data);
        const markerData = {
          name: "Marker Count",
          count: markerResponse.data,
          context:"noteworthyincidents in lastweek"
        };
        const announcementResponse = await axios.get(`http://localhost:8004/api/data/announcement-count-per-week/${submittedPincode}`);
        //  setAnnouncementCount(announcementResponse.data);
          const announcementData = {
            name: "Announcement Count",
            count: announcementResponse.data,
            context:"Annoncements in lastweek"
          };
        const newdataArray = [userData,  markerData,announcementData];
      
        setDataArray(newdataArray);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedPincode(pincode);
  };

  useEffect(() => {
    fetchData();
  }, [submittedPincode]);
  const getPath = (x, y, width, height) => {
    // Check if x, y, width, and height are valid numbers
    if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
      // Handle the case where any of the values is NaN
      return '';
    }
  
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
      Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  // const dataindividual = [
  //   { name: "Group A", value: 400 },
  //   { name: "Group B", value: 300 },
  //   { name: "Group C", value: 300 },
  //   { name: "Group D", value: 200 }
  // ];
  const AnimatedCard = ({ post }) => {
    return (
      <div className="card">
        <h3>Top Liked Post</h3>
        <p>Content: {post.content}</p>
        <p>Likes: {post.likes}</p>
      </div>
    );
  };
  return (
    <div style={{backgroundColor:'black'}} >
      <h1 style={{textTransform: 'uppercase', fontWeight: 'bold',fontSize:'40px'}}>Weekly Analysis</h1>
     <h1 style={{ margin: '30px', textTransform: 'uppercase', fontWeight: 'bold' }}>
  Enter the pincode to see weekly statistical data
</h1>


      <form onSubmit={handleSubmit}>
        <input
        style={{color:'#ffffff',height:'40px',margin:'30px',borderRadius:'3%'}}
          type="text"
          placeholder="  Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button type="submit" style={{backgroundColor:'green',borderRadius:'6%',margin:'20px'}}>Submit</button>
      </form>
      <div className='WAgrid'>
      <div style={{padding:'20px',margin:'20px'}}>
        <h1>Weekly Analysis in entered Pincode:</h1>
      <BarChart
      width={700}
      height={300}
      data={dataArray}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
      animationDuration={5000}
    >
      <CartesianGrid  stroke='none'/>
      <XAxis dataKey="name" tick={{ fill: 'white' }}/>
      <YAxis tick={{ fill: 'white' }}/>
      <Tooltip formatter={(value, name, props) => [name, value]} />
      <Bar
        dataKey="count"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {dataArray.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    </div>
    <div className="animated-cards-container">
      <h1 style={{padding:'10px'}}>Top three Liked Posts(Overall areas)</h1>
      {topLikedPosts.map((post) => (
        <AnimatedCard key={post._id} post={post} />
      ))}
    </div>
    <div style={{padding:'20px',margin:'20px'}}>
        <h1>TotalPosts in lastweek in all pincode areas</h1>
      <BarChart
      width={700}
      height={300}
      data={postsArray}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
      animationDuration={5000}
    >
      <CartesianGrid  stroke='none'/>
      <XAxis dataKey="name" tick={{ fill: 'white' }}/>
      <YAxis tick={{ fill: 'white' }}/>
      <Tooltip formatter={(value, name, props) => [name, value]} />
      <Bar
        dataKey="count"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {postsArray.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    </div>
      {/* <div>
      <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={dataindividual}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
      </div> */}
     
      </div>
    </div>
  );
};

export default WeeklyAnalysisChart;
