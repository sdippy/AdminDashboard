<script setup>
import CardWindowOrder from './CardWindowOrder.vue'

defineProps({
  items: Array
})
</script>

<template>
  <div class="flex flex-col gap-2 p-2 hide-on-print" v-auto-animate>
    <CardWindowOrder
      v-for="sneaker in items"
      :key="sneaker.id"
      :id="sneaker.id"
      :title="sneaker.title"
      :quantity="sneaker.quantity"
      :size="sneaker.size"
      :price="sneaker.price"
      :newprice="sneaker.newprice"
      :imageUrl="sneaker.imageUrl"
      :total-price="sneaker.totalPrice"
      :total-price-discount="sneaker.totalPriceDiscount"
    />
  </div>

  <div class="table-container hide">
    <table class="print-table table-fixed border-2 border-[black]">
      <thead>
        <tr class="text-[black] font-bold border border-[black] text-left pl-2">
          <th class="border border-[black] w-[50px] pl-2">#</th>
          <th class="border border-[black] pl-2">Наименование</th>
          <th class="border border-[black] w-[150px] pl-2">Размер</th>
          <th class="border border-[black] w-[150px] pl-2">Количество</th>
          <th class="border border-[black] w-[250px] pl-2">Цена</th>
          <th class="border border-[black] w-[250px] pl-2">Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="item.id"
          class="text-[black] border border-[black]"
        >
          <td class="border border-[black] w-[50px] pl-2">{{ index + 1 }}</td>
          <td class="border border-[black] pl-2 pr-2">{{ item.title }}</td>

          <td class="border border-[black] w-[150px] pl-2">{{ item.size }}</td>
          <td class="border border-[black] w-[150px] pl-2">{{ item.quantity }}</td>

          <td v-if="item.newprice" class="border border-[black] w-[250px] pl-2">
            {{ item.newprice }} ₽
          </td>
          <td v-else class="border border-[black] w-[250px] pl-2">{{ item.price }} ₽</td>
          <td v-if="item.totalPriceDiscount" class="border border-[black] w-[150px] pl-2">
            {{ item.totalPriceDiscount }} ₽
          </td>
          <td v-else class="border border-[black] w-[150px] pl-2">{{ item.totalPrice }} ₽</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Add a class to hide elements during printing */
.hide {
  display: none;
}
/* Show the printable form during printing */
@media print {
  .hide {
    display: block;
  }
  .hide-on-print {
    display: none !important;
  }

  .border_one {
    border: 1px solid black;
    padding: 0;
  }

  .border_hide {
    border: none !important;
    color: black !important;
    background-color: #fff !important;
  }

  .gap_hide {
    gap: 0 !important;
  }

  .border_one > * {
    border-right: 1px solid black;
    padding-left: 8px;
  }

  .border_one > *:last-child {
    border-right: none;
  }
}
</style>
