import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import  './announcements_styles.css';
function Announcementsmultiling() {
  const [announcementsmultiling, setAnnouncementsmultiling] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showform,setshowform]=useState(false);
  const [isformUploading,setIsformUploading]=useState(false);
  const [currentcategory,setcurrentcategory]=useState('ENGLISH');
  const [showfilterform,setshowfilterform]=useState(false);
  const [selectedfilterdate,setselectedfilterdate]=useState('');
  const [otherlang,setotherlang]=useState('');
  const location = useLocation();
  const userstate = location.state;
  const userdata=userstate.userData;
  console.log(userdata);
   const userIsAdmin=userdata.isAdmin;
  useEffect(() => {
    async function getAnnouncementsmultiling() {
      setIsLoading(true);
  var x=1;var y=2;var z=3;
      try {
        const response = await axios.get('http://localhost:8004/api/announcements', {});
        var respdata=response.data;
        respdata=respdata.filter((user)=>user.pincode===userdata.pincode)
       if(currentcategory!='sortbydate'){ respdata.sort((a, b) => {
          // Convert the createdAt values to Date objects for comparison
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
        
          // Compare the dates in reverse order (descending)
          return dateB - dateA;
        });
      }
      if(currentcategory==='TELUGU'){
console.log('telugu category has been chosen');
      //  const currentDate = new Date();

// Filter the announcements created today
//  respdata = respdata.filter((announcementmultiling) => {
//   const createdAtDate = new Date(announcementmultiling.createdAt);

//   // Compare the year, month, and day of the createdAtDate with currentDate
//   return (
//     createdAtDate.getDate() === currentDate.getDate() &&
//     createdAtDate.getMonth() === currentDate.getMonth() &&
//     createdAtDate.getFullYear() === currentDate.getFullYear()
//   );
// });
const translatedAnnouncements=[];x=2;
for (const announcement of respdata) {
    try {
      // Send only the 'announcement' attribute for translation
      console.log(announcement.announcement)
      const response = await axios.get('http://localhost:8004/api/announcements/lang', {
        params: {
         announcement:announcement.announcement,
         language:'te'
        },
      });
      
      // Create a new object with the translated 'announcement' and the original 'date'
      const translatedAnnouncement = {
        announcement: response.data.announcement,
        pincode:announcement.pincode,
        createdAt:announcement.createdAt
      };

      translatedAnnouncements.push(translatedAnnouncement);
    } catch (error) {
      console.error('Error translating announcement:', error);
      // Handle error as needed
    }
  }
  setAnnouncementsmultiling(translatedAnnouncements);
      }
      if(currentcategory==='HINDI'){
        console.log('HINDI category has been chosen');
              //  const currentDate = new Date();
        
        // Filter the announcements created today
        //  respdata = respdata.filter((announcementmultiling) => {
        //   const createdAtDate = new Date(announcementmultiling.createdAt);
        
        //   // Compare the year, month, and day of the createdAtDate with currentDate
        //   return (
        //     createdAtDate.getDate() === currentDate.getDate() &&
        //     createdAtDate.getMonth() === currentDate.getMonth() &&
        //     createdAtDate.getFullYear() === currentDate.getFullYear()
        //   );
        // });
        const translatedAnnouncements=[];y=1;
        for (const announcement of respdata) {
            try {
              // Send only the 'announcement' attribute for translation
              console.log(announcement.announcement)
              const response = await axios.get('http://localhost:8004/api/announcements/lang', {
                params: {
                 announcement:announcement.announcement,
                 language:'hi'
                },
              });
              
              // Create a new object with the translated 'announcement' and the original 'date'
              const translatedAnnouncement = {
                announcement: response.data.announcement,
                pincode:announcement.pincode,
                createdAt:announcement.createdAt
              };
        
              translatedAnnouncements.push(translatedAnnouncement);
            } catch (error) {
              console.error('Error translating announcement:', error);
              // Handle error as needed
            }
          }
          setAnnouncementsmultiling(translatedAnnouncements);
              }
              if(currentcategory==='Other'){
                console.log('Other category has been chosen');
                      //  const currentDate = new Date();
                
                // Filter the announcements created today
                //  respdata = respdata.filter((announcementmultiling) => {
                //   const createdAtDate = new Date(announcementmultiling.createdAt);
                
                //   // Compare the year, month, and day of the createdAtDate with currentDate
                //   return (
                //     createdAtDate.getDate() === currentDate.getDate() &&
                //     createdAtDate.getMonth() === currentDate.getMonth() &&
                //     createdAtDate.getFullYear() === currentDate.getFullYear()
                //   );
                // });
                const translatedAnnouncements=[];z=10;
                for (const announcement of respdata) {
                    try {
                      // Send only the 'announcement' attribute for translation
                      console.log(announcement.announcement)
                      const response = await axios.get('http://localhost:8004/api/announcements/lang', {
                        params: {
                         announcement:announcement.announcement,
                         language:otherlang
                        },
                      });
                      
                      // Create a new object with the translated 'announcement' and the original 'date'
                      const translatedAnnouncement = {
                        announcement: response.data.announcement,
                        pincode:announcement.pincode,
                        createdAt:announcement.createdAt
                      };
                
                      translatedAnnouncements.push(translatedAnnouncement);
                    } catch (error) {
                      console.error('Error translating announcement:', error);
                      // Handle error as needed
                    }
                  }
                  setAnnouncementsmultiling(translatedAnnouncements);
                      }
//       if(currentcategory==='aftercertain date'){
// //console.log(selectedfilterdate);
//         const filterDate = new Date(selectedfilterdate);
//         respdata = respdata.filter((announcementmultiling) => {
//           const createdAtDate = new Date(announcementmultiling.createdAt);
//           return createdAtDate >= filterDate;
//         });

//        // setselectedfilterdate('');
//       }
    if(x!=2&&y!=1&&z!=10)    setAnnouncementsmultiling(respdata); // Update state with response data
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getAnnouncementsmultiling();
  }, [isformUploading,currentcategory,selectedfilterdate,otherlang]);
  useEffect(()=>{
 if(isLoading===false) setIsformUploading(isLoading);
  },[isLoading])
console.log(userIsAdmin);
  return (
    <div className='entireannc'>
    <div className='body-annc'>
      {/* <h1>userdata in announcement is {userdata.email}</h1> */}
      <Header showform={showform} setshowform={setshowform} userIsAdmin={userIsAdmin}/>
      {(showform&&userIsAdmin)?(<NewAnnouncementmultilingForm setAnnouncementsmultiling={setAnnouncementsmultiling} userdata={userdata} setshowform={setshowform} setIsLoading={setIsLoading} setIsformUploading={setIsformUploading}/>):null}
      <main className='main-annc'>

        <CategoryFilter setotherlang={setotherlang} setcurrentcategory={setcurrentcategory} setshowfilterform={setshowfilterform} showfilterform={showfilterform} setselectedfilterdate={setselectedfilterdate}/>
      {isLoading ? <LoadingPage /> : <ShowAnnouncementsmultiling annData={announcementsmultiling} setAnnouncementsmultiling={setAnnouncementsmultiling} setIsLoading={setIsLoading} setIsformUploading={setIsformUploading} />}

      </main>
    </div>
    </div>
  );
}function Header({ showform, setshowform,userIsAdmin }) {
  const appTitle = 'ANNOUNCEMENTS(MULTILINGUAL)';

  return (
    <header className='header-annc'>
      <div className='logo-annc'>
        <img src='https://tse1.mm.bing.net/th?id=OIP.fBqF8Upvh5hMgBWq0LUsWAHaHx&pid=Api&P=0&h=180' height='68' width='68' alt='Today I Learned Logo' />
        <h1>{appTitle}</h1>
      </div>
    {userIsAdmin?
      (<button
        className='btn-annc btn-large-annc btn-open-annc'
        onClick={() => setshowform((show) => !show)}
      >
        {showform ? 'Close' : 'Post'}
      </button>):null}
    </header>
  );
}
const CATEGORIES = [
  { name: 'HINDI', color: '#5B0888' },
  { name: 'TELUGU', color: '#16a34a' },
  // { name: 'aftercertain date', color: '#ef4444' },
 
];

function NewAnnouncementmultilingForm({ setAnnouncementsmultiling,setIsLoading,setIsformUploading,userdata}) {
  const [text, setText] = useState('');
 
  
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  function generateRandomId() {
    return Math.round(Math.random() * 10000000);
  }

  function createNewAnnouncementmultiling() {
    return {

      announcement:text,
      pincode:456
      

    };
  }

   function handleSubmit(e) {
    e.preventDefault();

    if (text &&  textLength <= 400) {
      setIsLoading(true);
      
      const NewAnnouncementmultiling = createNewAnnouncementmultiling();

     async function posttoapi() {
     // console.log("sending post req to announcements");
     await axios.post("http://localhost:8004/api/announcements", { announcement: text, pincode: userdata.pincode });

      }
      posttoapi();
     setIsformUploading(true);
      setText('');
     
     

      
    }
  }

  return (
    <form onSubmit={handleSubmit} className='fact-form-annc'>
      <input
        type='text'
        placeholder='Share an announcement with the community...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{400 - textLength}</span>
      
     
      <button className='btn-annc btn-large-annc' >
        Post
      </button>
    </form>
  );
}
function CategoryFilter({setotherlang, setcurrentcategory,setshowfilterform,showfilterform,setselectedfilterdate }) {
  return (
    <aside>
      <ul className='categorylist'>
        <li className='category-annc'>
          <button
            className='btn-annc btn-all-categories-annc'
            onClick={() => { setcurrentcategory('ENGLISH') }}
          >
           ENGLISH
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className='category-annc'>
            <button
              className='btn-annc btn-category-annc'
              style={{ backgroundColor: cat.color }}
              onClick={() => setcurrentcategory(cat.name) }
            >
              {cat.name}
              
            </button>
           
            {/* {(cat.name=='aftercertain date' && showfilterform==true)?<Filterform />:null} */}
          </li>
        ))}
        <LanguageDropdown setotherlang={setotherlang} setcurrentcategory={setcurrentcategory}></LanguageDropdown>
        {/* <li>
        <button
              className='btn-annc btn-category-annc'
              style={{ backgroundColor: '#ef4444' }}
              onClick={() =>{ setshowfilterform((showfilterform)=>!showfilterform);} }
            >
              aftercertain date
              
            </button>
           { showfilterform?<Filterform setcurrentcategory={setcurrentcategory} setshowfilterform={setshowfilterform} setselectedfilterdate={setselectedfilterdate} />:null}
        </li> */}
      </ul>
    </aside>
  );
}
function Filterform({setcurrentcategory,setshowfilterform,setselectedfilterdate}){
  const [selectedDate, setSelectedDate] = useState('');
  // const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  // const [allAnnouncements, setAllAnnouncements] = useState([]); // Assuming you have an array of all announcements

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // const filterAnnouncements = () => {
  //   const selectedDateObj = new Date(selectedDate);

  //   const filteredAnnouncements = allAnnouncements.filter((announcement) => {
  //     const createdAtDate = new Date(announcement.createdAt);

  //     // Compare the "createdAt" date with the selectedDate, including equality
  //     return createdAtDate >= selectedDateObj;
  //   });

  //   // Update the state with the filtered announcements
  //   setFilteredAnnouncements(filteredAnnouncements);
  // };
const handlefilterSubmit=()=>{
  const selectedDateObj=new Date(selectedDate);
  setshowfilterform(false);
  setselectedfilterdate(selectedDateObj);
  setcurrentcategory('aftercertain date');

}
  return (
    <div>
      <label htmlFor="datePickermultilang" className='datepicker-label-annc'>Select a Date:</label>
      <input type="date" id="datePickermultilang" value={selectedDate} onChange={handleDateChange} className='date-picker-annc'/>
      <button onClick={handlefilterSubmit } className='filter-submit-annc'>Filter</button>
    </div>
  );


}
function ShowAnnouncementsmultiling(props) {
  const announcementmultilingData = props.annData;
  const setAnnouncementsmultiling=props.setAnnouncements;
  const [date, setDate] = useState('');
  
  return (
    <div>
    
   
    <ul className='facts-list-annc'>
      {announcementmultilingData.map((x) => (
       <Announcementmultiling key={x._id} announcementmultiling={x} announcementsmultiling={announcementmultilingData} setAnnouncementsmultiling={setAnnouncementsmultiling} />
      ))}
    </ul>
    </div>
  );
}
function Announcementmultiling({ announcementmultiling, announcementsmultiling, setAnnouncementsmultiling }) {
  const [isUpdating, setIsUpdating] = useState(false);
  if (announcementsmultiling.length === 0)
    return (
      <p className='message-annc'>
        No facts for this category yet! Create the first one ✌️
      </p>
    );


  return (
    <li className='fact-annc'>
      <p>
       
        {announcementmultiling.announcement} 
       
      </p>
      <span
        className='tag-annc'
        style={{
          backgroundColor:'#1b2739',
        }}
      >
       - {new Date(announcementmultiling.createdAt).toLocaleDateString()}
      </span>
     
    </li>
  );
}
function LoadingPage() {
  return <h1>Page is loading</h1>;
}
function LanguageDropdown({setotherlang,setcurrentcategory}){

  const [selectedLanguage, setSelectedLanguage] = useState(''); // To store the selected language

  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLanguage(selectedValue);
    setotherlang(selectedValue);
    // Check if a valid language is selected before sending a request.
    if (selectedValue) {
      // You can perform an action here when a valid language is chosen.
      // For example, you can make an API request for translation using the selected language.
      // Replace the following code with your specific logic.
      setcurrentcategory('Other');
      console.log(`Selected Language: ${selectedValue}`);
    }
  };

  return (
    <div>
      <label style={{padding:'10px'}}>Other Languages:</label>
      <select  value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="">Select a language</option>
        <option value="ta">Tamil</option>
        <option value="bn">Bengali</option>
        <option value="mr">Marathi</option>
        <option value="ur">urdu</option>
        <option value="gu">Gujarati</option>
        <option value="pa">Punjabi</option>
        <option value="ml">Malayalam</option>
        {/* Add more language options here */}
      </select>
    </div>
  );
}
export default Announcementsmultiling;
