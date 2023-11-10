import { BrowserRouter } from "react-router-dom"
import {About,Contact,Experience,Feedbacks,Hero,Navbar,Tech,StarsCanvas} from './components'
import './styles';
const Home =()=> {

  return (
   <div>
    
      <div className="relative z-0 bg-tertiary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center ">
          <Navbar/>
           <Hero/> 
        </div>
        <About/>
        <Experience/>
        {/* <Tech/> */}
        
        {/* <Feedbacks/>  */}
        <div className="relative z-0">
          <Contact/>
          <StarsCanvas/> 
        </div>


      </div>
    
   </div>
  )
  
}
<script src="//code.tidio.co/jqxujrlpdcggdkvbnqko2czvptdxym3l.js" async></script>

export default Home
