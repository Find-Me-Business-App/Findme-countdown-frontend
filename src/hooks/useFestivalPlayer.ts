"use client";

import { useState, useEffect, useRef } from "react";
import { FESTIVAL_SONGS, Song } from "@/config/audio-configs";

/**
 * Custom hook to manage audio playback for the Festival Section.
 */
export function useFestivalPlayer() {
    const [currentSongIndex, setCurrentSongIndex] = useState(1); // Default to Afrika
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentSong: Song = FESTIVAL_SONGS[currentSongIndex];

    useEffect(() => {
        // Initialize audio object
        if (!audioRef.current) {
            audioRef.current = new Audio(currentSong.src);
        }

        const audio = audioRef.current;

        // Cleanup on unmount
        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, [currentSong.src]);

    // Effect to handle song source changes
    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current;
            const absoluteSrc = currentSong.src.startsWith('http') ? currentSong.src : `${window.location.origin}${currentSong.src}`;
            
            // Only update if src actually changed
            if (audio.src !== absoluteSrc) {
                audio.src = currentSong.src;
                if (isPlaying) {
                    audio.play().catch(err => console.error("Playback error:", err));
                }
            }
        }
    }, [currentSong.src, isPlaying]);

    // Effect to handle play/pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(err => {
                    console.error("Playback failed:", err);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const handleNext = () => {
        setCurrentSongIndex((prev) => (prev + 1) % FESTIVAL_SONGS.length);
    };

    const handleBack = () => {
        setCurrentSongIndex((prev) => (prev - 1 + FESTIVAL_SONGS.length) % FESTIVAL_SONGS.length);
    };

    return {
        currentSong,
        isPlaying,
        togglePlay,
        handleNext,
        handleBack,
        currentSongIndex
    };
}
