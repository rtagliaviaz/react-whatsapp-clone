import React, {useState, useEffect} from 'react'
//images
import pic1 from './assets/tifa.jpg'
import pic2 from './assets/ganon.jpg'
import pic3 from './assets/sephiroth.jpg'
import pic4 from './assets/kirby.jpg'
import pic5 from './assets/zero.jpg'


const App = () => {
  const [text, setText] = useState('')
  // const [date, setDate] = useState()
  const [index, setIndex] = useState(0)

  const [searchBox, setSearchBox] = useState('')

  const [randomMessages, setRandomMessages] = useState([
    'Ok', 'Kawabonga!!', "Lok'tar Ogar", "I don't care", "Cool!"
  ])

  const [conversations, setConversations] = useState([
    {
      user: "Tifa Lockhart",
      pic: pic1,
      messages: [
        {
          text: "Hi :)",
          sent: true,
          date: "02/19/2020 14:32"
        }
      ]
    },
    {
      user: "Ganon",
      pic: pic2,
      messages: [
        {
          text: "hello",
          sent: true,
          date: "02/19/2020 14:32"
        },
        {
          text: "Merry Christmas!",
          sent: false,
          date: "12/25/2020 14:35"
        }
      ]
    },
    {
      user: "Sephiroth",
      pic: pic3,
      messages: [
        {
          text: "Hello",
          sent: true,
          date: "02/19/2020 14:32"
        },
        {
          text: "How are you?",
          sent: true,
          date: "02/19/2020 14:33"
        },
        {
          text: "cool",
          sent: false,
          date: "03/24/2020 14:35"
        }
      ]
    },
    {
      user: "Kirby",
      pic: pic4,
      messages: [
        {
          text: "hi there",
          sent: true,
          date: "02/19/2020 14:32"
        },
        {
          text: "Sup?",
          sent: false,
          date: "01/01/2021 14:35"
        }
      ]
    },
    {
      user: "Zero",
      pic: pic5,
      messages: [
        {
          text: "Hello",
          sent: true,
          date: "02/19/2020 14:32"
        },
        {
          text: "Where is X?",
          sent: false,
          date: "11/23/2020 14:35"
        }
      ]
    },
  ])

  let filteredUsers = conversations.filter(
    conversation => {
      return conversation.user.toLowerCase().indexOf(searchBox.toLowerCase()) !== -1;
    }
  )

  const handleSubmit = (e) => {
    
    e.preventDefault()

    if (text === "") {
      console.log('text cannot be empty')
      return
    }

    //get date 
    let newDate = new Date();
    let day = newDate.getDate().toString();
    let month = (newDate.getMonth() + 1).toString();
    let year = newDate.getFullYear().toString();
    let hour = newDate.getHours().toString()
    let minutes = newDate.getMinutes().toString()
    let date = (day+'/'+month+'/'+year+" "+hour+":"+minutes)
  
    //update the array of objects
    let sendNewMsg = {text: text, sent: true, date: date}
    //get the conversation and push the new element into messages array
    conversations[index].messages.push(sendNewMsg)
    
    setConversations(conversations)
    setText('')
    /*
      get a response from user
      ind will be the index of the array randomMessages
    */
    let ind = Math.floor(Math.random() * (0, 5))
    // console.log(ind)
    // console.log('msg will be ', randomMessages[ind])
    let res = {text: randomMessages[ind], sent: false, date: date}
    conversations[index].messages.push(res)
    setConversations(conversations)


    /*
      this will return the updated last time and conversation from the conversation[index]
    */
    let lastElement = conversations[index].messages.slice(-1)[0]
    let lastTime = lastElement.date.substring(0, 9)

    // console.log(lastElement.date.substring(0, 9))
    // console.log('last time ', lastElement.date)
    // console.log('last element', conversations[index].messages.slice(-1)[0])
    //set the text input to empty
    // setText('')
  }

  const getUser = (index) => {
    // console.log(index)
    // console.log(conversations[index].messages)
    setIndex(index)
    displayChat(index)
  }

  const displayChat = (index) => {
      let chat = conversations[index].messages
      // console.log(chat)
      return ( 
        chat.map((msg, i) => 
        
        msg.sent ? 
        //right bubbles
        <div className="right-bubble" key={i}>
        <p className="chat-text">{msg.text}</p>
        <div className="chat-time">{msg.date}</div>
      </div>
    : 
      //left bubbles
      <div className="left-bubble" key={i}>
        <p className="chat-text">{msg.text}</p>
        <div className="chat-time">{msg.date}</div>
      </div>     
      ))
    } 

  const chattingWith = (index) => {

    let user = conversations[index]
    // console.log(user)
    return(
        <React.Fragment>
        <img src={user.pic} className="img-bubble" alt=""/>
        <div className="name-lastv">
          <p>{user.user}</p>
          <p>last time seen {user.messages.slice(-1)[0].date}</p>
        </div>
        <div className="icons">
          <i className="fas fa-search"></i>
          <i className="fas fa-paperclip"></i>
          <i className="fas fa-ellipsis-v"></i>
        </div>
        </React.Fragment>
    )
  }

  const conversationDate = (conv) => {
    // console.log(conv.messages.slice(-1)[0])
    let last = conv.messages.slice(-1)[0].date
    // console.log(last)
    return ( 
      <p>{last.substring(0, 10)}</p>
    )
  }

  const conversationLastMsg = (conv) => {
    let last = conv.messages.slice(-1)[0].text
    return(
      <p className="chat">{last}</p>
    )
  }


  return (
    <div className="app"> 

      <div className="top"></div>
      <div className="container">
        <div className="box1">
          <div className="user-box">
            <div className="user-options">
              <img src="https://avatarfiles.alphacoders.com/728/72821.jpg" className="user-pic" alt=""/>
              <span className="username">Samus Aran</span>
            </div>
            <div className="user-buttons">
              <i className="fas fa-history fa-lg"></i>
              <i className="fas fa-comment-alt fa-lg"></i>
              <i className="fas fa-ellipsis-v fa-lg"></i>
            </div>
          </div>
          <div className="notifications">
              <i className="far fa-bell-slash"></i>
            <div className="notification-msg">
              <p>Receive notifications of new messages</p>
              <u><small>Enable desktop notifications</small></u>
            </div>       
          </div>

          <div className="search-bar">
            <div className="contenedor">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="search in your contacts" 
              onChange={e => setSearchBox(e.target.value)} 
              value={searchBox}/>
            </div>
          </div>

          <div className="chats">
            
              {filteredUsers.map((conv, index) => 
                <div className="chat-1" key={index}>
                  <img src={conv.pic} alt=""/>
                  <div className="name-and-chat" onClick={e => getUser(index)}>
                    <p className="name">{conv.user}</p>
                    {conversationLastMsg(conv)}
                  </div>  
                  <div className="chat-date">
                    {/* conversation date */}
                    {conversationDate(conv)}
                  </div>
                </div>
                )
              }
            
         
          </div>
        </div>
        <div className="box2">
          <div className="chatting-with">
           {chattingWith(index)}
          </div>
            
          <div className="the-chat">
            {displayChat(index)}
          </div> 

          <div className="chat-input">
            <i className="fas fa-icons"></i>
            <form >
            <input type="text" onChange={e => setText(e.target.value)} value={text}/>
            <button type="submit" onClick={e => handleSubmit(e)}>-></button>
            </form>
            <i className="fas fa-microphone"></i>
          </div>
        
        </div>
      </div>
      
    </div>
  );
}

export default App;
