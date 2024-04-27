
<template>
    <div v-for="card in cards" :key="card.id">
        <Card :imageUrl="card.imageUrl" :title="card.title" :content="card.content" />
    </div>
</template>

<script>
import data from "../store/data.json";

export default {
    data() {
        return {
            cards: data.cards
        }
    }
}</script>


<style scoped>

</style>