'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Button, Stack, TextField, Typography, Link } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const customStyle = {
  backgroundImage: `url(https://media.istockphoto.com/id/1494073860/photo/a-i-chat-with-ai-artificial-intelligence-man-using-a-smartphone-chatting-with-an-intelligent.jpg?s=2048x2048&w=is&k=20&c=VmU3_CE27JvGhikhEITNQfS6Cj7-hJA48KN_mHVGapE=)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100%',
  padding: '20px',
  boxSizing: 'border-box',
}

export default function Home() {
  const { user, error } = useUser();

  if (error) return <div>{error.message}</div>;
  // user login and logut
  const router = useRouter();
 //  redirects the user to the home route if logged out
  if (!user) {
    router.push('/');
    return null;
  }

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi ${user.name}! I'm the Career Compass support assistant. How can I help you today?`
    }
  ])

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // const { data: session, status } = useSession()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  
  const sendMessage = async () => {
    console.log(process.env.OPENAI_API_KEY);
    if (!message.trim()) return // Don't send empty messages
    setMessage('')
    setIsLoading(true)
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later."},
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={customStyle}
    >
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ color: 'white' }} height={'5%'}   width={'90%'}>
            {user ? (
           
             <Typography variant='h4' color='blue' > {user.name}</Typography>
          ) : (
            <Typography variant="h6">Please login</Typography>
          )}

        <Typography variant="h4">Welcome to CareerCompassAI Chatbot</Typography>
        <Typography>
        {user && (
        <Link  style={{ zIndex: 10 }} href="/api/auth/logout" underline='none' border={'1px solid blue'} padding={'10px'} borderRadius={'5px'}>
        Logout
      </Link>

          )}
          </Typography>
      </Stack>
      <Stack
        direction="column"
        width="90%"
        height="95%"
        p={2}
        spacing={3}
        marginTop={'20px'}
      
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={message.role === 'assistant' ? '#008080' : '#333333'}
                color="white"
                borderRadius={8}
                p={3}
                fontSize={'20px'}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              '& .MuiInputBase-input': {
                color: 'white', // Text color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Border color
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Border color when focused
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Label color
              },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}