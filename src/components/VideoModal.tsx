'use client';

import { useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    // Extract YouTube video ID from URL
    const getYouTubeVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeVideoId(videoUrl);

    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.showModal();
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else if (!isOpen && modalRef.current) {
            modalRef.current.close();
            // Restore body scrolling when modal is closed
            document.body.style.overflow = 'auto';
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <div>
            <dialog
                ref={modalRef}
                className="modal bg-black/70 justify-center items-center w-[800px]"
                onClose={onClose}
            >
                <div className="modal-box w-full justify-center items-center bg-black border border-gray-800">
                    <button
                        onClick={() => {
                            // Find and stop YouTube iframe
                            const iframe = document.querySelector('iframe');
                            if (iframe) {
                                const iframeSrc = iframe.src;
                                iframe.src = ''; // Clear source to stop video
                                iframe.src = iframeSrc.split('?')[0]; // Reset source without autoplay
                            }
                            onClose();
                        }}
                        className="btn btn-sm btn-circle absolute right-2 top-2 rounded-lg bg-white text-black hover:bg-gray-200 border-none "
                    >
                        <XMarkIcon className="h-8 w-8" />
                    </button>

                    <div className="aspect-video mt-4">
                        {videoId ? (
                            <div className="flex justify-center items-center w-full h-full">
                                <iframe
                                    width="97%"
                                    height="97%"
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                    title="YouTube video player"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-lg"
                                ></iframe>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gray-900 rounded-lg">
                                <p className="text-white">Video URL is invalid</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Clicking outside the modal will close it */}
                <form method="dialog" className="modal-backdrop">
                    <button onClick={onClose}>close</button>
                </form>
            </dialog>
        </div>
    );
} 