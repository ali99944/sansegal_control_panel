/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Search, Plus, X, Music, Play, Grip, Disc } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

interface Song {
  id: string
  title: string
  artist: string
  duration: string
  trackNumber?: number
}

interface AlbumBuilderProps {
  availableSongs?: Song[]
  initialSongs?: Song[]
  onAlbumChange?: (songs: Song[]) => void
  className?: string
  artistId?: string // Filter songs by artist
}

const mockAvailableSongs: Song[] = [
  {
    id: "1",
    title: "أغنية رائعة",
    artist: "محمد منير",
    duration: "4:32",
  },
  {
    id: "2",
    title: "لحن الحياة",
    artist: "محمد منير",
    duration: "6:15",
  },
  {
    id: "3",
    title: "موسيقى هادئة",
    artist: "محمد منير",
    duration: "3:28",
  },
  {
    id: "4",
    title: "أغنية حديثة",
    artist: "محمد منير",
    duration: "3:45",
  },
  {
    id: "5",
    title: "لحن قديم",
    artist: "محمد منير",
    duration: "5:20",
  },
]

export default function AlbumBuilder({
  availableSongs = mockAvailableSongs,
  initialSongs = [],
  onAlbumChange,
  className = "",
  artistId,
}: AlbumBuilderProps) {
  const [albumSongs, setAlbumSongs] = useState<Song[]>(
    initialSongs.map((song, index) => ({ ...song, trackNumber: index + 1 }))
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(availableSongs)

  useEffect(() => {
    let filtered = availableSongs.filter(
      (song) =>
        (song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !albumSongs.some((as) => as.id === song.id)
    )

    // Filter by artist if artistId is provided
    if (artistId) {
      filtered = filtered.filter((song) => song.artist === artistId)
    }

    setFilteredSongs(filtered)
  }, [searchTerm, availableSongs, albumSongs, artistId])

  useEffect(() => {
    onAlbumChange?.(albumSongs)
  }, [albumSongs, onAlbumChange])

  const addSongToAlbum = (song: Song) => {
    const newSong = { ...song, trackNumber: albumSongs.length + 1 }
    setAlbumSongs([...albumSongs, newSong])
  }

  const removeSongFromAlbum = (songId: string) => {
    const updatedSongs = albumSongs
      .filter((song) => song.id !== songId)
      .map((song, index) => ({ ...song, trackNumber: index + 1 }))
    setAlbumSongs(updatedSongs)
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === "available" && destination.droppableId === "album") {
      const song = filteredSongs[source.index]
      addSongToAlbum(song)
    } else if (source.droppableId === "album" && destination.droppableId === "album") {
      const items = Array.from(albumSongs)
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)
      
      // Update track numbers
      const updatedItems = items.map((song, index) => ({ ...song, trackNumber: index + 1 }))
      setAlbumSongs(updatedItems)
    }
  }

  const getTotalDuration = () => {
    const totalSeconds = albumSongs.reduce((acc, song) => {
      const [minutes, seconds] = song.duration.split(":").map(Number)
      return acc + minutes * 60 + seconds
    }, 0)

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${className}`}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Available Songs */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">الأغاني المتاحة</h3>
            <span className="text-sm text-gray-500">{filteredSongs.length} أغنية</span>
          </div>

          <div className="relative mb-4">
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الأغاني..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <Droppable droppableId="available">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 max-h-96 overflow-y-auto ${
                  snapshot.isDraggingOver ? "bg-primary/5 rounded-lg" : ""
                }`}
              >
                {filteredSongs.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                          snapshot.isDragging ? "rotate-2 scale-105" : ""
                        }`}
                      >
                        <Grip size={16} className="text-gray-400" />
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <Music size={16} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{song.title}</p>
                          <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{song.duration}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              addSongToAlbum(song)
                            }}
                            className="p-1 text-gray-400 hover:text-primary transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {filteredSongs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Music size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>لا توجد أغاني متاحة</p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>

        {/* Album Tracks */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">مسارات الألبوم</h3>
            <div className="text-sm text-gray-500">
              {albumSongs.length} مسار • {getTotalDuration()}
            </div>
          </div>

          <Droppable droppableId="album">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 max-h-96 overflow-y-auto min-h-32 ${
                  snapshot.isDraggingOver ? "bg-primary/5 rounded-lg" : ""
                }`}
              >
                {albumSongs.map((song, index) => (
                  <Draggable key={song.id} draggableId={`album-${song.id}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${
                          snapshot.isDragging ? "rotate-2 scale-105" : ""
                        }`}
                      >
                        <Grip size={16} className="text-gray-400" />
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{song.trackNumber}</span>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Music size={16} className="text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{song.title}</p>
                          <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{song.duration}</span>
                          <button
                            onClick={() => console.log("Play", song.id)}
                            className="p-1 text-gray-400 hover:text-primary transition-colors"
                          >
                            <Play size={16} />
                          </button>
                          <button
                            onClick={() => removeSongFromAlbum(song.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {albumSongs.length === 0 && (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <Disc size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>اسحب الأغاني هنا لإنشاء الألبوم</p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}
