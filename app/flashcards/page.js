//  'use client'
//  import { useUser } from "@clerk/nextjs"
//  import { useEffect, useState } from 'react'
//  import { collection, doc, getDoc, setDoc } from "firebase/firestore"
//  import { db } from '@/firebase'
//  import { useRouter } from "next/navigation"
//  import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material"

// export default function Flashcard() {
//   const { isLoaded, isSignedIn, user } = useUser()
//   const [flashcards, setFlashcards] = useState([])
//   const router = useRouter()

//   useEffect(() => {
//     async function getFlashcards() {
//       if (!user || !isLoaded || !isSignedIn) return

//       const docRef = doc(collection(db, 'users'), user.id)
//       const docSnap = await getDoc(docRef)

//       if (docSnap.exists()) {
//         const collections = docSnap.data().flashcards || []
//         setFlashcards(collections)
//       } else {
//         await setDoc(docRef, { flashcards: [] })
//       }
//     }
//     getFlashcards()
//   }, [user, isLoaded, isSignedIn])

//   if (!isLoaded || !isSignedIn) {
//     return null
//   }

//   const handleCardClick = (id) => {
//     router.push(`/flashcard?id=${id}`)
//   }

//   return (
//     <Container maxWidth="100vw">
//       <Grid container spacing={3} sx={{ mt: 4 }}>
//         {flashcards.map((flashcard, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card>
//               <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
//                 <CardContent>
//                   <Typography variant="h5" component='div'>
//                     {flashcard.name}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   )
// }
//-------------------------------------------------------------------------------------------------

// export default function Flashcard() {
//   const { isLoaded, isSignedIn, user } = useUser()
//   const [flashcards, setFlashcards] = useState([])
//   const router = useRouter()
  
//   const handleCardClick = (id) => {
//       router.push(`/flashcard?id=${id}`)
//     }

//   useEffect(() => {
//       async function getFlashcards() {
//         if (!user) return
//         const docRef = doc(collection(db, 'users'), user.id)
//         const docSnap = await getDoc(docRef)
//         if (docSnap.exists()) {
//           const collections = docSnap.data().flashcards || []
//           setFlashcards(collections)
//         } else {
//           await setDoc(docRef, { flashcards: [] })
//         }
//       }
//       getFlashcards()
//     }, [user])
//     return (
//       <Container maxWidth="md">
//         <Grid container spacing={3} sx={{ mt: 4 }}>
//           {flashcards.map((flashcard, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card>
//                 <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
//                   <CardContent>
//                     <Typography variant="h5" component="div">
//                       {flashcard.name}
//                     </Typography>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     )
// }
//--------------------------------------------------------------------------------------------------------------------------

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { db } from '@/firebase' // Adjust the path to your Firebase config
import { doc, collection, getDoc, setDoc } from 'firebase/firestore'
import { Container, Grid, Card, CardContent, CardActionArea, Typography } from '@mui/material'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const router = useRouter()
  
  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return
      try {
        const docRef = doc(db, 'users', user.uid) // Correctly reference the user document
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || []
          setFlashcards(collections)
        } else {
          // Create a new document with an empty flashcards array if it doesn't exist
          await setDoc(docRef, { flashcards: [] })
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error)
      }
    }

    if (isLoaded && isSignedIn) {
      getFlashcards()
    }
  }, [isLoaded, isSignedIn, user])

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.length === 0 ? (
          <Typography variant="h6" component="div">
            No flashcards available.
          </Typography>
        ) : (
          flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  )
}

