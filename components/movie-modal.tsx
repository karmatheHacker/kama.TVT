"use client"

import { useState, useEffect } from "react"
import { X, Play, Star, Calendar, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface MovieModalProps {
  movie: any
  onClose: () => void
  startWatching?: boolean
}

const MovieModal = ({ movie, onClose, startWatching = false }: MovieModalProps) => {
  const [isWatching, setIsWatching] = useState(startWatching)
  // For the best experience, please use a browser ad blocker extension.


  const handleWatch = () => {
    setIsWatching(true)
  }

  if (isWatching) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl w-full h-[80vh] p-0 bg-black">
          <DialogTitle className="sr-only">{movie.title}</DialogTitle>
          <div className="relative w-full h-full">
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-black/50 rounded-lg px-3 py-1">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-yellow-300 font-medium">For the best experience, please use an ad blocker extension.</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="w-6 h-6" />
            </Button>
            <iframe
              src={`https://vidsrc.xyz/embed/movie/${movie.id}`}
              className="w-full h-full"
              allowFullScreen
              title={`Watch ${movie.title}`}
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0 bg-card">
        <DialogTitle className="sr-only">{movie.title}</DialogTitle>
        <div className="relative">
          {/* Header Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-32 md:w-48 rounded-lg shadow-lg"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold font-work-sans text-foreground mb-4">{movie.title}</h1>

                <div className="flex items-center space-x-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{Math.floor(movie.vote_average * 10) / 10}/10</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.runtime || "N/A"} min</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{movie.overview}</p>

                <div className="flex items-center space-x-2 mb-4 text-sm text-yellow-300">
                  <Shield className="w-4 h-4" />
                  <span>For the best experience, please use an ad blocker extension.</span>
                </div>

                <Button
                  onClick={handleWatch}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MovieModal
