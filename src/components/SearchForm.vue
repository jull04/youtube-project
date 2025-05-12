<template>
  <div class="search__form">
    <div class="search__bar">
      <input
        type="text"
        v-model="localQuery"
        placeholder="Введите запрос"
        class="search__input"
        @keyup.enter="$emit('search', query)"
      />
      <button @click="$emit('search', query)" class="search__button">Поиск</button>
    </div>
    <div class="search__filter-toggle">
      <label class="search__checkbox-container">
        <input
          class="search__checkbox"
          type="checkbox"
          :checked="shortOnly"
          @change="$emit('toggle-short', $event.target.checked)"
          :disabled="disableShortFilter"
        />
        <span class="search__checkbox-label">Короткие (до 40 мин)</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    query: String,
    shortOnly: Boolean,
    disableShortFilter: Boolean
  },
  data() {
    return {
      localQuery: this.query
    };
  },
  watch: {
    query(newVal) {
      this.localQuery = newVal;
    }
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.localQuery);
    }
  }
};
</script>

<style scoped>
.search__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.search__bar {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.search__input {
  padding: 10px;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
}

.search__button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3456f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.search__button:hover {
  background-color: #1976d2;
}

.search__filter-toggle {
  display: flex;
  justify-content: center;
}

.search__checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.search__checkbox-label {
  font-size: 14px;
  color: #fff;
}

.search__checkbox {
  accent-color: #3456f3;
  width: 16px;
  height: 16px;
}
</style>
