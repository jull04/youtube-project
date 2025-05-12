<template>
  <div class="youtube-search">
    <h1>{{ savedVideos.length > 0 ? 'Сохранённые видео' : 'Нет сохранённых видео' }}</h1>

    <div v-if="savedVideos.length > 0" class="videos-grid">
      <VideoCard
        v-for="video in savedVideos"
        :key="video.id.videoId"
        :video="video"
        :isSaved="true"
        @toggle-like="toggleLike"
      />
    </div>
  </div>
</template>

<script>
import VideoCard from "@/components/VideoCard.vue";

export default {
  name: "SavedVideos",
  components: {
    VideoCard,
  },
  data() {
    return {
      savedVideos: [],
    };
  },
  mounted() {
    const saved = localStorage.getItem("youtube_saved");
    this.savedVideos = saved ? JSON.parse(saved) : [];
  },
  methods: {
    toggleLike(video) {
      this.savedVideos = this.savedVideos.filter(
        (v) => v.id.videoId !== video.id.videoId
      );
      localStorage.setItem("youtube_saved", JSON.stringify(this.savedVideos));
    },
  },
};
</script>

<style scoped>
.youtube-search {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 1200px) {
  .videos-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .videos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .videos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .videos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
