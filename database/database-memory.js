import {randomUUID} from "node:crypto"

export class DatabaseMemory {
    #agendamentos = new Map()

    list(search) {
        return Array.from(this.#agendamentos.entries())
        .map((videoArray) => {
          const id = videoArray[0]
          const data = videoArray[1]

          return {
            id,
            ...data,
          }

      }).filter(video => {
        if (search) {
            return video.title.includes(search)
        }

        return true
      })
    }
    
    // Set, Map

    create(video) {
        const videoId = randomUUID()
        // UUID - Unique Universal ID

        this.#videos.set(videoId, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }
}