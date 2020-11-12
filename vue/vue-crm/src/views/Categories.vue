<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <div class="col s12 m6">
          <CategoryCreate @created="addNewCategory"/>
        </div>
        <div class="col s12 m6">
          <CategoryEdit
            :categories="categories"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from '../components/CategoryCreate';
  import CategoryEdit from '../components/CategoryEdit';

  export default {
    name: 'Categories',
    data: () => ({
      categories: [],
      loading: true
    }),
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false
    },
    methods: {
      addNewCategory(category) {
        this.categories.push(category);
      }
    },
    components: {
      CategoryCreate,
      CategoryEdit
    },
  }
</script>
