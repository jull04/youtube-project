<template>
  <div class="card">
    <a class="card__link" :href="videoUrl" target="_blank" rel="noopener">
      <img :src="video.snippet.thumbnails.medium.url" alt="Thumbnail" class="card__thumbnail" />
      <div class="card__info">
        <h3 class="card__title">{{ video.snippet.title }}</h3>
        <p class="card__channel-title">{{ video.snippet.channelTitle }}</p>
        <p class="card__meta card__duration">Длительность: {{ formatDuration(video.extra?.duration) }}</p>
        <p class="card__meta card__views">{{ formatViews(video.extra?.views) }}</p>
        <button :class="isSaved ? 'card__button-saved' : 'card__button'" @click.stop.prevent="handleLike">
          {{ isSaved ? '' : 'Сохранить' }}
        </button>
      </div>
    </a>
  </div>
</template>

<script>
import { formatDuration, formatViews } from '../utils/format.js';
export default {
  props: {
    video: Object,
    isSaved: Boolean,
  },
  computed: {
    videoUrl() {
      return `https://www.youtube.com/watch?v=${this.video.id.videoId}`;
    },
  },
  methods: {
    formatDuration,
    formatViews,
    handleLike() {
      this.$emit("toggle-like", this.video);
    }
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: box-shadow 0.2s ease;
}

.card__link {
  text-decoration: none;
}

.card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card__thumbnail {
  width: 100%;
  height: auto;
  display: block;
}

.card__info {
  padding: 10px;
}

.card__title {
  font-size: 14px;
  margin: 0 0 5px;
  text-decoration: none;
  color: black;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card__channel-title {
  font-size: 12px;
  color: #666;
  margin: 0;
  text-decoration: none;
  color: grey;
  font-weight: 700;
  min-height: 33px;
}
.card__button-saved {
  margin-top: 10px;
  background-image: url(../images/saved-button.svg);
  width: 100px;
  height: 29px;
  border-radius: 30px;
  border: none;
  margin: 10px auto 0;
  cursor: pointer;
  padding: 0;
}

.card__button {
  color: black;
  font-weight: 500;
  width: 100px;
  height: 29px;
  border-radius: 30px;
  border: none;
  margin: 10px auto 7px;
  cursor: pointer;
  padding: 0;
}

.card__button:hover {
  opacity: 0.8;
}

.card__meta {
  font-size: 12px;
  color: #777;
  margin: 5px auto;
}

</style>