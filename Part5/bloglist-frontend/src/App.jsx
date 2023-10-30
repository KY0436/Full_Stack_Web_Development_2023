import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification"


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [createVisible, setCreateVisible] = useState(false)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    else {
      setUser(null);
      blogService.setToken(null);
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`User ${user.name} logged in!`)
      setTimeout(() => {
        setMessage(null);
      }, 5000)
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) =>{
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setUsername("");
    setPassword("");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  const showBlogForm = () => {
    const hideWhenVisible = { display: createVisible ? "none" : "" };
    const showWhenVisible = { display: createVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <CreateBlog blogs={blogs} setBlogs={setBlogs} />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>login to application</h2>
      {!user && (<LoginForm 
        message={message}
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}/>)}
      {user && (<div>
        <h2>blogs</h2>
        <Notification message={message} />
          <div>
            <p>{user.name} logged in</p>
            <p> </p>
            <button type="submit" onClick={(e) => handleLogout(e)}>
              logout
            </button>
          </div>
          {showBlogForm()}
          {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
          ))}
      </div>)
    }
    </div>
  )
}

export default App