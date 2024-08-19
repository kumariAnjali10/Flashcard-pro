"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { doc, collection, getDoc, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, Paper, TextField, Typography } from "@mui/material";

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({ text }), 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setFlashcards(data.flashcards || []); 
        } catch (error) {
            console.error('Error fetching flashcards:', error);
            alert('Failed to generate flashcards.');
        }
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const saveFlashcards = async () => {
        if (!isSignedIn || !user) {
            alert('You must be signed in to save flashcards.');
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);

        try {
            const docSnap = await getDoc(userDocRef);
            let collections = [];
            if (docSnap.exists()) {
                collections = docSnap.data().flashcards || [];
            }
            collections.push({ name: text });
            batch.set(userDocRef, { flashcards: collections }, { merge: true });

            const colRef = collection(userDocRef, text);
            flashcards.forEach((flashcard) => {
                const cardDocRef = doc(colRef);
                batch.set(cardDocRef, flashcard);
            });

            await batch.commit();
            setFlashcards([]);
            setText('');
            alert('Flashcards saved successfully!');
        } catch (error) {
            console.error('Error saving flashcards:', error);
            alert('An error occurred while saving flashcards.');
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4">Generate Flashcards</Typography>
                <Paper sx={{ p: 4, width: "100%" }}>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        label="Enter Text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                        Generate Flashcards
                    </Button>
                </Paper>
            </Box>
            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5">Flashcards Preview</Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <CardContent>
                                            <Box sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: "hidden",
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box'
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)'
                                                },
                                            }}>
                                                <div>
                                                    <div>
                                                        <Typography variant="h6">Front:</Typography>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" onClick={saveFlashcards}>
                            Save Flashcards
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
}
