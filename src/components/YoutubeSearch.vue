<template>
  <div class="main">
    <h1>Поиск видео на YouTube</h1>
    <SearchForm
      :query="query"
      :shortOnly="shortOnly"
      :disableShortFilter="videos.length === 0"
      @search="handleSearch"
      @toggle-short="shortOnly = $event"
    />

    <SearchPreloader v-if="isLoading" />

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="videos.length > 0" class="main__videos-grid">
      <VideoCard
        v-for="video in filteredVideos.slice(0, visibleCount)"
        :key="video.id.videoId"
        :video="video"
        :isSaved="isSaved(video)"
        @toggle-like="toggleLike"
      />
    </div>
    <div
      v-if="visibleCount < videos.length"
      class="main__button-container">
    >
      <button @click="showMore" class="main__button">Показать ещё</button>
    </div>
  </div>
</template>

<script>
import SearchPreloader from "../components/SearchPreloader.vue";
import VideoCard from "../components/VideoCard.vue";
import SearchForm from "../components/SearchForm.vue";
import { searchYouTube, getVideoDetails } from "../utils/api.js";

export default {
  components: {
    SearchPreloader,
    VideoCard,
    SearchForm,
  },
  data() {
    return {
      query: "",
      videos: [],
      isLoading: false,
      error: null,
      visibleCount: 10,
      shortOnly: false,
      savedVideos: [],
    };
  },
  methods: {
    handleSearch(query) {
      this.query = query;
      this.searchVideos();
    },
    async searchVideos() {
      if (this.query.trim() === "") {
        this.videos = [];
        this.visibleCount = 10;
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const items = await searchYouTube(this.query);
        const ids = items.map((item) => item.id.videoId);
        const detailsMap = await getVideoDetails(ids);

        this.videos = items.map((video) => ({
          ...video,
          extra: detailsMap[video.id.videoId] || {},
        }));

        this.visibleCount = 10;
        localStorage.setItem("youtube_query", this.query);
        localStorage.setItem("youtube_results", JSON.stringify(this.videos));
      } catch (err) {
        this.error = "Ошибка при загрузке данных с YouTube";
      } finally {
        this.isLoading = false;
      }
    },
    toggleLike(video) {
      const index = this.savedVideos.findIndex(
        (v) => v.id.videoId === video.id.videoId
      );
      if (index !== -1) {
        // Удаляем
        this.savedVideos.splice(index, 1);
      } else {
        // Сохраняем
        this.savedVideos.push(video);
      }
      this.updateLocalStorage();
    },
    isSaved(video) {
      return this.savedVideos.some((v) => v.id.videoId === video.id.videoId);
    },
    updateLocalStorage() {
      localStorage.setItem("youtube_saved", JSON.stringify(this.savedVideos));
    },
    parseTimeDuration(time) {
      if (!time) return 0;

      const match = time.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (!match) return 0;

      const hours = parseInt(match[1] || 0, 10);
      const minutes = parseInt(match[2] || 0, 10);
      const seconds = parseInt(match[3] || 0, 10);
      return hours * 3600 + minutes * 60 + seconds;
    },
    showMore() {
      this.visibleCount += 10;
    },
  },
  mounted() {
    const savedQuery = localStorage.getItem("youtube_query");
    const savedResults = localStorage.getItem("youtube_results");
    const savedLiked = localStorage.getItem("youtube_saved");

    if (savedQuery && savedResults) {
      this.query = savedQuery;
      this.videos = JSON.parse(savedResults);
    }

    if (savedLiked) {
      this.savedVideos = JSON.parse(savedLiked);
    }
  },
  computed: {
    filteredVideos() {
      if (!this.shortOnly) return this.videos;

      return this.videos.filter((video) => {
        const duration = this.parseTimeDuration(video.extra?.duration);
        return duration <= 40 * 60; // в секундах
      });
    },
  },
};
</script>

<style scoped>
.main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.main__videos-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 1200px) {
  .main__videos-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .main__videos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .main__videos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .main__videos-grid {
    grid-template-columns: 1fr;
  }
}

.main__error {
  color: red;
  margin-top: 10px;
}

.main__button-container {
  text-align: center; 
  margin-top: 20px
}

.main__button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3456f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.main__button:hover {
  opacity: 0.8;
}
</style>