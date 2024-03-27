// import Layout from './Layout';
// import 
// { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsPersonCircle}
//  from 'react-icons/bs'

//  import { MdAddAPhoto } from "react-icons/md";

//  import '../../Styles/Dashboard.css'

//  function Feeds() {

//  return (
//     <Layout>
//         <div className='main-container'>
//             <div className='main-title'>
//                 <a href='' className='post'>
//                     <h3>Uplaod your post here</h3>
//                 </a>
//                     <MdAddAPhoto className='photo'/>
                
//             </div>

//             <div className='main-cards'>
//                 <div className='card'>
//                     <div className='card-inner'>
//                         <BsPersonCircle className='card_icon'/>
//                         <h3>User 1</h3>
//                     </div>
//                     <h1>300</h1>
//                 </div>
//                 <div className='card'>
//                     <div className='card-inner'>
//                         <BsPersonCircle className='card_icon'/>
//                         <h3>User 2</h3>
//                     </div>
//                     <h1>12</h1>
//                 </div>
//                 <div className='card'>
//                     <div className='card-inner'>
//                         <BsPersonCircle className='card_icon'/>
//                         <h3>User 3</h3>
//                     </div>
//                     <h1>33</h1>
//                 </div>
//                 <div className='card'>
//                     <div className='card-inner'>
//                         <BsPersonCircle className='card_icon'/>
//                         <h3>User 4</h3>
//                     </div>
//                     <h1>42</h1>
//                 </div>
//             </div>
//         </div>
//     </Layout>
//   )
// }

// export default Feeds
//////////////////////////////////////////////////////////////////////////////
//////////////////////////Pretty Window//////////////////////////////////////

// import { PrettyChatWindow } from "react-chat-engine-pretty";


// const Feeds = () => {
//   return (
//     <Layout>
//       <div className="feeds">
//         <PrettyChatWindow
//           // projectId={import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID}
//           // username={props.user.username}
//           // secret={props.user.secret}
//           projectId="b3acb9c7-0b93-4e29-a82f-c2108f108ad7"
//           username="Chief"
//           secret="1234"
//         />
//         {/* <p>Hello users, my names are ntate Phali from Hlotse. We are going to learn about distributed database today.</p> */}
        
//       </div>
//     </Layout>
    
//   );
// };

// export default Feeds;



import Layout from "./Layout";

const Feeds = () => {
  return (
      <div>
        <iframe
        title="Embedded React App"
        //src="http://localhost:3000"
       
      
        // frameBorder="0"
      />

      </div>
      
  );
};

export default Feeds;
